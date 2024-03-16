const axios = require('axios');

module.exports = {
  config: {
    name: "ai3",
    version: "1.0",
    longDescription: {
      en: "Ask a question."
    },
    guide: { 
      en: "{pn} <question>" 
    },
    role: 0, // 0 - Everyone, 1 - Admin
    category: "Ai",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗"
  },
  onStart: async function({ api, event, args, message }) {
    const question = args.join(' ');

    if (!question) {
      message.reply("❌ | Please provide a query...");
      return;
    }

    try {
      const { data } = await axios.get(`https://llama.aliestercrowley.com/api?prompt=${encodeURI(question)}`);
      
       await api.sendMessage(`
🔰 | 𝚂𝙸𝙼𝙿𝙻𝙴 𝙰𝙸 | 🔰\n\n` + data.response, event.threadID);
    } catch (error) {
      console.error('❌ | Error:', error.message);
      message.reply(error);
    }
  },
};