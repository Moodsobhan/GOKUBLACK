const fs = require("fs-extra");
const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");
const { getStreamFromURL, shortenURL, randomString } = global.utils;

module.exports = {
  config: {
    name: "tinyurl",
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 1,
    role: 0,
    shortDescription: "Tinyurl Maker!",
    longDescription: "Tinyurl Maker!!",
    category: "goatbot",
    guide: "{pn} [url]",
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn tát"
    },
    en: {
      noTag: "Please enter a url to make shorten url"
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    const url = args.join(" ");

    const shortUrl = await shortenURL(url);
    const messageBody = `♻COMMAND BY ♪♪ 𝐀𝐒𝐈𝐅 𝐱𝟔𝟗 ♪♪\n\n✅ 🔗 Your Shorten Url: ${shortUrl}`;
    // Send the image as a reply to the command message
    message.reply({
      body: messageBody,
  });
}
};