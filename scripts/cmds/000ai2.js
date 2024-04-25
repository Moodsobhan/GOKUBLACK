const axios = require('axios');

module.exports = {
    config: {
      name: "ai2",
      author: "MR.AYAN",
      version: "69",
      cooldowns: 5,
      role: 0,
      shortDescription: {
        en: "ayanAI ask anything"
      },
      longDescription: {
        en: "Ayan AI ask anything"
      },
      category: "ai",
      guide: {
        en: "{p}{n} [text]"
      }
    },

onStart: async function({ api, args, event }) {
  try {
    const text = args.join(' ');

    if (!text) {
      api.sendMessage('Please provide some text for testing.', event.threadID, event.messageID);
      return;
    }

    const apiUrl = 'https://chatgpt.august-api.repl.co/response';
    const response = await axios.post(apiUrl, { prompt: text });

    if (response.data && response.data.answer) {
      const answer = response.data.answer.trim();
      api.sendMessage(`${answer}`, event.threadID, event.messageID);
    } else {
      api.sendMessage('An error occurred while testing. Please try again later.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('Error in AI command:', error);
    api.sendMessage('An error occurred while testing. Please try again later.', event.threadID, event.messageID);
    }
  }
}; 
