module.exports = {
  config: {
    name: "textinfo",
    aliases: ['txtinfo'],
    version: "1.1",
    author: "Samir Thakuri",
    coolDown: 5,
    role: 0,
    shortDescription: "Counts words, characters, paragraphs, and lines in a text.",
    longDescription: "Counts words, characters, paragraphs, and lines in a text.",
    category: "study",
    guide: {
      en: "{pn} <text>"
    },
  },
  onStart: async function ({ api, event, args }) {
    
    const text = args.join(" ");
    if (!text) return api.sendMessage("Please provide the text to analyze.", event.threadID, event.messageID)

    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const charCountWithSpaces = text.length;
    const charCountWithoutSpaces = text.replace(/\s/g, '').length;
    const paragraphCount = text.split(/\n\n+/).length;
    const lineCount = text.split('\n').length;

    const resultMessage = `🔎 𝗧𝗘𝗫𝗧 𝗔𝗡𝗔𝗟𝗬𝗦𝗜𝗦:\n\n`
        + `𝗪𝗢𝗥𝗗 𝗖𝗢𝗨𝗡𝗧: ${wordCount}\n\n`
        + `𝗖𝗛𝗔𝗥𝗔𝗖𝗧𝗘𝗥 𝗖𝗢𝗨𝗡𝗧\n(with spaces): ${charCountWithSpaces}\n\n`
        + `𝗖𝗛𝗔𝗥𝗔𝗖𝗧𝗘𝗥 𝗖𝗢𝗨𝗡𝗧\n(without spaces): ${charCountWithoutSpaces}\n\n`
        + `𝗣𝗔𝗥𝗔𝗚𝗥𝗔𝗣𝗛 𝗖𝗢𝗨𝗡𝗧: ${paragraphCount}\n\n`
        + `𝗟𝗜𝗡𝗘 𝗖𝗢𝗨𝗡𝗧: ${lineCount}`;

    api.sendMessage(resultMessage, event.threadID, event.messageID)
  }
}