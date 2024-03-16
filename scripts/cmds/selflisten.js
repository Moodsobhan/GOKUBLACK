const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
	config: {
		name: "self",
		aliases: ["selflisten"],
		version: "1.4",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: {
			en: "turn on/off selflisten mode"
		},
		longDescription: {
			en: "turn on/off selflisten mode"
		},
		category: "owner",
		guide: {
			en: "   {pn} [on | off]: turn on/off selflisten mode"
				+ "\n   {pn} noti [on | off]: turn on/off the notification when user is not admin use bot"
		}
	},

	langs: {
		en: {
			turnedOn: "✅ | SelfListen Mode Activated.",
			turnedOff: "❎ | SelfListen Mode Deactivated.",
			turnedOnNoti: "✅ | Turned on the notification when user is not admin use bot",
			turnedOffNoti: "❎ | Turned off the notification when user is not admin use bot"
		}
	},

	onStart: function ({ args, message, getLang }) {
		let isSetNoti = false;
		let value;
		let indexGetVal = 0;

		if (args[0] == "noti") {
			isSetNoti = true;
			indexGetVal = 1;
		}

		if (args[indexGetVal] == "on")
			value = true;
		else if (args[indexGetVal] == "off")
			value = false;
		else
			return message.SyntaxError();

		if (isSetNoti) {
			config.hideNotiMessage.adminOnly = !value;
			message.reply(getLang(value ? "turnedOnNoti" : "turnedOffNoti"));
		}
		else {
			config.optionsFca.selfListen = value;
			message.reply(getLang(value ? "turnedOn" : "turnedOff"));
		}

		fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
	}
};