const axios = require('axios');

module.exports = {
  config: {
    name: "art",
    version: "1.0",
    author: "Tashrif",
    countDown: 5,
    role: 0,
    longDescription: {
      en: 'Convert a image to anime'
    },
    category: "image",
    guide: {
      en: '{pn} reply to an image and choose model 1 - 52'
    }
  },

  onStart: async function({ api, event, args }) {
    const imageLink = event.messageReply?.attachments[0]?.url;
    const [model] = args.join(" ");

    if (!model || !imageLink) {
      return api.sendMessage('❌ | Please reply to an image and provide a model...', event.threadID, event.messageID);
    }

    const API = `https://api-samir.onrender.com/api/art?model=${model}&imgurl=${encodeURIComponent(imageLink)}`;

    try {
      api.setMessageReaction("⏳", event.messageID, () => {}, true);
      const imageStream = await global.utils.getStreamFromURL(API);
      api.setMessageReaction("✅", event.messageID, () => {}, true);
      return api.sendMessage({ attachment: imageStream }, event.threadID, event.messageID);
      
    } catch (error) {
      console.log(error);
      return api.sendMessage('❌ | Failed to generate the image.', event.threadID, event.messageID);
    }
  }
};