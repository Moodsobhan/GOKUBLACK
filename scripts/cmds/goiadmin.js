module.exports = {
config: {
  name: "goiadmin",
  author: "MR.AYAN", //**Convert By Goatbot MR.AYAN **// 
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "love",
  guide: "{pn}"
},
  onStart: async function ({ api, event }) {
  if (event.senderID !== "61558522534273") {
    var aid = ["61558522534273"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["AYAN BOSS bus ase jahh bolba amake bolo-!!😌", "AYAN boss chipay gese-!!🐸", "Sorry,My boss is offline-!!😕","Boss Ayan k akta gf khuje deu ayan boss piyor single-!!🥲","kicce Ayan boss k dako kn-!!😒"];
      api.setMessageReaction("😘", event.messageID, (err) => {}, true);
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
},
  }; 
