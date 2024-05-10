module.exports = {
 config: {
   name: "hii",
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
 if (event.body && event.body.toLowerCase() === "hii") {
 return message.reply({
 body: "😇🥀",
 attachment: await global.utils.getStreamFromURL("https://i.postimg.cc/V6XnMTDq/images.jpg")
 });
 }
 }
}
