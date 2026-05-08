const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('AIzaSyBcq-CDK7qsmIxZPee6tYGNrR7LUc5zZvw');
async function run() {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
        const chat = model.startChat();
        const result = await chat.sendMessage('hello');
        console.log(result.response.text());
    } catch(err) {
        console.error('Error:', err);
    }
}
run();
