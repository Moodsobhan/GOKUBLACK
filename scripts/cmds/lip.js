module.exports = {
 config: {
   name: "lip",
   version: "1.0",
   author: "MR.AYAN",
   countDown: 5,
   role: 0,
   shortDescription: "no prefix",
   longDescription: "no prefix",
   category: "no prefix",
 },
  
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "lip") {
 return message.reply({
 body: "𝐊𝐢𝐬𝐬𝐢𝐧𝐠 𝐀 𝐥𝐨𝐯𝐞𝐝 𝐨𝐧𝐞 𝐨𝐧 𝐭𝐡𝐞 𝐥𝐢𝐩𝐬 𝐛𝐫𝐢𝐧𝐠𝐬 𝐚 𝐝𝐢𝐟𝐟𝐞𝐫𝐞𝐧𝐭 𝐩𝐞𝐚𝐜𝐞<3🥺",
 attachment: await global.utils.getStreamFromURL("https://i.postimg.cc/XNz4dJBg/30348898.gif")
 });
 }
 }
	 }
