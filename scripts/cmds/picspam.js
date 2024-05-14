.cmd install imgspam.js const { getStreamFromURL } = global.utils;

module.exports = {
    config: {
        name: "picspam",
        aliases: ["imgspam", "ispammer", "is"],
        version: "2.0",
        author: "MR.AYAN",
        countDown: 3,
        role: 2,
        description: {
            en: "𝗜𝗺𝗮𝗴𝗲 𝗦𝗽𝗮𝗺𝗺𝗲𝗿"
        },
        category: "𝗔𝗗𝗠𝗜𝗡",
        guide: {
            en: "{pn}"
            + "\n{pn} imgUrl | count"
            + "\n{pn} | count" //default count is random == 1-10
        }
    },

    onStart: async function ({ args, message, event }) {
        try{
        if(!(global.GoatBot.config.DEV).includes(event.senderID)){
            return message.reply("Fuck your mother shit🥹💔");
        }else{
        let [imgUrl, count] = (args.join(' ')).split('|').map(item => item.trim());
        const r = [8,4,3,2,1,5,9,10,7,5,6];
        if (!args[0] && !imgUrl){
          imgUrl = "https://telegra.ph/file/2471c9759156cff9c12f0.jpg";
        }
        else if(event.messageReply.attachments && event.messageReply.attachments.length > 0){
            imgUrl = event.messageReply.attachments[0].url;
        }
        else if(!event.messageReply.attachments && event.messageReply.attachments.length === 0 && imgUrl){
            imgUrl = imgUrl; 
        }
          
        if (count > 0){
            count = count;
        }else{
            count = r[Math.floor(Math.random() * r.length)];
        }
       for (let i = 0; i < count; i++) {
           await message.reply({
            body: "",
            attachment: await getStreamFromURL(imgUrl)
           })
        }
    }   
    }catch(err){
        console.log(err);
        message.reply("Error: " + err.message);
    }  
   }
}; 
