const axios = require("axios");

module.exports = {
	config: {
		name: "score",
		aliases: ["l2score"],
		version: "1.0",
		author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
		countDown: 5,
		role: 0,
		shortDescription: "Get cricbuzz live match info",
		longDescription: {
			en: "Provides you the information of live cricket match"
		},
		category: "info",
		guide: {
			en: "{pn} <link>"
		}
	},
	onStart: async function ({ api, event, args, message }) {
		try {
			const response = await axios.get("https://anbusec.xyz/api/sports/score?apikey=jmBOjQSgq5mK8GScw9AB&url=" + args.join(" "));

      if (response.data.success === false) {
        return message.reply(getLang("error"));
      }

			const message = {
				body: `Here's some match information:\n\n` +
					`❏ Title: ${response.data.title}\n` +
					`❏ Game_Status: ${response.data.gameStatus}\n` +
				  `❏ Game: ${response.data.game}\n` + 				`❏ Mini_Score: ${response.data.miniscore}\n` +
          `❏ Target_Score: ${response.data.targetscore}\n` +
          `❏ Current_RR: ${response.data.crr}\n` +
          `❏ Required_RR: ${response.data.rr}\n` +
          `❏ Batting_Data: ${response.data.battingData}\n` + 
          `❏ Bowling_Data: ${response.data.bowlingData}\n` +
          `❏ Partnership: ${response.data.partnership}\n` +
          `❏ Recent_Balls: ${response.data.recentBalls}\n` +
          `❏ Last_Wkt: ${response.data.lastWkt}`,
				attachment: await global.utils.getStreamFromURL('http://tinyurl.com/yp39z4pt')
			};

			return api.sendMessage(message, event.threadID);
		} catch (error) {
			console.error(error);
			message.reply("An error occurred while fetching the information.");
		}
	}
};