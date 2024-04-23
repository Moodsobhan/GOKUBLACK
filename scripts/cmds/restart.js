const fs = require("fs-extra");

module.exports = {
	config: {
		name: "restart",
		version: "1.0",
		author: "NTKhang",//**original anthor MR.AYAN fb I'd : https://m.me/MR.AYAN.2X **//
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		longDescription: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		category: "Owner",
		guide: {
			vi: "   {pn}: Khởi động lại bot",
			en: "   {pn}: Restart bot"
		}
	},

	langs: {
		vi: {
			restartting: "🔄 | Đang khởi động lại bot..."
		},
		en: {
			restartting: ""🕐 | 𝐀𝐮𝐭𝐨-𝐑𝐞𝐬𝐭𝐚𝐫𝐭𝐢𝐧𝐠 𝐁𝐨𝐭..."
		}
	},

	onLoad: function ({ api }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		if (fs.existsSync(pathFile)) {
			const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
			api.sendMessage(`☑️ | 𝘽𝙤𝙩 𝙍𝙚𝙨𝙩𝙖𝙧𝙩𝙚𝙙 𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮...\n\n⏰ | Time: ${(Date.now() - time) / 1000}s`, tid);
			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({ message, event, getLang }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
		await message.reply(getLang("restartting"));
		process.exit(2);
	},

	autoRestart: function () {
		setInterval(() => {
			console.log("🕐 | 𝐀𝐮𝐭𝐨-𝐑𝐞𝐬𝐭𝐚𝐫𝐭𝐢𝐧𝐠 𝐁𝐨𝐭...");
			process.exit(2);
		}, 20 * 60 * 1000); // 20 minutes
	}
};

// Call the autoRestart function to start the auto-restart process
module.exports.autoRestart(); 
