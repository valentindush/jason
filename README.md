# jason

A CLI tool to generate JSON data using Groq's AI model.

## Installation

You can install jason globally using npm:

```bash
npm install -g @dushv/jason
```

## Setup

Before using jason, you need to set up your Groq API key:

1. Sign up for a Groq account and obtain your API key (it is free !). Get yours here https://console.groq.com/keys
2. Run the following command to set your API key:

```bash
jason set-api-key your_groq_api_key_here
```

Your API key will be securely stored for future use.

## Usage

### Generating JSON Data

To generate JSON data, use the `generate` command:

```bash
jason generate -p "Your prompt here" -n number_of_objects
```

Options:
- `-p, --prompt <string>`: The prompt for generating JSON data (required)
- `-n, --number <number>`: The number of objects to generate (required)
- `-o, --output <path>`: Output JSON file path (optional)

### Examples

1. Generate 5 fruit objects and display in console:

```bash
jason generate -p "Create a list of fruits with their colors and average weight in grams" -n 5
```

2. Generate 10 user profiles and save to a file:

```bash
jason generate -p "Generate user profiles with name, age, and favorite color" -n 10 -o users.json
```

## Output

When no output file is specified, the generated JSON will be displayed in the console with colorful syntax highlighting for improved readability.

If an output file is specified using the `-o` option, the JSON data will be saved to the specified file, and a success message will be displayed in the console.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

If you encounter any problems or have any questions, please open an issue on the GitHub repository.

---

Happy JSON generating!