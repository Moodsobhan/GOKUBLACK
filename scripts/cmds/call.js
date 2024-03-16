const axios = require('axios');

module.exports = {
  config: {
    name: "bomber",
    aliases: ["callbomber", "call"],
    author: "Dipto", // 𝐀𝐒𝐈𝐅 𝐱𝟔𝟗
    version: "1.0",
    countDown: 5,
    role: 0,
    longDescription: "Call Bomber",
    category: "goatbot",
    guide: {
      en: "{pn} [number] | amount"

    }
  },

  langs: {
    en: {
      loading: "⏳ | Please Wait...",
      error: "❎ | An error occurred, please try again later...",
    usage: `🔰 | Please enter your target number...‎ \n{pn} 01********* `
    }
  },

  onStart: async function ({ event, message, getLang, api, args }) {
        const permission = global.GoatBot.config.vipUser;
    if (!permission.includes(event.senderID)) {
      api.sendMessage("⛔ | You don't have enough permission to use this command. Only VIP Users Have Access.", event.threadID, event.messageID);
      return;
    }
    const { messageID, threadID } = event;

    const num = args.join(" ");
    if (!num) {
      return message.reply(getLang("usage"));
    } else {
      const key = "dipto069";
      try {
        let msgSend = message.reply(getLang("loading"));
        const { data } = await axios.get(`https://d1pt0-call-bomber.onrender.com/dipto?num=${num}&key=${key}`);
      const msg = data.data;
      const author = data.author;

        await message.unsend((await msgSend).messageID);
        if (msg) {
          message.reply({
            body: `✅ | ${msg}\n🔰 | Author: ${author}`,
          });
        } else {
          throw new Error("❌ | Failed to fetch...");
        }
      } catch (err) {
        console.error(err);
        return message.reply(getLang("error"));
      }
    }
  }
};