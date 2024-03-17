const fs = require('fs');

let loveConfig;
try {
  loveConfig = JSON.parse(fs.readFileSync('murgi.json', 'utf-8'));
} catch (error) {
  console.error('Error reading murgi.json:', error);
  process.exit(1); 
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRangeArray(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

module.exports = {
  config: {
    name: "lovee",
    aliases: ["lovemessage"],
    version: "1.0",
    author: "yourname",
    role: 2,
    category: "Love",
    shortDescription: "Send love messages to a mentioned user.",
    longDescription: "",
    guide: {
      vi: "Not Available",
      en: "{p} lovee @mention <range1> [<range2> ...]"
    }
  },

  onStart: async function ({ api, event, userData, args }) {
    // Mentioned user
    const mention = Object.values(event.mentions)[0];
    if (!mention) return api.sendMessage("Please mention someone you want to send love to. 💖", event.threadID);

    // Accessing loveConfig for JSON-based configuration
    const loveMessages = (loveConfig && loveConfig.messages) || [];

    // Extracting ranges from arguments
    const ranges = args.slice(1);

    // Prepare an array to store selected message indices
    let selectedIndices = [];

    // Process each specified range
    for (const range of ranges) {
      const [start, end] = range.split('-').map(Number);

      if (!isNaN(start) && !isNaN(end) && start <= end && start >= 0 && end < loveMessages.length) {
        // If the range is valid, add indices to the selectedIndices array
        selectedIndices = selectedIndices.concat(getRangeArray(start, end));
      }
    }

    // If no valid ranges are specified, select a random message
    if (selectedIndices.length === 0) {
      selectedIndices.push(getRandomNumber(0, loveMessages.length - 1));
    }

    // Shuffle the selected indices
    selectedIndices = selectedIndices.sort(() => Math.random() - 0.5);

    // Sending love messages based on selected indices
    for (const index of selectedIndices) {
      // Mentioning the specified user by name
      const taggedMessage = `@${mention.fullName || mention.name || mention.userID} ${loveMessages[index]}`;

      // Sending the love message
      api.sendMessage(taggedMessage, event.threadID);

      // Adding a shorter delay between messages (adjust as needed)
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    }
  }
};
