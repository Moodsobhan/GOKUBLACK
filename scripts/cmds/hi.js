module.exports = {
    config: {
        name: "hi",
        aliases: ["hii", "hyy", "hiii", "hello", "bro", "hlw"],
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
    if (event.body && event.body.toLowerCase() == "hi", "hyy", "hii", "hiii", "hello", "bro", "hlw") return message.reply("𝗛𝗲𝗹𝗹𝗼,𝗜 𝗮𝗺 𝗺𝗶𝗿𝗮 𝗸𝗶𝗺\n\n𝗛𝗼𝘄 𝗰𝗮𝗻 𝗶 𝗮𝘀𝘀𝗶𝘀𝘁 𝘆𝗼𝘂?");
}
}; 
