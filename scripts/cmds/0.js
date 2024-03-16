const axios = require("axios");

module.exports = {
	config: {
		name: "ai6",
		version: "1.0",
		author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: ""
		},
		longDescription: {
			vi: "",
			en: ""
		},
		category: "ai"
	},
	onStart: async function(){},
	onChat: async function({ message, event, args, commandName, api, usersData}) {
		const input = event.body;
		const userID = event.senderID;
		const data = await usersData.get(userID);
		const name= await usersData.getName(userID);
		const status = data.banned.status;
		const reason = data.banned.reason;
		const credits = this.config.author;
		if(input && input.trim().toLowerCase().startsWith('Ask2') || input && input.trim().toLowerCase().endsWith('ask')){
			 const data = input.split(" ");
			 data.shift();
			 const prompt = data.join(" ");

				if (prompt.toLowerCase() === "clear") {
					global.GoatBot.onReply.delete(message.messageID);
					message.reply("Previous conversation has been cleared.");
					return;
				}

				try {
					const waitingQue = await message.reply("🔍Just a moment, please wait.");
					const response = await axios.get(          `https://sandipapi.onrender.com/gpt2?prompt=${prompt}&uid=${userID}`);

					message.reply({ body: `${response.data}`}, async (err, info) => {
	await message.unsend((await waitingQue).messageID);
	global.GoatBot.onReply.set(info.messageID, {
		commandName,
		messageID: info.messageID,
		author: event.senderID
	});
});


				} catch (error) {
					console.error("Error:", error.message);
				}
		}
	},
	onReply: async function({message, usersData, event, Reply, args, api}) {
		let {author, commandName} = Reply;
		if (event.senderID != author) return;
		const userID = event.senderID;
		const data = await usersData.get(userID);
		const name = data.name;
		const prompt = args.join(" ");
		const authorName = name;
		if (prompt.toLowerCase() === "clear") {
			global.GoatBot.onReply.delete(message.messageID);
			message.reply("Previous conversation has been cleared.");
			return;
		}
		try {
			api.setMessageReaction("🤖", event.messageID, event.threadID, api);
			const response = await axios.get(          `https://api-t86a.onrender.com/api/ai?prompt=${prompt}&uid=${userID}name=${name}`);
						message.reply({ body: `${response.data.result}`}, (err, info) => {
			global.GoatBot.onReply.set(info.messageID, {
				commandName,
				messageID: info.messageID,
				author: event.senderID
			});
		 });

		} catch (error) {
			console.error("Error:", error.message);
		}
	}
};