const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

const cookie = ""; // Enter _U value.
const auth = ""; // Enter KievRPSSecAuth value.

module.exports = {
  config: {
    name: "bing",
    aliases: ["dalle"],
    version: "1.0",
    author: "MR.AYAN",
    role: 2,
    countDown: 0,
    longDescription: {
      en: "Generate unique and captivating images using DALL-E 3"
    },
    category: "ai",
    guide: {
      en: "{pn} <prompt>"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const prompt = args.join(" ");
    if (!prompt) {
      message.reply("Add something baka.");
      return;
    }
    message.reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭 𝐰𝐡𝐢𝐥𝐞 𝐩𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠...⏳");

    try {
      const res = await axios.post(`https://rehatdesu.xyz/api/imagine/dalle?cookie=${cookie}&auth=${auth}&prompt=${encodeURIComponent(prompt)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        message.reply("Redirect failed! Most probably bad prompt.");
        return;
      }

      const imgData = [];
      for (let i = 0; i < Math.min(4, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      message.reply("Redirect failed! Most probably bad prompt.");
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
} 
