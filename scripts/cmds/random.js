const axios = require("axios");
const fs = require("fs");
const path = require("path");

let isRandomVideoEnabled = false;
let intervalId;

const groupChatIDs = ["7704667116245106"];//group tid to add more group ["", "", ""]

module.exports = {
config: {
  name: "random",
  version: "2.0",
  author: "MR.AYAN",
  countDown: 20,
  role: 1,
  shortDescription: "Search for TikTok videos",
  longDescription: {
    en: "Type 'random on' to start sending random TikTok videos every 1 minute, and 'random off' to stop."
  },
  category: "info",
  guide: {
    en: "{p}{n} on / off"
  }
},


  async onStart({ api, event, args }) {
    const command = args[0];

    if (command === "on") {
      if (isRandomVideoEnabled) {
        api.sendMessage("Random TikTok videos are already enabled.", event.threadID);
      } else {
        isRandomVideoEnabled = true;
        api.sendMessage("Random TikTok videos are now enabled. Sending every 1 minute.", event.threadID);
        startSendingRandomVideos(api);
      }
    } else if (command === "off") {
      if (!isRandomVideoEnabled) {
        api.sendMessage("Random TikTok videos are already disabled.", event.threadID);
      } else {
        isRandomVideoEnabled = false;
        clearInterval(intervalId);
        api.sendMessage("Random TikTok videos are now disabled.", event.threadID);
      }
    } else {
      api.sendMessage("Invalid command. Type 'random on' to start, and 'random off' to stop.", event.threadID);
    }
  }
};

async function startSendingRandomVideos(api) {
  const getRandomQuery = () => {
    const queries = ["", "", "", "", "", "", "", ""];// add your search queries to get that type of video to add more just put , "" continue like this make sure to not add coma , in last search quaries leave it like this ""] not "",]
    const randomIndex = Math.floor(Math.random() * queries.length);
    return queries[randomIndex];
  };

  const searchAndSendVideo = async (threadID) => {
    const searchQuery = getRandomQuery();

    try {  // api credits to its owner
      const apiUrl = `https://hiroshi.hiroshiapi.repl.co/tiktok/searchvideo?keywords=${encodeURIComponent(searchQuery)}`;
      const response = await axios.get(apiUrl);
      const videos = response.data.data.videos;

      if (!videos || videos.length === 0) {
        api.sendMessage(`No TikTok videos found for the query: ${searchQuery}`, threadID);
      } else {
        const videoData = videos[0];
        const videoUrl = videoData.play;
        const message = `💠𝐑𝐚𝐧𝐝𝐨𝐦 𝐓𝐢𝐤𝐭𝐨𝐤 𝐕𝐢𝐝𝐞𝐨💠`;
        const filePath = path.join(__dirname, `/cache/tiktok_video_${threadID}.mp4`); 
        const writer = fs.createWriteStream(filePath);

        const videoResponse = await axios({ method: 'get', url: videoUrl, responseType: 'stream' });
        videoResponse.data.pipe(writer);

        writer.on('finish', async () => {
          await api.sendMessage({
            body: message,
            attachment: fs.createReadStream(filePath)
          }, threadID);
          fs.unlinkSync(filePath);
        });
      }
    } catch (error) {
      console.error('Error:', error);
      api.sendMessage("An error occurred while processing the request.", threadID);
    }
  };

  intervalId = setInterval(async () => {
    try {
      for (const group of groupChatIDs) {
        await searchAndSendVideo(group);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, 1 * 60 * 1000);// change time according to your nees currently it is 1 minute 
} 
