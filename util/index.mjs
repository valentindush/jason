export async function getCompletion(groq, prompt, numObjects) {
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

export async function generateJSON(groq, prompt, numObjects) {
    try {
        const completion = await getCompletion(groq, prompt, numObjects);
        return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
        console.error('Error generating JSON:', error);
        process.exit(1);
    }
}