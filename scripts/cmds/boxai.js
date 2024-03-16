const axios = require("axios");
const moment = require("moment-timezone");
let FONT_ENABLED = true;
let lastQuery = "";

module.exports = {
  config: {
  name: "boxai",
  version: "1.2.0",
  role: 0,
  author: "Hazeyy x 𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
  longDescription: "( 𝙱𝚕𝚊𝚌𝚔𝙱𝚘𝚡 𝙰𝙸 )",
  category: "Noprefix",
  guide: "( 𝙼𝚘𝚍𝚎𝚕 - 𝙱𝚕𝚊𝚌𝚔𝙱𝚘𝚡 𝙰𝙸 )",
  countDown: 3
},
  onStart: async function(){},
  onChat: async function({ api, event }) {
  const lowerCaseBody = event.body.trim().toLowerCase();

  if (lowerCaseBody.startsWith("box on")) {
    FONT_ENABLED = true;
    api.sendMessage({
      body: `🤖 𝙱𝚕𝚊𝚌𝚔𝙱𝚘𝚡 𝙵𝚘𝚗𝚝\n\n» 🟢 𝙴𝚗𝚊𝚋𝚕𝚎𝚍 «`,
      attachment: null,
      mentions: [],
    }, event.threadID);
    return;
  }

  if (lowerCaseBody.startsWith("box off")) {
    FONT_ENABLED = false;
    api.sendMessage({
      body: `🤖 𝙱𝚕𝚊𝚌𝚔𝙱𝚘𝚡 𝙵𝚘𝚗𝚝\n\n» 🔴 𝙳𝚒𝚜𝚊𝚋𝚕𝚎𝚍 «`,
      attachment: null,
      mentions: [],
    }, event.threadID);
    return;
  }

  if (!lowerCaseBody.startsWith("box")) return;

  const args = event.body.split(/\s+/);
  args.shift();

  if (!args[0]) {
    api.sendMessage("🤖 𝙷𝚎𝚕𝚕𝚘 𝙸 𝚊𝚖 𝙱𝚕𝚊𝚌𝚔𝙱𝚘𝚡 𝙰𝙸 𝚝𝚛𝚊𝚒𝚗𝚎𝚍 𝚋𝚢 𝙶𝚘𝚘𝚐𝚕𝚎.\n\n𝙷𝚘𝚠 𝚖𝚊𝚢 𝚒 𝚊𝚜𝚜𝚒𝚜𝚝 𝚢𝚘𝚞 𝚝𝚘𝚍𝚊𝚢?", event.threadID, event.messageID);
    return;
  }

  const query = args.join(" ");

  if (query === lastQuery) {
    api.sendMessage("🕛 | 𝚄𝚙𝚍𝚊𝚝𝚎𝚍 𝙰𝚗𝚜𝚠𝚎𝚛 𝚝𝚘 𝚙𝚛𝚎𝚟𝚒𝚘𝚞𝚜 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);
    return;
  } else {
    lastQuery = query;
  }

  api.sendMessage("🗨️ | 𝙱𝚕𝚊𝚌𝚔𝙱𝚘𝚡 𝙰𝙸 𝚒𝚜 𝚝𝚑𝚒𝚗𝚔𝚒𝚗𝚐....", event.threadID, event.messageID);

  try {
    const response = await axios.get(`https://code-merge-api-hazeyy01.replit.app/blackbox/ask?q=${encodeURIComponent(query)}`);

    if (response.status === 200 && response.data && response.data.message) {
      const answer = response.data.message;
      const formattedAnswer = formatFont(answer);
      const currentTimePH = formatFont(moment().tz('Asia/Manila').format('hh:mm:ss A'));

      api.sendMessage(`🎓 𝐁𝐥𝐚𝐜𝐤𝐁𝐨𝐱 ( 𝐀𝐈 )\n\n🖋️ 𝐀𝐬𝐤: '${query}'\n\n${formattedAnswer}\n\n» ⏰ 𝚃𝚒𝚖𝚎: .⋅ ۵ ${currentTimePH} ۵ ⋅. «`, event.threadID, event.messageID);
    } else {
      api.sendMessage("🚫 𝙴𝚛𝚛𝚘𝚛 𝚗𝚘 𝚛𝚎𝚕𝚎𝚟𝚊𝚗𝚝 𝚊𝚗𝚜𝚠𝚎𝚛 𝚏𝚘𝚞𝚗𝚍..", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚜𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚘𝚗 𝙱𝚕𝚊𝚌𝚔𝙱𝚘𝚡 𝙰𝙿𝙸...", event.threadID, event.messageID);
    return;
  }
  }
};

function formatFont(text) {
  const FONT_MAPPING = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
    n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
    N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
  };

  let formattedOutput = "";
  for (const char of text) {
    if (FONT_ENABLED && char in FONT_MAPPING) {
      formattedOutput += FONT_MAPPING[char];
    } else {
      formattedOutput += char;
    }
  }

  return formattedOutput;
}
