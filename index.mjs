#!/usr/bin/env node

import { writeFileSync } from 'fs'
import path from 'path'
import { program } from 'commander'
import Groq from 'groq-sdk'
import Configstore from 'configstore'
import packageJson from './package.json' assert {type: "json"}
import { generateJSON } from './util/index.mjs'
import chalk from 'chalk'
import ora from 'ora'

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
  .option('-o, --output <path>', 'Output JSON file path')
  .action(async (options) => {
    const apiKey = config.get('apiKey')
    if (!apiKey) {
      console.error(chalk.red('Error: Groq API key not set. Use "jason set-api-key <api-key>" to set your Groq API key.'))
      process.exit(1)
    }

    const groq = new Groq({ apiKey })
    
    const spinner = ora('Generating JSON data...').start()

    try {
      const generatedData = await generateJSON(groq, options.prompt, options.number);
      spinner.succeed('\nJSON data generated successfully\n')

      if(options.output){
        writeFileSync(options.output, JSON.stringify(generatedData, null, 2));
        console.log(chalk.green(`\nGenerated JSON data written to ${options.output}`));
      } else {
        console.log(chalk.cyan('\nGenerated JSON data: \n'))
        console.log(chalk.yellow(JSON.stringify(generatedData, null, 2)))
      }
    } catch (error) {
      spinner.fail('Error generating JSON data')
      console.error(chalk.red('Error:', error.message));
      process.exit(1);
    }
  });

program.parse(process.argv);