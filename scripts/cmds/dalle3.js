const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "FAB6BBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACAiUsQgl7RI7OASEn9oXkFUDh33+vBuAD84xId7Ko/lOrsLK24P+U3syLORjfdfBxd/MxJI8EfhFL5wUu+7WgCbiNuUDMpYuC2ymefjrCvXggBiy7aZib0fngKSZV5m9QazMHHPLM+k6Oo2/2ayDm4fH9ZMZxJp+GWKQu9LGzmRKseIIaiFdOIXVGmf72YHT9B9vV7nIU340RDNIMv0Gs7XjYGa0Dm/vEp57m9uo9cF7kL0R8BKaQvwdRX4sbLTxP32/Lv0fEphhyJ1n53xLCha1wCEbf7DZB47G5ZKaO9wZpJa/6a4OpKeMNBQdpv+Hdux+h9k2BDjArf2eeIP7J/EGjsXab37ggeiBJ5WTEiiL22NWp9gPAYsDurbherADIOLpYqrJLzwKvwuBpLHbYbjZvAlcoHzJ2wGKb4XYEGCZAljCIo1dfDvS0P3u2/Bney5LbimrTaqTfgtBgQm7Rx+tc5Hfni21JyXruh1REP9qand0DLQZo32O8MU2rlInA2//M0wiJjmHuIljpgrt+5Skj5dFUb9fTiPzrtfXs5Vad/uhV+DqTjm+PGIDDBXc0SIBb8shXEqKkdf4F7UAQG9oGK9YWLJ7XdR8bho+gZ4nc6206cNnWxf3E8p6NNd3QjfXE9s5K1MAGSINnl+lMZZz1RLzD0U3HcoIqEYHf7tK2/bM9yChiW6MR0KJWMPihfClnAw/WAdmqeCYzGhYjXUBJDU0zR/VpaxB6BhaBfzWuJQtNQXsFiako4wDW1qHGCqRuj8m07zxHCcrwaOCR/UqJqvbLt/iG/kmhA24ef0PexCXR5etc6NbXhKNdlW6WoYXVgNDst0Lokmifb2kTII6Ut6KQSt7UrofSKQUdnjfB/bfDwM4Jy2rErmtf5uOMmLlp4ftxbv4wF9I9XWL0pi0QSscwBbXzbZTuYInttlDpwGyNgchlGiEFFID2LgnVCr3rC94Uw/i3HPgX9yeE1BPr13mMqkZKGhXl0u6ErBffuJ/C3NLqJnuVbir90r7WYE2Wj5qHK+4349VY+5wPCmvm8xDor9kK1TXzGd/aRyY3JDp8uoYs7ub95q6PbJ1FtUCrz1RQG3FznJVy8w+bEszxu15hlGAVLevkNqXIBmyt4vXn/scRhSdz7TD/tx3ZJvXo3iEDEJkVULAASHy0/0/6PfMuMIABNCq+DtHCoXyLKMBMQKy9RYdkh1dfcU7w2dHUB67wlPvp1+56gYnXD0vKltzMmuWVbhDROOpD640PKfx24mLg0akOliEfAl/UB/NWEOXvH0F89gaBEbgmsaBxR00F1zK3N/e1q6+OMjkQvDc2OIPqHXM7HZUyWg+u3qQXofZXn9hoKC00P3v59ggy9y+8o4vxi+3ijInygW9oEiQ7I9OPTn9N8RuQjpEktSCyQAJR7gfp8a8nhGpPPRyUSsJPXZ3ni2QMv18BeWsbP0UAGupBpVGCl83Ku5XQMqPmKC6kqxg";
const _U = "1eFvUf4-pOg-XChs9wiE5soT5-4lVG_U8h9MKL_Cp9d5oSGOw4dTvXM6Ejk7v4U5-J5Bjljw0UzJe5r4-Zbyw6Lbj6LsSE06QzvwjhPvWC4x87QtsMwLFHR-vGZAqkvKvNEfmTw_hDbExtUGN9GHqqRjsvHGLs5UiG2cLI37k-sBilZv4jBzmZmm707U97Yfdcat5Z34zBS-3TTqmGbsS-g";

module.exports = {
  config: {
    name: "dalle3",
    aliases: ["bing2"],
    version: "1.0.2",
    author: "Samir Œ",
    role: 1,
    countDown: 5,
    shortDescription: {
      en: "dalle image generator"
    },
    longDescription: {
      en: ""
    },
    category: "Bing",
    guide: {
      en: "{pn} <search query> -<number of images>"
    }
  },

  onStart: async function ({ api, event, args }) {
    const keySearch = args.join(" ");
    const indexOfHyphen = keySearch.indexOf('-');
    const keySearchs = indexOfHyphen !== -1 ? keySearch.substr(0, indexOfHyphen).trim() : keySearch.trim();
    const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 4;

    try {
      const res = await axios.get(`https://api-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(keySearchs)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        api.sendMessage("❌| No images found for the provided query.", event.threadID, event.messageID);
        return;
      }

      const imgData = [];
      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: "❏ Here's your generated image"
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while processing the command.", event.threadID, event.messageID);
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
};