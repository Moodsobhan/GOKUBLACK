const axios = require("axios");
module.exports = {
    config: {
        name: "niji",
        aliases: ["nijijourney", "art"],
        version: "1.0",
        author: "rehat--",
        countDown: 0,
        role: 0,
        description: "Text to Image",
        category: "𝗔𝗜-𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗘𝗗",
        guide: {
    en: `{pn} <prompt> --ar [ratio], [preset], [style], or reply to an image\n\n Example: {pn} 1girl, cute face, masterpiece, best quality --ar 16:9 --preset 2 --style 6\n\nAvailable Styles:\n1. Cinematic\n2. Photographic\n3. Anime\n4. Manga\n5. Digital Art\n6. Pixel Art\n7. Fantasy Art\n8. Neon Punk\n9. 3D Model\n\nAvailable Preset Styles:\n1. Standard v3.0\n2. Standard v3.1\n3. Light v3.1\n4. Heavy v3.1\nThanks for using the project`,
      }
    },

    onStart: async function({ api, args, message, event }) {
        try {
            let prompt = "";
            let style = "";
            let imageUrl = "";
            let preset = "";
            let aspectRatio = ""; 

            const styleIndex = args.indexOf("--style");
            if (styleIndex !== -1 && args.length > styleIndex + 1) {
                style = args[styleIndex + 1];
                args.splice(styleIndex, 2); 
            }

            const presetIndex = args.indexOf("--preset");
            if (presetIndex !== -1 && args.length > presetIndex + 1) {
                preset = args[presetIndex + 1];
                args.splice(presetIndex, 2); 
            }
            
            const aspectIndex = args.indexOf("--ar");
            if (aspectIndex !== -1 && args.length > aspectIndex + 1) {
                aspectRatio = args[aspectIndex + 1];
                args.splice(aspectIndex, 2); 
            }

            if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments.length > 0 && ["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
                imageUrl = encodeURIComponent(event.messageReply.attachments[0].url);
            } else if (args.length === 0) {
                message.reply("𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚙𝚛𝚘𝚖𝚙𝚝 𝚘𝚛 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊𝚗 𝚒𝚖𝚊𝚐𝚎.");
                return;
            }
            
            if (args.length > 0) {
                prompt = args.join(" ");
            }

            
            let apiUrl = `https://rehatdesu.xyz/api/imagine/niji?prompt=${encodeURIComponent(prompt)}.&aspectRatio=${aspectRatio}&apikey=rehat86&style=${style}&preset=${preset}`;
            if (imageUrl) {
                apiUrl += `&imageUrl=${imageUrl}`;
            }

            const processingMessage = await message.reply(" 𓃝 Initiating request");
            const response = await axios.post(apiUrl);
            const img = response.data.url;

            await message.reply({
                body: `✨ | 𝙷𝚎𝚛𝚎'𝚜 𝚈𝚘𝚞𝚛 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍 𝙸𝚖𝚊𝚐𝚎 \n\n📥 | 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝙻𝚒𝚗𝚔:\n${img}`,
                attachment: await global.utils.getStreamFromURL(img)
            });

        } catch (error) {
            console.error(error);
            message.reply("𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍.");
        }
    }
}; 
