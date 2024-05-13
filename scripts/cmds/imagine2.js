const axios = require('axios');
const path = require('path');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "imagine2",
    aliases: ["imgine2"],
    version: "1.0",
    author: "Vex_Kshitiz",
    countDown: 50,
    role: 0,
    longDescription: {
      vi: '',
      en: "Imagine"
    },
    category: "ai",
    guide: {
      vi: '',
      en: "{pn} <prompt> - <ratio>"
    }
  },

  onStart: async function ({ api, commandName, event, args }) {
    try {
      api.setMessageReaction("✅", event.messageID, (a) => {}, true);
      let prompt = args.join(' ');
      let ratio = '1:1';

      if (args.length > 0 && args.includes('-')) {
        const parts = args.join(' ').split('-').map(part => part.trim());
        if (parts.length === 2) {
          prompt = parts[0];
          ratio = parts[1];
        }
      }

      const response = await axios.get(`https://imagine-kshitiz-zia7.onrender.com/mj?prompt=${encodeURIComponent(prompt)}&ratio=${encodeURIComponent(ratio)}`);
      const imageUrls = response.data.imageUrls;

      const imgData = [];
      const numberOfImages = 4;

      for (let i = 0; i < Math.min(numberOfImages, imageUrls.length); i++) {
        const imageUrl = imageUrls[i];
        const imgResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({ body: '', attachment: imgData }, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("error contact kshitiz", event.threadID, event.messageID);
    }
  }
}; 
