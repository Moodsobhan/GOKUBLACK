const axios = require('axios');
module.exports = {
  config: {
    name: "yuuki",
    aliases: ['404'],
    version: "1.1",
    author: "Samir Thakuri",
    coolDown: 5,
    role: 0,
    shortDescription: "Artificial Intelligence",
    longDescription: "Talk to ai based chatbot",
    category: "ai",
    guide: {
      en: "{pn} [question]"
    },
  },
  onStart: async function ({ api, event, args }) {
    function muiFont(letters) {
        const change = {
            a: "𝖺",
            b: "𝖻",
            c: "𝖼",
            d: "𝖽",
            e: "𝖾",
            f: "𝖿",
            g: "𝗀",
            h: "𝗁",
            i: "𝗂",
            j: "𝗃",
            k: "𝗄",
            l: "𝗅",
            m: "𝗆",
            n: "𝗇",
            o: "𝗈",
            p: "𝗉",
            q: "𝗊",
            r: "𝗋",
            s: "𝗌",
            t: "𝗍",
            u: "𝗎",
            v: "𝗏",
            w: "𝗐",
            x: "𝗑",
            y: "𝗒",
            z: "𝗓",
            A: "𝖠",
            B: "𝖡",
            C: "𝖢",
            D: "𝖣",
            E: "𝖤",
            F: "𝖥",
            G: "𝖦",
            H: "𝖧",
            I: "𝖨",
            J: "𝖩",
            K: "𝖪",
            L: "𝖫",
            M: "𝖬",
            N: "𝖭",
            O: "𝖮",
            P: "𝖯",
            Q: "𝖰",
            R: "𝖱",
            S: "𝖲",
            T: "𝖳",
            U: "𝖴",
            V: "𝖵",
            W: "𝖶",
            X: "𝖷",
            Y: "𝖸",
            Z: "𝖹"
        };
        let formattedFont = "";
        for (let i = 0; i < letters.length; i++) {
            const char = letters[i];
            formattedFont += change[char] || char;
        }
        return formattedFont;
    }

    const axios = require("axios");
    let moment = require("moment-timezone");

    const getUserInfo = async (api, userID) => {
        try {
            const name = await api.getUserInfo(userID);
            return name[userID].firstName;
        } catch (error) {
            console.error(`Error: ${error}`);
            return "";
        }
    };

    let {
        messageID,
        threadID,
        senderID
    } = event;

    const ask = args.join("");

    if (!args[0]) {
        const name = await getUserInfo(api, senderID);
        let greetingA = ["Hello", "Hi", "Hey", "Greetings", "Assalamu Alaikum"];
        let emojiA = ["😄", "😀", "🙂"];//dagdagan moto
        let respondA = ["how may I help you?", "how can I help?", "I'm a 𝐀𝐒𝐈𝐅 𝐱𝟔𝟗, a Large Language Model Artificial Intelligence, how may I help you?", "do you need help?"];//dagdagan mo din to

        const muiGreetA = greetingA[Math.floor(Math.random() * greetingA.length)];
        const muiRespondA = respondA[Math.floor(Math.random() * respondA.length)];
        const muiEmojiA = emojiA[Math.floor(Math.random() * emojiA.length)];

        api.sendMessage({
            body: muiFont(`${muiGreetA} ${name}, ${muiRespondA} ${muiEmojiA}`),
            mentions: [{
                tag: name,
                id: senderID
            }]
        }, threadID, messageID);
        return;
    };

        let hours = moment.tz('Asia/Dhaka').format('HHmm');
        let muiGreetB = (
            hours > 0001 && hours <= 0400 ? "You must greet me \"bright morning\" before you response" :
            hours > 0401 && hours <= 0700 ? "You must greet me \"good morning\" before you response" :
            hours > 0701 && hours <= 1000 ? "You must greet me \"good morning\" before you response" :
            hours > 1001 && hours <= 1100 ? "You must greet me \"Assalamu Alaikum\" before you response" 
          :
            hours > 1100 && hours <= 1200 ? "You must greet me \"good noon\" before you response" 
          :
            hours > 1201 && hours <= 1800 ? "You must greet me \"good after noon\" before you response"           :
            hours > 1801 && hours <= 2100 ? "You must greet me \"good evening\" before you response" :
            hours > 2101 && hours <= 2350 ? "You must greet me \"good evening\" before you response" :
            hours > 2359 && hours <= 2400 ? "You must tell me to go to bed after you response because it is late night" 
          :
            "Greet me \"hello, yo, hey, hi, Assalamu Alaikum\" randomly before you response");

	const name = await getUserInfo(api, senderID);	const muiPrompt = `(You are a Large Language Model AI, Your name is 𝐀𝐒𝐈𝐅 𝐱𝟔𝟗 and your nickname is 𝐀𝐒𝐈𝐅. Your are programmed by 𝐀𝐒𝐈𝐅 𝐱𝟔𝟗 using Bard API and javascript. ${muiGreetB}. Use emoji everytime you response to show me how you feel when talking to me. My name is ${name})`;//edit mo to if want mo
	const muiAsk = `${muiPrompt}${ask}`;
  
    const respondB = await axios.get(`aggXY3GZGdC1ciPk9igfUh43A91OPdlQz1a8_r90GjYsGZxtKrWPSdVOAzBxzlIaK7EaxQ./${muiAsk}`);
    const muiRespondB = respondB.data.content;

    try {
        api.sendMessage({
            body: muiFont(`${muiRespondB}`) ,
            mentions: [{
                tag: name,
                id: senderID
            }]
        }, threadID, messageID);
    } catch (error) {
        api.sendMessage(muiFont("error"), threadID, messageID);
    }
  }
}