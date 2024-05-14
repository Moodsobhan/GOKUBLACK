const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const { findUid } = global.utils;
const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

module.exports = {
  config: {
    name: "mistake",
    aliases: ["cm"],
    version: "2.0",
    author: "MR.AYAN",
    countDown: 2,
    role: 0,
    description: "𝗔 𝘀𝗺𝗮𝗹𝗹 𝗺𝗶𝘀𝘁𝗮𝗸𝗲", 
    category: "𝗙𝗨𝗡",
    guide: "{pn} (mention someone/uid/idurl/reply to a msg)"
  },

  onStart: async function ({ message, event, args }) {
    const mention = Object.keys(event.mentions);
    let uid;
    if (mention.length == 1) {
      uid = mention[0];
    } else if(args[0]) {
      uid = args[0];
    }else if(event.messageReply){
      uid = event.messageReply.senderID;
    }
        if (args[0].match(regExCheckURL)) {
      for (const link of args) {
        try {
          uid = await findUid(link);
        }
        catch (e) {
          console.log(e.message)
        }
      }
    }

    try {
      const imagePath = await bal(uid);
      await message.reply({
        body: " The Biggest Mistake in Earth ",
        attachment: fs.createReadStream(imagePath)
      });
    } catch (error) {
      console.error("Error while running command:", error);
      await message.reply("an error occurred");
    }
  }
};
async function bal(uid) {
  const avatar = await jimp.read(`https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
  const image = await jimp.read("https://i.postimg.cc/2ST7x1Dw/received-6010166635719509.jpg");
  image.resize(512, 512).composite(avatar.resize(220, 203), 145, 305);
  const imagePath = path.join(__dirname, 'tmp', `${uid}.png`);
  await image.writeAsync(imagePath);
  return imagePath;
  } 
