#!/usr/bin/env node

import { writeFileSync } from 'fs'
import path from 'path'
import { program } from 'commander'
import Groq from 'groq-sdk'
import Configstore from 'configstore'
import packageJson from './package.json' assert {type: "json"}

const config = new Configstore(packageJson.name)

program
  .version(packageJson.version)
  .description('A CLI tool to generate JSON data using Groq Llama3 via Groq')

program.command('set-api-key <key>')
  .description('Set the Groq API key')
  .action((key) => {
    config.set('apiKey', key)
    console.log('API key set successfully')
  });

program.command('generate')
  .description('Generate JSON data')
  .requiredOption('-p, --prompt <string>', 'Prompt for Groq')
  .requiredOption('-n, --number <number>', 'Number of objects to generate')
  .requiredOption('-o, --output <path>', 'Output JSON file path')
  .action(async (options) => {
    const apiKey = config.get('apiKey')
    if (!apiKey) {
      console.error('Error: Groq API key not set. Use "jason set-api-key <api-key>" to set your Groq API key.')
      process.exit(1)
    }

    const groq = new Groq({ apiKey })

    try {
      const generatedData = await generateJSON(groq, options.prompt, options.number);
      writeFileSync(options.output, JSON.stringify(generatedData, null, 2));
      console.log(`Generated JSON data written to ${options.output}`);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);

async function getCompletion(groq, prompt, numObjects) {
  return groq.chat.completions.create({
    messages: [{
      role: "system",
      content: `You are a helpful assistant that generates JSON data. Generate ${numObjects} objects based on the following prompt: ${prompt}`
    }, {
      role: "user",
      content: "Respond only with valid JSON."
    }],
    model: "llama3-8b-8192",
  });
}

async function generateJSON(groq, prompt, numObjects) {
  try {
    const completion = await getCompletion(groq, prompt, numObjects);
    return JSON.parse(completion.choices[0]?.message?.content);
  } catch (error) {
    console.error('Error generating JSON:', error);
    process.exit(1);
  }
}