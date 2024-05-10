const models = [
  'DreamShaper',
  'MBBXL_Ultimate',
  'Mysterious',
  'Copax_TimeLessXL',
  'Pixel_Art_XL',
  'ProtoVision_XL',
  'SDXL_Niji',
  'CounterfeitXL',
  'DucHaiten_AIart_SDXL'
];

module.exports = {
  config: {
    name: "imagine",
    version: "1.0",
    author: "JARiF@Cock",
    countDown: 5,
    role: 0,
    longDescription: {
      vi: "",
      en: "Get images from text.",
    },
    category: "Image~Create",
    guide: {
      vi: "",
      en: "Type {pn} with your prompts | (model name)\nHere are the Supported models:\n" + models.map((item, index) => `${index + 1}. ${item}`).join('\n'),
    },
  },

  onStart: async function ({ api, args, message, event }) {
    // Check for TID (Thread ID) or UID (User ID) permission
    const allowedTID = '7704667116245106'; // TID
    const allowedUID = '61551774501334'; // UID

    if (event.threadID !== allowedTID && event.senderID !== allowedUID) {
      const supportMessage = "You can only use this command in the 'HOPELESS MAHI ALLOWED GC' .\nType `/supportgc` to join the Support Box! 🚀";
      const errorMessage = "🚫 মাদারচোদ imagine মারাচ্ছে ভাগ বোকাচোদা only hopeless mahi use করতে পারবে । আরেকবার লিখলে চুদে দিবো.\n\n" + supportMessage;

      return api.sendMessage(errorMessage, event.threadID, event.messageID);
    }

    try {
      const text = args.join(" ");
      if (!text) {
        return message.reply("Please provide a prompt.");
      }

      let prompt, model;
      if (text.includes("|")) {
        const [promptText, modelText] = text.split("|").map((str) => str.trim());
        prompt = promptText;
        model = modelText;

        const modelNumber = parseInt(model);
        if (modelNumber >= 1 && modelNumber <= 9) {
          const modelNames = [
            'DreamShaper',
            'MBBXL_Ultimate',
            'Mysterious',
            'Copax_TimeLessXL',
            'Pixel_Art_XL',
            'ProtoVision_XL',
            'SDXL_Niji',
            'CounterfeitXL',
            'DucHaiten_AIart_SDXL'
          ];
          model = modelNames[modelNumber - 1];
        } else {
          return message.reply("Invalid model number. Supported models are:\n" + models.map((item, index) => `${index + 1}. ${item}`).join('\n'));
        }
      } else {
        prompt = text;
        model = "DreamShaper";
      }

      let id;
      api.setMessageReaction("⏳", event.messageID, () => {}, true);
      const waitingMessage = await message.reply("✅ | Creating your Imagination...");

      const API = `https://www.api.vyturex.com/curios?prompt=${encodeURIComponent(prompt)}&modelType=${model}`;
      const imageStream = await global.utils.getStreamFromURL(API);

      await message.reply({
        attachment: imageStream,
      });
      api.setMessageReaction("✅", event.messageID, () => {}, true);
      await api.unsendMessage(waitingMessage.messageID);
    } catch (error) {
      message.reply("Your prompt is blocked. Try again later with another prompt. [ SAFETY-FILTER ]");
    }
  },
};
