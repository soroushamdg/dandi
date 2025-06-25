import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { BaseOutputParser } from "@langchain/core/output_parsers";

// Custom output parser to structure the output
class SummarizeOutputParser extends BaseOutputParser {
  static lc_name() {
    return "SummarizeOutputParser";
  }
  lc_namespace = ["custom", "summarize_output_parser"];
  async parse(text) {
    // Expecting output in the format:
    // Summary: ...
    // Cool Facts:
    // - fact 1
    // - fact 2
    // ...
    const summaryMatch = text.match(/Summary:(.*?)(Cool Facts:|$)/is);
    const coolFactsMatch = text.match(/Cool Facts:(.*)/is);

    const summary = summaryMatch ? summaryMatch[1].trim() : "";
    let cool_facts = [];
    if (coolFactsMatch) {
      cool_facts = coolFactsMatch[1]
        .split("\n")
        .map(line => line.replace(/^- /, "").trim())
        .filter(line => line.length > 0);
    }
    return {
      summery: summary,
      cool_facts
    };
  }
  getFormatInstructions() {
    return "Output should have a 'Summary:' section and a 'Cool Facts:' section with bullet points.";
  }
}

// The prompt template
const summarizePrompt = ChatPromptTemplate.fromTemplate(
  `You are an expert open source project summarizer.
Given the following README file content, please do the following:
1. Write a concise summary of what this repository is about.
2. List 3-5 cool or unique facts about this repository, if possible.

Format your response as:
Summary: <your summary here>
Cool Facts:
- <fact 1>
- <fact 2>
- <fact 3>

README content:
{readmeContent}
`
);

// The chain function
export async function summarizeGithubReadme(readmeContent) {
  const model = new ChatOpenAI({ temperature: 0.2 });
  const outputParser = new SummarizeOutputParser();

  const chain = RunnableSequence.from([
    summarizePrompt,
    model,
    outputParser
  ]);

  return await chain.invoke({ readmeContent });
} 