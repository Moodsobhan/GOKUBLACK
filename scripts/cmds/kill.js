const fs = require("fs")
const jimp = require("jimp")
module.exports = {
	config: {
		name: "h",
		version: "1.1",
		author: "nulL",
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
		category: "IMAGE",
		guide: "",
		
	},

onStart: async function ({ event, message, getLang, usersData, api, args}) {

  let picurl ;

if (event.type == "message_reply" && event.messageReply.attachments.length > 0 && (event.messageReply.attachments[0].type == "photo" || "animated_image")) {
url = event.messageReply.attachments[0].url
} else{
  const uid = Object.keys(event.mentions)[0]
    if(!uid) return message.reply("Mention someone or Reply to an image")

  url = await usersData.getAvatarUrl(uid);
}
let img = await jimp.read("https://i.ibb.co/bWnLB7y/image.jpg")
let imgg = await jimp.read(url)

img.composite(imgg.resize(150, 150), 111, 100).composite(imgg.resize(150, 150), 170, 100)

await img.writeAsync(__dirname + "/tmp/hell.png")
message.reply({body:"🌞🌞", attachment: await fs.createReadStream(__dirname + "/tmp/hell.png")})
}
}