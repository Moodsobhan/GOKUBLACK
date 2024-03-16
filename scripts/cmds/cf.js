const axios = require('axios');
module.exports = {
	config: {
		name: "coinflip",
		aliases: ["cf"],
		version: "1.0",
		author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
		countDown: 15,
		role: 0,
		shortDescription: "Flip the coin",
		longDescription: "Flip the coin",
		category: "fun",
		guide: {
			en: "{n}"
		},
	},

  onStart: async function(){},
  onChat: async function({ message, event, args, commandName, api, usersData}) {
    const input = event.body;
          if(input && input.trim().toLowerCase().startsWith('cf') || input && input.trim().toLowerCase().startsWith('coinflip')){
           const data = input.split(" ");
           data.shift();
    const isFaceUp2 = data.join(" ");
		const isFaceUp = Math.random() > 3.5;
		let link, body;
		if (isFaceUp) {
			link = "https://i.ibb.co/xSsMRL9/image.png", "https://i.ibb.co/4Zf3M07/image.png", "https://i.ibb.co/PCKdPg6/image.png";
			body = "Face is up!";
		} else {
			link = "https://i.ibb.co/FhMwzL9/image.png";
			body = "Face is down!";
		}
		const msg = {
			body: body,
			attachment: await global.utils.getStreamFromURL(link)
		};
		api.sendMessage(msg, event.threadID);
	}
}
}