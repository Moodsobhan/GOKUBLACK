const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "cdp",
    aliases: ["coupledp"],
    version: "1.0",
    author: "Rishad",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "couple dp"
    },
    longDescription: {
      en: "couple dp"
    },
    category: "image",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const { res } = await axios.get(
        "https://tanjiro-api.onrender.com/cdp?api_key=tanjiro"
      );
      const maleImg = await axios.get(res.male, { responseType: "arraybuffer" });
      fs.writeFileSync(__dirname + "/tmp/img1.jpg", Buffer.from(maleImg.data, "utf-8"));
      const femaleImg = await axios.get(res.female, { responseType: "arraybuffer" });
      fs.writeFileSync(__dirname + "/tmp/img2.jpg", Buffer.from(femaleImg.data, "utf-8"));

      const msg = "Here is your couple dp";
      const allImages = [
        fs.createReadStream(__dirname + "/tmp/img1.jpg"),
        fs.createReadStream(__dirname + "/tmp/img2.jpg")
      ];
      
      return api.sendMessage({
        body: msg,
        attachment: allImages
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
    }
  }
};