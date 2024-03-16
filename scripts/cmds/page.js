const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");

const sentVideos = [];
const pages = {
  animenepal: {
    id: "animemenepal",
    accessToken: "EAAD6V7os0gcBO9DIFAgFuzpJ9Kui6ManYepBHe93mrJQig1l3gyRd1E090eoZAUcMojUfsbaxYxH1AiPHZAmwvwvD64zoZAxhzTCaNOv12nmdcz1yQFfsFnti6Mhy1fCyZCQ6poYZC2ZCkdWuZAeZApn58587WLcNy549imTVZBWZB4ScZAi7HfYYJX0tO0sdLj0QZDZD",
  },
  naos: {
    id: "naos011",
    accessToken: "EAAD6V7os0gcBO9DIFAgFuzpJ9Kui6ManYepBHe93mrJQig1l3gyRd1E090eoZAUcMojUfsbaxYxH1AiPHZAmwvwvD64zoZAxhzTCaNOv12nmdcz1yQFfsFnti6Mhy1fCyZCQ6poYZC2ZCkdWuZAeZApn58587WLcNy549imTVZBWZB4ScZAi7HfYYJX0tO0sdLj0QZDZD",
  },
  truth: {
    id: "manojthapa0",
    accessToken: "EAAD6V7os0gcBO9DIFAgFuzpJ9Kui6ManYepBHe93mrJQig1l3gyRd1E090eoZAUcMojUfsbaxYxH1AiPHZAmwvwvD64zoZAxhzTCaNOv12nmdcz1yQFfsFnti6Mhy1fCyZCQ6poYZC2ZCkdWuZAeZApn58587WLcNy549imTVZBWZB4ScZAi7HfYYJX0tO0sdLj0QZDZD",
  },
  animeworld: {
    id: "animeworld48",
    accessToken: "EAAD6V7os0gcBO9DIFAgFuzpJ9Kui6ManYepBHe93mrJQig1l3gyRd1E090eoZAUcMojUfsbaxYxH1AiPHZAmwvwvD64zoZAxhzTCaNOv12nmdcz1yQFfsFnti6Mhy1fCyZCQ6poYZC2ZCkdWuZAeZApn58587WLcNy549imTVZBWZB4ScZAi7HfYYJX0tO0sdLj0QZDZD",
  },
  anmc: {
    id: "animeaesthetic2",
    accessToken: "EAAD6V7os0gcBO9DIFAgFuzpJ9Kui6ManYepBHe93mrJQig1l3gyRd1E090eoZAUcMojUfsbaxYxH1AiPHZAmwvwvD64zoZAxhzTCaNOv12nmdcz1yQFfsFnti6Mhy1fCyZCQ6poYZC2ZCkdWuZAeZApn58587WLcNy549imTVZBWZB4ScZAi7HfYYJX0tO0sdLj0QZDZD",
  },
  horny: {
    id: "HORNYSTATION2",
    accessToken: "EAAD6V7os0gcBO9DIFAgFuzpJ9Kui6ManYepBHe93mrJQig1l3gyRd1E090eoZAUcMojUfsbaxYxH1AiPHZAmwvwvD64zoZAxhzTCaNOv12nmdcz1yQFfsFnti6Mhy1fCyZCQ6poYZC2ZCkdWuZAeZApn58587WLcNy549imTVZBWZB4ScZAi7HfYYJX0tO0sdLj0QZDZD",
  },
  meme: {
    id: "WalterWhitebhai",
    accessToken: "EAAD6V7os0gcBO9DIFAgFuzpJ9Kui6ManYepBHe93mrJQig1l3gyRd1E090eoZAUcMojUfsbaxYxH1AiPHZAmwvwvD64zoZAxhzTCaNOv12nmdcz1yQFfsFnti6Mhy1fCyZCQ6poYZC2ZCkdWuZAeZApn58587WLcNy549imTVZBWZB4ScZAi7HfYYJX0tO0sdLj0QZDZD",
  },
  mpn: {
    id: "moodpostingsnepal",
    accessToken: "EAAD6V7os0gcBO9DIFAgFuzpJ9Kui6ManYepBHe93mrJQig1l3gyRd1E090eoZAUcMojUfsbaxYxH1AiPHZAmwvwvD64zoZAxhzTCaNOv12nmdcz1yQFfsFnti6Mhy1fCyZCQ6poYZC2ZCkdWuZAeZApn58587WLcNy549imTVZBWZB4ScZAi7HfYYJX0tO0sdLj0QZDZD",
  },
  nepmeme: {
    id: "BatWala100",
    accessToken: "EAAD6V7os0gcBO9DIFAgFuzpJ9Kui6ManYepBHe93mrJQig1l3gyRd1E090eoZAUcMojUfsbaxYxH1AiPHZAmwvwvD64zoZAxhzTCaNOv12nmdcz1yQFfsFnti6Mhy1fCyZCQ6poYZC2ZCkdWuZAeZApn58587WLcNy549imTVZBWZB4ScZAi7HfYYJX0tO0sdLj0QZDZD",
  },
  // Add more pages as needed
};

module.exports = {
  config: {
    name: "page",
    aliases: ["p"],
    version: "1.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "Get a random video from the specified page",
    category: "??????",
    guide: "{p}{n} pageName",
  },

  onStart: async function ({ api, event, args }) {
    try {
      if (!args[0]) {
        const availablePages = Object.keys(pages).join(", ");
        return api.sendMessage(`Please specify a page name. Available pages: ${availablePages}`, event.threadID);
      }

      const loadingMessage = await api.sendMessage(
        `Loading a random video from the page "${args[0]}", please wait...`,
        event.threadID
      );

      const pageName = args[0].toLowerCase();

      if (!pages[pageName]) {
        const availablePages = Object.keys(pages).join(", ");
        return api.sendMessage(`Page "${pageName}" not found. Available pages: ${availablePages}`, event.threadID);
      }

      const { id, accessToken } = pages[pageName];

      const response = await axios.get(`https://graph.facebook.com/${id}/videos?access_token=${accessToken}`);
      const videos = response.data.data;

      if (videos.length > 0) {
        const unsentVideos = videos.filter((video) => !sentVideos.includes(video.id));

        if (unsentVideos.length === 0) {
          await api.sendMessage("All videos from the page have been sent before.", event.threadID);
        } else {
          const randomVideo = unsentVideos[Math.floor(Math.random() * unsentVideos.length)];
          const videoLink = randomVideo.source;
          const videoId = randomVideo.id;

          const tempDir = path.join(os.tmpdir(), "fb_videos");
          if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
          }

          const randomFileName = `video_${Date.now()}.mp4`;
          const filePath = path.join(tempDir, randomFileName);

          const videoResponse = await axios({
            method: "GET",
            url: videoLink,
            responseType: "stream",
          });

          videoResponse.data.pipe(fs.createWriteStream(filePath));

          videoResponse.data.on("end", async () => {
            if (fs.existsSync(filePath)) {
              await api.sendMessage(
                {
                  body: `Random video from the page "${pageName}":`,
                  attachment: fs.createReadStream(filePath),
                },
                event.threadID
              );
              sentVideos.push(videoId);
            } else {
              console.error("File does not exist:", filePath);
              await api.sendMessage(
                "An error occurred while fetching the video. Please try again later.",
                event.threadID
              );
            }

            api.unsendMessage(loadingMessage.messageID);
          });

          videoResponse.data.on("error", async (err) => {
            console.error("Error during video download:", err);
            await api.sendMessage(
              "An error occurred while fetching the video. Please try again later.",
              event.threadID
            );

            api.unsendMessage(loadingMessage.messageID);
          });
        }
      } else {
        await api.sendMessage(`No videos found on the page "${pageName}".`, event.threadID);
        api.unsendMessage(loadingMessage.messageID);
      }
    } catch (error) {
      console.error("Error retrieving videos:", error);
      await api.sendMessage("An error occurred while retrieving videos.", event.threadID);
    }
  },
};
