const { Configuration, OpenAIApi } = require("openai");
const API_KEY = require('./key.js')
const configuration = new Configuration({
    apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);



async function init() {
    let res = '';
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. Q: 흄은 어떤 회사인가요?\nA: 글로벌 최고의 소프트웨어 회사입니다\n\nQ: 흄은 몇년도에 창립되었나요?\nA: 2015년 입니다.\n\nQ: 흄이 뭐에요?",
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\n"],
      });
    console.log(response.data.choices[0]);
}

init();


