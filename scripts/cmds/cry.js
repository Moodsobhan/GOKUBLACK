module.exports = {
 config: {
   name: "cry",
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
 if (event.body && event.body.toLowerCase() === "cry") {
 return message.reply({
 body: "𝐈 𝐂𝐑𝐘 𝐀 𝐋𝐀𝐓<3😭",
 attachment: await global.utils.getStreamFromURL("https://i.postimg.cc/QtNhkKqf/BQM6j-EZ-UJLg-GUuvr-Nk-YUCG8p-X1-Wh-ZLi-R4h-oxkq-Qe-BRBDdkd-Oj-Qt6e-DACqauh-K-u-Wl-QZkz0h-J-u-RHJyd-U63-Q.gif")
 });
 }
 }
}
