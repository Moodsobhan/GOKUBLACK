module.exports = {
  config: {
    name: "autoreact",
    author: "MR.AYAN",// original fb I'd  : https://m.me/MR.AYAN.2X **//
    version: "1.0",
    role: 0,
    shortDescription: "autoreact",
    longDescription: "auto reaction in message PH version",
    category: "system",
  },
  onStart: async function () {
    // Add initialization logic here if needed
  },
  onChat: async function ({ event, api }) {
    const message = event.body.toLowerCase();

    const reactionsMap = {
      "😆": ["haha", "lol", "funny", "nah", "i'd", "win", "hahah", "hahaha", "masaya", "tawo", "happy", "tomboy", "natomba", "natumba", "tomomba", "tumumba", "tomumba", "side eye", "awooop jumpscare", "naol", "sana all", "bakla", "bading", "bayot","biot", "gay","akla", "nalo", "nalu", "nigga", "niga", "nega", "puta", "pota", "tangina", "tae", "taenamo", "inamo", "namo", "puking", "wutdahel", "blud","wala", "hinde", "ngayon", "bukas", "pangit", "umay", "omay", "panget","ogag", "bulok", "bolok", "bobo", "bubu", "bogo", "bugo", "tanga", "amp", "tungek", "tangek","obob", "boang", "buang", "sira","ulo", "ulol", "tite", "bayag", "burat", "bilat", "borat", "bhielat", "😆", "😁", "😅", "😄" ,"🤣", "😹", "😂", "pak", "pakyo", "shit", "bato", "batu", "unggoy", "suntukan", "lou", "Lou", "hindot", "sinto","kupal", "kopal","omsim", "mismo", "omsem", "nanento", "gago", "gagu", "gagi", "otenan", "putanginamo", "pwet", "pw3t", "fuck", "bisaya", "bisakol", "bastos", "bastus", "hayop", "hayup", "hayp", "lmao", "lamaw", "xd", "bayut", "poor", "hampas", "mahirap", "mahina", "tulog", "tolog", "negro", "kingina", "indiano", "beki", "shokoy", "lods", "uwu", "nyoging", "omai", "bantot", "baho", "piste", "peste", "bulbol", "tubol", "pastilan", "giatay", "unsa", "jakul", "jakol", "abdul", "salsal", "cp", "lubot", "gisalpak", "oten", "imong", "kasi", "oo", "char", "chariz", "joke"],
      "😢": ["cry", "sad", "crying", "lungkot", "huhu", "iyak", "hays", "🥲", "😓", "😭", "eyak", "sakit", "peyn", "pain", "pighati", "dalamhati", "condolence", "paalam", "gwenchana", "saktan", "minsan", "mamatay", "depress", "kalungkutan", "🙃", "😔", "😢", "🥹", "☹️"],
      "❤️": ["hi", "hey", "hello", "yo", "sup", "zup", "halo", "henlo", "love", "mahal", "salamat", "thank", "ty", "tnx", "thx", "thnx", "yup", "crush", "sarap", "ugh", "pogi", "iyot", "kantot", "kiss", "ganda", "babe", "baby", "darling", "labyu", "eve", "morning", "good", "aft", "❤️", "🥰", "😘", "😍", "🤩", "gm", "gn", "mwa", "mwua", "mwhehe", "nice", "mahusay", "galing", "miss", "bot", "jaycee", "kaizen", "pusa"],
      "🎮": ["laro", "laru", "game", "mc", "minecraft", "ml", "mlbb", "mobile legends", "mobile legends bang bang", "cod", "call of duty", "play", "1v1", "farlight", "f84", "coc", "basketball"],
      "😮": ["wow", "waw", "shish", "sheesh", "angas", "lakas", "lopit", "mamaw", "pro", "god", "mod apk", "hakir", "haker", "hacker", "way", "omahghadd", "omg", "bro", "💀", "😮", "🥶", "😱", "😲", "⁉️", "‼️", "🔥", "main karaktir", "karaktir"],
      "🔥": ["eyy", "fire"]
      // Add more reactions and associated keywords as needed
    };

    console.log("Message:", message);

    for (const [reaction, keywords] of Object.entries(reactionsMap)) {
      console.log("Reaction:", reaction);
      console.log("Keywords:", keywords);

      if (keywords.some((word) => message.includes(word))) {
        console.log("Reacting with:", reaction);
        api.setMessageReaction(reaction, event.messageID, event.threadID, api);
        break; // Stop checking once a reaction is set
      }
    }
  },
}; 
