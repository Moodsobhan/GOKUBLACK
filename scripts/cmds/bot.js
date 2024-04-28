module.exports = {
    config: {
        name: "bot",
        version: "1.0",
        author: "MR.AYAN",//**original anthor fb I'd : https://m.me/MR.AYAN.2X **//
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
    if (event.body && event.body.toLowerCase() == "bot") return message.reply("Ami bot na amr name mira-!!😑");
}
}; 
