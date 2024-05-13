.cmd install ai.js const axios = require('axios');

const Prefixes = [
  'AI',
  'ai',
  'phonkgpt',
  'Ai',
];

module.exports = {
  config: {
    name: "ai",
    version: 1.0,
    author: "MR.AYAN",
    longDescription: "chatGptAI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("🚀 𝗚𝗣𝗧:\n\nHello! How can I assist you today.");
        return;
      }


      const response = await axios.get(`https://aryanapis.replit.app/gpt?prompt=hello${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply(`🚀 𝗚𝗣𝗧:\n\n${answer}`);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
