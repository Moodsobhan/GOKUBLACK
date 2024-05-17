const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    author: "𝗠𝗥.𝗔𝗬𝗔𝗡",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
      try {
        const loadingMessage = "✨Please Wait Loading Owner Information...";
        await api.sendMessage(loadingMessage, event.threadID);

        const ownerInfo = {
          name: '𝗠𝗥.𝗔𝗬𝗔𝗡',
          gender: '𝗠𝗮𝗹𝗲',
          hobby: '𝗕𝗼𝘁 𝗰𝗼𝗱𝗶𝗻𝗴,𝗦𝘁𝗲𝗮𝗹𝗶𝗻𝗴 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀,𝗲𝘁𝗰..',
          relationship: '𝗣𝘂𝗿𝗲 𝗦𝗶𝗻𝗴𝗹𝗲',
          facebookLink: 'https://m.me/NOOBS.DEVELOPER.AYAN',
          bio: '𝗛𝗮𝘁𝗲𝗿𝘀 𝗮𝗿𝗲 𝗺𝘆 𝗺𝗼𝘁𝗶𝘃𝗮𝘁𝗼𝗿𝘀'
        };

        const videoUrl = 'https://i.imgur.com/JTwPWIq.jpeg';
        const tmpFolderPath = path.join(__dirname, 'tmp');

        if (!fs.existsSync(tmpFolderPath)) {
          fs.mkdirSync(tmpFolderPath);
        }

        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoPath = path.join(tmpFolderPath, 'owner_photo.png');

        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

        const response = `
          𝐎𝘄𝗻𝗲𝗿 𝐈𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:
        ◊──────────────────◊
          
        Name: ${ownerInfo.name}
          
        Gender: ${ownerInfo.gender}
          
        Hobby: ${ownerInfo.hobby}
          
        Relationship: ${ownerInfo.relationship}
          
        Facebook: ${ownerInfo.facebookLink}
          
        Status: ${ownerInfo.bio}

        ◊──────────────────◊
        `;

        await api.sendMessage({
          body: response,
          attachment: fs.createReadStream(videoPath)
        }, event.threadID);
      } catch (error) {
        console.error('Error in owner command:', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
      }
    },
    onChat: async function({ api, event }) {
      try {
        const lowerCaseBody = event.body.toLowerCase();
        
        if (lowerCaseBody === "owner" || lowerCaseBody.startsWith("{p}owner")) {
          await this.onStart({ api, event });
        }
      } catch (error) {
        console.error('Error in onChat function:', error);
      }
    }
  };

/*

To add new photo 
1. upload your photo on drive
2. after uploading change the photo acces to anyone with the link 
3. copy photo link
4. go to direct drive link convert website
5. paste that link there and copy direct link
6. paste that link in code 

*/
