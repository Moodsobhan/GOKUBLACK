const axios = require('axios');

module.exports = {
  config: {
    name: 'jsbeautifier',
    aliases: ['jsbeautify', 'beatify', 'jsb'],
    version: '1.0',
    author: 'SynthiaTech Creations',
    role: 0,
    category: 'Ai',
    shortDescription: {
      en: `JsCompilerAI emulates a JavaScript compiler, offering a mix of technical proficiency and creative problem-solving.`
    },
    longDescription: {
      en: `JavaScript beatifier, offering a mix of technical proficiency and creative problem-solving.`
    },
    guide: {
      en: '{pn} [code]'
    },
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const query = args.join(" ") || "hello";
      const { name } = (await usersData.get(event.senderID));

      if (query) {
        api.setMessageReaction("⏳", event.messageID, (err) => console.log(err), true);
        const processingMessage = await api.sendMessage(
          `Asking 🚀 JsCompilerAI. Please wait a moment...`,
          event.threadID
        );

        const apiUrl = `https://lianeapi.onrender.com/@synthiaTech/api/JsCompilerAI?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name || "a user")}&query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.message) {
          const trimmedMessage = response.data.message.trim();
          api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
          await api.sendMessage({ body: trimmedMessage }, event.threadID, event.messageID);

          console.log(`Sent 🚀 JsCompilerAI's response to the user`);
        } else {
          throw new Error(`Invalid or missing response from 🚀 JsCompilerAI API`);
        }

        await api.unsendMessage(processingMessage.messageID);
      }
    } catch (error) {
      console.error(`❌ | Failed to get 🚀 JsCompilerAI's response: ${error.message}`);
      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
      api.sendMessage(errorMessage, event.threadID);
    }
  },
};
