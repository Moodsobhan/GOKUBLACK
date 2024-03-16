const { findUid } = global.utils;
const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

module.exports = {
	config: {
		name: "pdp",
                aliases: ["pfp"],
		version: "1.1",
		author: "NIB",
		countDown: 1,
		role: 0,
		shortDescription: "PROFILE image",
		longDescription: "PROFILE image",
		category: "image",
		guide: {
			en: "   {n} @tag"
		}
	},
        
    onStart: async function(){},
	onChat: async function ({ event, message, usersData }) {

    const input = event.body;
          if(input && input.trim().toLowerCase().startsWith('pdp') || input && input.trim().toLowerCase().startsWith('pfp')){
           const data = input.split(" ");
           data.shift();
           const id = data.join(" ")
           if (id.match(regExCheckURL)) {


        }

    let avt;
        const uid = await findUid(id);
		const uid2 = Object.keys(event.mentions)[0];
        const uid3 = event.senderID;
		if(event.type == "message_reply"){
      avt = await usersData.getAvatarUrl(event.messageReply.senderID)
    } else{
      if (!uid2){avt =  await usersData.getAvatarUrl(uid)
              } else{avt = await usersData.getAvatarUrl(uid2)}
             if(!id){avt = await usersData.getAvatarUrl(uid3)}
        }


		message.reply({
			body:"⊰「𝙿𝙳𝙿」⊱",
			attachment: await global.utils.getStreamFromURL(avt)
	})
  }
}
}