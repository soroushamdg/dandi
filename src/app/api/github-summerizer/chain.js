import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

// The prompt template
const summarizePrompt = ChatPromptTemplate.fromTemplate(
  `You are an expert open source project summarizer.
Given the following README file content, please do the following:
1. Write a concise summary of what this repository is about.
2. List 3-5 cool or unique facts about this repository, if possible. If you can't find any, use general facts about open source projects.

Do not return an empty string for cool_facts. Always return an array of at least 3 items, even if you have to use general facts about open source projects.

Format your response as a JSON object with the following schema:
{{
  "summary": string, // concise summary
  "cool_facts": string[] // array of cool facts, must have at least 3 items
}}

Example:
{{
  "summary": "This is a library for building web applications with React.",
  "cool_facts": [
    "Supports server-side rendering.",
    "Has a plugin system.",
    "Used by many Fortune 500 companies."
  ]
}}

README content:
{readmeContent}
`
);

// The chain function using withStructuredOutput
export async function summarizeGithubReadme(readmeContent) {
  const model = new ChatOpenAI({ temperature: 0.2 });
  const structuredModel = model.withStructuredOutput(
    z.object({
      summary: z.string(),
      cool_facts: z.array(z.string())
    })
  );

  const chain = RunnableSequence.from([
    summarizePrompt,
    structuredModel
  ]);
  
  let result = await chain.invoke({ readmeContent });

  console.log(result);
  // Post-process: If cool_facts is a string, split it into an array
  if (typeof result.cool_facts === 'string') {
    result.cool_facts = result.cool_facts
      .split('\n')
      .map(fact => fact.replace(/^- /, '').trim())
      .filter(fact => fact.length > 0);
  }
  // If it's an empty string or not an array, set a fallback
  if (!Array.isArray(result.cool_facts) || result.cool_facts.length === 0) {
    result.cool_facts = [
      "No unique facts could be extracted from the README."
    ];
  }

  return result;
}