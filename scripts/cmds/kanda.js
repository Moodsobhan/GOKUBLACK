const axios = require('axios');

module.exports = {
	config: {
		name: "kanda",
		aliases: ["porn", "xxx"],
		version: "1.0",
		author: "Samir B. Thakuri",
		countDown: 5,
		role: 0,
		shortDescription: "get nepali kanda",
		longDescription: "get nepali kanda videos",
		category: "adult",
		guide: "{pn}"
	},

	onStart: async function ({ message, args, event  }) {
    function checkPermissionAndSendMessage(permission, message) {
  if (!permission.includes(event.senderID)) {
    api.sendMessage(message, event.threadID, event.messageID);
    return false;
  }
  return true;
}

const GODPermission = global.GoatBot.config.GOD;
const vipUserPermission = global.GoatBot.config.vipUser;
const adminBotPermission = global.GoatBot.config.adminBot;

const permissionMessage = "You are not VIP user to use this cmd. Use /request to ask  permission for this cmd to authors";

if (!checkPermissionAndSendMessage(GODPermission, permissionMessage)) {
  return;
}

if (!checkPermissionAndSendMessage(vipUserPermission, permissionMessage)) {
  return;
}
if (!checkPermissionAndSendMessage(adminBotPermission, permissionMessage)) {
  return;
}
			const BASE_URL = `https://samirthakuri.restfulapi.repl.co/kanda/apikey=samirey`;
 message.reply("Loading The Video Please Wait UpTo 1 Minutes⌛"); 
			try {
				let res = await axios.get(BASE_URL)
				let kanda = res.data.url;
				const form = {
					body: `Look At This 🥵`
				};
		 if (kanda)
					form.attachment = await global.utils.getStreamFromURL(kanda);
				message.reply(form); 
			} catch (e) { message.reply(`Sorry, I Can't Process Your Request`)
 console.log(e);
 }

		}
	};