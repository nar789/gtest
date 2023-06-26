module.exports = () => {

    const { Configuration, OpenAIApi } = require("openai");
    const API_KEY = require('./key.js')
    const configuration = new Configuration({
        apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    async function send(p) {
        let res = '';
        const chat_completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: p }],
        });
        if(chat_completion.data.choices.length > 0) {
            if(chat_completion.data.choices[0].message.content != null) {
                res = chat_completion.data.choices[0].message.content;
            }
        }
        console.log(res);
        return res;
    }

    return {
        send : send
    }


}


