# JSON
A simple CLI tool for generating json output & files using LLMs

## USAGE
### Installation
jason can be easily used via `npm`
```bash
npm install -g @dushv/jason
```
### Set Groq API key
jason uses Groq API to access Llama 3 
1. to get the api key go to https://console.groq.com/keys and create your own. it is free !

2. store the api key with
    ```bash
    jason set-api-key <your-api-key>
    ```
### Generate !
Run 
```bash
jason generate -p "Top tech companies and their dev salary average" -n 10
```
```bash
jason generate -p "Top tech companies and their dev salary average" -n 10 -o ./devs.json
``` 
to save into a file
