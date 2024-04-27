module.exports = {
    config: {
        name: "hi",
        aliases: ["hii", "hyy", "hiii", "bro", "hlw"],
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
    if (event.body && event.body.toLowerCase() == "hi") return message.reply("𝐘𝐞𝐬 𝐢 𝐚𝐦 𝐦𝐢𝐫𝐚 𝐤𝐢𝐦");
}
}; 
