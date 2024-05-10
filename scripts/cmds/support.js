module.exports = {
  config: {
    name: "support",
    aliases: ["supportgc", "gc", "joingc"],
    version: "1.0",
    author: "MR.AYAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Add to Supportgc for admin support and approval" 
    },
    longDescription: { 
      en: "Join the support group chat"
    },
    category: "𝗦𝗨𝗣𝗣𝗢𝗥𝗧",
    guide: {
      en: "{pn}"
     }
  },
  onStart: async function({ api, event }) {
    const supportGroupId = "7704667116245106";

    if (event.threadID === supportGroupId) {
      api.sendMessage("⚠ | You are already in the support group.", event.threadID);
    } else {
      try {
        await api.addUserToGroup(event.senderID, supportGroupId);
        api.sendMessage("✅ | You have been added to the support group.", event.threadID);
      } catch (error) {
        if (error.message === "Error: Add user to group: Action blocked") {
          api.sendMessage("❌ | Sorry, you can't be added to the group because of group settings.", event.threadID);
        } else {
          console.error(error);
          api.sendMessage("❌ | An error occurred while processing your request.", event.threadID);
        }
      }
    }
  }
};
