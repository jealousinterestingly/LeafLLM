// An options object that will be passed to the gemini-pro-vision model
const generationConfig = {
    temperature: 0.4,
    topP: 1,
    topK: 32,
    maxOutputTokens: 4096,
};

// An options object that will bepassed to the gemini-pro-vision model
const safetySettings = [
    {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
];

/**
 * Returns a gemini-pro-vision model with the specified API key.
 * @param {string} apiKey The API key to use.
 * @returns The gemini-pro-vision model.
 */
export async function getModel(apiKey) {
    // UPDATED: Import from the local library file instead of a URL.
    const { GoogleGenerativeAI } = await import(
        './lib/generative-ai.js'
    );
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: 'gemini-pro' });
}

