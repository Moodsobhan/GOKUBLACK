const fs = require('fs');


let shortReactData = {};


try {
  const data = fs.readFileSync('short_reactions.json', 'utf-8');
  shortReactData = JSON.parse(data);
} catch (error) {
  console.error('Error reading JSON file:', error.message);
}

module.exports = {
  config: {
    name: "shortreact",
    category: "utility",
    role: 2,
    author: "Allou Mohamed"
  },

  onChat: async function({ message, event }) {
    const msgText = event.body.toLowerCase() || event.body;
    const groupId = event.threadID;

    if (shortReactData[groupId]) {
      for (const emoji in shortReactData[groupId]) {
        if (shortReactData[groupId][emoji].some(word => msgText.includes(word))) {
          message.reaction(emoji, event.messageID);
          break;
        }
      }
    }
  },

  onStart: async function({ message, args, event }) {
    if (!fs.existsSync('short_reactions.json')) {
      fs.writeFileSync('short_reactions.json', JSON.stringify(shortReactData, null, 2));
    }
    
    if (args.length < 3 || args[1] !== "=>") {
      return message.reply("Invalid format. Use: `!command word1,word2,word3... => 🙂`");
    }

    const emoji = args[0];
    const words = args.slice(2).join(' ').split(',').map(word => word.trim());
    const groupId = event.threadID;

    if (!shortReactData[groupId]) {
      shortReactData[groupId] = {};
    }

    if (!shortReactData[groupId][emoji]) {
      shortReactData[groupId][emoji] = words;
    } else {
      shortReactData[groupId][emoji] = shortReactData[groupId][emoji].concat(words);
    }

    fs.writeFileSync('short_reactions.json', JSON.stringify(shortReactData, null, 2));

    message.reply(`Added reaction: ${words.join(", ")} => ${emoji}`);
  }
};
