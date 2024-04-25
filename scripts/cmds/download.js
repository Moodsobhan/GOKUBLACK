const axios = require('axios');

module.exports = {
	config: {
		name: "download",
		version: "1.0",
		author: "MR.AYAN", //** original anthor fb I'd : https://m.me/MR.AYAN.2X **//
		countDown: 0,
		role: 0,
		shortDescription: "Downdload Instagram video",
		longDescription: "download Instagram video's,story,reels, photo etc.",
		category: "media",
		guide: "{pn} link"
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ");
		if (!name)
			return message.reply(`🔴 |  𝙋𝙡𝙚𝙖𝙨𝙚 𝙀𝙣𝙩𝙚𝙧 𝙖 𝙐𝙧𝙡-!!`);
		else {
			const BASE_URL = `https://www.nguyenmanh.name.vn/api/igDL?url=${encodeURIComponent(name)}=&apikey=SyryTUZn`;

			 await message.reply("🕐 |  𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙄𝙉𝙂 𝙑𝙄𝘿𝙀𝙊 𝙋𝙇𝙀𝘼𝙎𝙀 𝙒𝘼𝙄𝙏...");


			try {
				let res = await axios.get(BASE_URL)


				 let title = res.data.result.title

				let img =  res.data.result.video[0].url;

				const form = {
					body: `✅𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 𝙑𝙄𝘿𝙀𝙊 𝙎𝙐𝘾𝘾𝙀𝙎𝙁𝙐𝙇\n\n♕︎𝐓𝐈𝐓𝐋𝐄 : ${title}`
				};
			if (img)
					form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(form);  
			} catch (e) { message.reply(`𝙎𝙤𝙧𝙧𝙮 𝙐𝙧𝙡 𝙄𝙨 𝙉𝙤𝙩 𝙎𝙪𝙥𝙥𝙤𝙧𝙩𝙚𝙙-!!🥺`)
									console.log(e);
									}

		}
	}
}; 
