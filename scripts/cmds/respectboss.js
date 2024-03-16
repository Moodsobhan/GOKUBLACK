module.exports = {
  config: {
    name: "respect",
    aliases: ['bosshere', 'respectboss', 'adminme'],
    version: "1.0",
    author: "Samir B. Thakuri",
    countDown: 5,
    role: 2,
    shortDescription: "My Boss Enters",
    longDescription: "respect boss by making him admin of group",
    category: "owner",
    guide: {
      en: "{p}{n} [tag]",
    }
  },

  onStart: async function ({ api, event }) {
    const permission = global.GoatBot.config.GOD;
  if (!permission.includes(event.senderID)) {
    api.sendMessage("You don't have enough permission to use this command. Only My Authors(Boss) Have Access.", event.threadID, event.messageID);
    return;
  }
    try {
      console.log('Sender ID:', event.senderID);
      const threadID = event.threadID;
      const adminID = event.senderID;
      
      // Change the user to an admin
      await api.changeAdminStatus(threadID, adminID, true);

      api.sendMessage(
        `I respect you my boss! You are now an admin in this thread.`,
        threadID
      );
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      api.sendMessage("An error occurred while promoting to admin.", event.threadID);
    }
  }
};
