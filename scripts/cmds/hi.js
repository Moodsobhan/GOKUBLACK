module.exports = {
    config: {
        name: "hi",
        aliases: ["hii", "hii", "hiii", "hello", "bro", "hlw"],
        version: "1.0",
        author: "MR.AYAN", //** original author fb I'd : https://m.me/MR.AYAN.2X **//
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "hi") return message.reply("𝗛𝗲𝗹𝗹𝗼 𝗕𝗮𝗯𝗲🤭🤭\n\n𝗛𝗼𝘄 𝗮𝗿𝗲 𝗬𝗼𝘂 𝗠𝘆 𝗱𝗮𝗿𝗹𝗶𝗻𝗴-!!🐸");
}
}; 
