const axios = require('axios');

module.exports = {
    config: {
        name: "image",
        aliases: ["picture", "unsplash"],
        version: "1.0",
        author: "RUBISH",
        countDown: 3,
        role: 0,
        shortDescription: "Search for images using Unsplash API",
        longDescription: "Search for high-quality images using Unsplash API and return a specified number of results.",
        category: "Search",
        guide: {
            vi: "{pn} <search query>  <number of result>",
            en: "{pn} <search query>  <number of result>"
        }
    },

    onStart: async function ({ args, message, getLang }) {
        try {
            let numResults = 5;
            let query = args.join(' ');
            const lastArg = args[args.length - 1];
            if (!isNaN(lastArg)) {
                numResults = parseInt(lastArg);
                if (numResults > 30) {
                    return message.reply("⚠️ | The maximum number of results allowed is 30.");
                }
                query = args.slice(0, -1).join(' ');
            }

            const url = `https://unsplash-rubish-api.onrender.com/api/images?query=${query}&numResults=${numResults}`;

            const response = await axios.get(url);
            const images = response.data.images;
            const attachments = await Promise.all(images.map(image => global.utils.getStreamFromURL(image.url)));

            return message.reply({ body: `
✅ | High-quality Image Found 

Search ⇒ ${query}

Total Image ⇒ ${numResults} 

`, attachment: attachments });
        } catch (error) {
            console.error(error);
            return message.reply("Sorry, I couldn't find any results.");
        }
    }
};