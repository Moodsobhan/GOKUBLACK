const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
  config: {
    name: "gistbin",
    version: "1.0",
    author: "rehat--",
    countDown: 5,
    role: 0,
    longDescription: {
      en: "This command allows you to upload files in Gist"
    },
    category: "owner",
    guide: {en: "{pn} <file_name>"}
  },

  onStart: async function ({ api, event, args, content }) {
    const text = args.slice(1).join(" ");
    const fuck = args.join(" ");

    const permission = global.GoatBot.config.DEV;
    if (!permission.includes(event.senderID)) {
      api.sendMessage(fuck, event.threadID, event.messageID);
      return;
    }
    if (!args[0]) {
      return api.sendMessage('Please learn how to use .gistbin <name>', event.threadID);
    }
    const fileName = args[0];
    const filePathWithoutExtension = path.join(__dirname, '..', 'cmds', fileName);
    const filePathWithExtension = path.join(__dirname, '..', 'cmds', fileName + '.js');

    if (!fs.existsSync(filePathWithoutExtension) && !fs.existsSync(filePathWithExtension)) {
      return api.sendMessage('File not found!', event.threadID);
    }

    const filePath = fs.existsSync(filePathWithoutExtension) ? filePathWithoutExtension : filePathWithExtension;
    fs.readFile(filePath, 'utf8', async (err, data) => { if (err) throw err;
    const file = data;
    const name = fileName;
      try {
        const paste = await axios.get(`https://public-apis-project86.vercel.app/api/gist?text=${encodeURIComponent(file)}&token=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&name=${encodeURIComponent(name)}`);
        const raw = (paste.data.url)
        api.sendMessage(`${raw}`, event.threadID , event.messageID);
      } catch (error) {
        console.error(error);
        message.reply('An error occurred.');
      }
    });
  },
};