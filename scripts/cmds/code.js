const axios = require('axios');

module.exports = {
   config: {
    name: "getcode",
    version: "1.0",
    shortDescription: "get code from pastebin link",
    longDescription: "get code from pastebin link, just send command with pastebin link",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    role: 0,
    category: 'ai',
    countDown: 5,
    guide: {
      en: "{pn} link"
  }
 },

  onStart: async function ({ api, event, args }) {
    const pastebinUrl = args[0];

    if (!pastebinUrl) {
      return api.sendMessage('Please provide a Pastebin link!', event.threadID, event.messageID);
    }

    if (!pastebinUrl.startsWith("https://pastebin.com/")) {
      return api.sendMessage('Invalid Pastebin link!', event.threadID, event.messageID);
    }

    const codeId = pastebinUrl.split('/').pop();

    try {
      const response = await axios.get(`https://pastebin.com/raw/${codeId}`);
      const code = response.data;

      api.sendMessage(`Here is the code:\n\n${code}`, event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage('An error occurred while fetching the code!', event.threadID, event.messageID);
    }
  }
};