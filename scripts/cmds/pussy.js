module.exports = {
	config: {
		name: "pussy",
		aliases: ["18+"],
		version: "1.0",
		author: "MR.AYAN",
		countDown: 5,
		role: 2,
		shortDescription: "send you pic of pussy",
		longDescription: "sends u pic of girls pussy",
		category: "18+",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [ 
"https://i.postimg.cc/CKBrsGGv/received-282056608310738.jpg",
"https://i.postimg.cc/bJ0Tm3sR/received-1002900144404455.jpg",
"https://i.postimg.cc/ZnZfmX1g/received-1172459224171282.jpg",
"https://i.postimg.cc/RV48xnmF/received-1688383281691176.jpg",
"https://i.postimg.cc/nLSZCGH0/received-800060665342230.jpg",
"https://i.postimg.cc/m27b89wg/received-2298967693632652.jpg",
"https://i.postimg.cc/DmkMS8JC/received-1108883033750245.jpg",
"https://i.postimg.cc/ZRng2kzL/received-1962896447445955.jpg"
"https://i.postimg.cc/KvTXmykq/received-452926897224376.jpg",
  ]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: '🥀MIRA KIM ROBOT🥀\n\n「 HOT GIRL PUSSY PIC 」',attachment: await global.utils.getStreamFromURL(img)
})
}
     } 
