module.exports = () => {

    const { Configuration, OpenAIApi } = require("openai");
    const API_KEY = require('./key.js');
    const CONFIG = require('./config.js');
    const mysql = require('mysql');
    console.log(API_KEY);
    const configuration = new Configuration({
        apiKey: API_KEY
    });
    const openai = new OpenAIApi(configuration);
    const conn = mysql.createConnection(CONFIG);

    async function send(p) {
        let res = '';
        const chat_completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: p }],
            temperature : 0,
            top_p : 1,
            frequency_penalty : 0.0,
            presence_penalty : 0.0,
        });
        if(chat_completion.data.choices.length > 0) {
            if(chat_completion.data.choices[0].message.content != null) {
                res = chat_completion.data.choices[0].message.content;
            }
        }
        console.log(res);
        conn.query(`update gpt set count=count+1 where id = 1`, (err, rows) => {
            if(err) {
                console.log(err);
            }
        });
        return res;
    }

    return {
        send : send
    }


}


