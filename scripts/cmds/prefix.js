module.exports = {
 config: {
   name: "prefix",
   version: "1.0",
   author: "MR.AYAN",
   countDown: 5,
   role: 0,
   shortDescription: "no prefix",
   longDescription: "no prefix",
   category: "auto 🪐",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "prefix") {
 return message.reply({
 body: `heyy bro, My prefix is [  %1  ]\n\n______________________________\n\nBox chat prefix : [ %2 ]\n\n𝗛𝗢𝗪 𝗧𝗢 𝗨𝗦𝗘?\nexample please type: %1help - to view all cmds\n%1menu\n%1info\n%1owner\n%1ping\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥: MR.AYAN ツ\n______________________________
`,
  attachment: await global.utils.getStreamFromURL("https://i.imgur.com/YMrKLFn.gif")
 });
 }
 }
} 
