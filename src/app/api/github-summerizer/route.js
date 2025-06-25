import { supabase } from '../../../lib/supabase';
import { summarizeGithubReadme } from './chain';

export async function POST(request) {
  try {
    const body = await request.json();
    const apiKey = request.headers.get('x-api-key');
    const githubUrl = body.githubURL;
    if (!apiKey) {
      return Response.json({ valid: false, message: 'API key is required.' }, { status: 400 });
    }
    if (!githubUrl) {
      return Response.json({ valid: false, message: 'githubUrl is required.' }, { status: 400 });
    }
    const { data } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .single();
    if (!data) {
      return Response.json({ valid: false, message: 'Not valid API Key' });
    }
    // Only if valid, fetch the README
    const readme = await fetchReadmeFromGithub(githubUrl);
    let output = null;
    if (readme) {
      output = await summarizeGithubReadme(readme);
    }
    console.log(output);
    return Response.json({ summary: output.summery, cool_facts: output.cool_facts });
  } catch (error) {
    console.error(error);
    return Response.json({ valid: false, message: 'Server error.' }, { status: 500 });
  }
} 

async function fetchReadmeFromGithub(githubURL) {
  try {
    // Extract owner and repo from the URL
    // Supports URLs like: https://github.com/owner/repo or https://github.com/owner/repo/
    const match = githubURL.match(/github\.com\/([^\/]+)\/([^\/]+)(\/|$)/);
    if (!match) {
      throw new Error('Invalid GitHub repository URL');
    }
    const owner = match[1];
    const repo = match[2];

    // Try to fetch README.md from the main or master branch
    const branches = ['main', 'master'];
    let readmeResponse, readmeText;
    for (const branch of branches) {
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
      readmeResponse = await fetch(rawUrl);
      if (readmeResponse.ok) {
        readmeText = await readmeResponse.text();
        return readmeText;
      }
    }

    // If not found in main/master, try GitHub API for default branch
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const apiResponse = await fetch(apiUrl, {
      headers: { Accept: 'application/vnd.github.v3.raw' }
    });
    if (apiResponse.ok) {
      return await apiResponse.text();
    }

    throw new Error('README.md not found in the repository');
  } catch (error) {
    return null;
  }
}

