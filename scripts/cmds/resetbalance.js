module.exports = {
  config: {
    name: "resetbalance",
    author: 'loufi libra',
    aliases: ["resetbal"],
    role: 2,
    category: "admin",
    shortDescription: {
      en: "Reset the balance of a user"
    },
    longDescription: {
      en: "This command resets the balance of a specified user."
    },
    guide: {
      en: "{p}reset <user-id>"   
    }
  },
  onStart: async function ({ event, args, usersData, api, message }) {
    const per = global.GoatBot.config.DEV;
  if (!per.includes(event.senderID)) {
    api.sendMessage("You don't have enough permission to use this cmd. Only my Author and Admin Bot can use this.", event.threadID, event.messageID);
    return;
  }

    const adminID = event.senderID; 

    if (args.length < 1) {
      message.reply("Please provide the user ID to reset the balance.");
      return;
    }

    const userID = args[0];

    try {
      const userData = await usersData.get(userID);
      if (!userData) {
        message.reply("User not found.");
        return;
      }

      await usersData.set(userID, {
        name: userData.name,
        money: 0
      });

      message.reply("Balance reset successfully!");
    } catch (error) {
      console.error(error);
      message.reply("An error occurred. Please try again later.");
    }
  }
};