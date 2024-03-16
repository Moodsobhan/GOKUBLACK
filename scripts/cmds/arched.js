const axios = require('axios');

module.exports = {
  config: {
    name: "arched",
    longDescription: {
      en: "Ask Arched a question."
    },
    guide: { 
      en: "{p}arched <question>"
    },
    role: 0, // 0 - Everyone, 1 - Admin
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗"
  },
  onStart: async function({ api, event, args, message })  {
    const { threadID, messageID, type, messageReply, body } = event;
    const question = args.join(' ');

    if (!question) {
      message.reply("Please provide a question after the command using the query parameter.");
      return;
    }

    try {
      const response = await axios.get(`https://lianeapi.onrender.com/ask/arched?query=${question}`);
      const message = response.data.raw;

 await api.sendMessage(message, threadID);
    } catch (error) {
      console.error('Error asking Arched:', error.message);
      message.reply('An error occurred while asking Arched.');
    }
  },
};