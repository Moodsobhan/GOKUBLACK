const fs = require("fs-extra");

module.exports = {
config: {
		name: "goibot",
    version: "1.0",
		author: "MR.AYAN",
		countDown: 5,
		role: 0,
		shortDescription: "no-prefix",
		longDescription: "Bot Will Reply You In Engish/Bangla Language",
		category: "no prefix",
		guide: {
      en: "{p}{n}",
    }
	},

 onStart: async function ({  }) { },
  onChat: async function ({ api, event, args, Threads, userData }) {
  
  var { threadID, messageID, senderID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;

  var Messages = ["Hey You, Yes You, You Are So Beautiful", "i Love You🙂", "Yes Dear, I Am Here...😗", "I Love you", "Miss YoU Beppy", "😁Smile I am Taking Selfy✌️🤳", "Block Your Babe And Purpose me 🙂💔", "Block Kardo Mujhe Warna Pyaar Hojayega💋", "I See You Inside Everyone", "That's Why I Love Everyone As More As You🤭", "Nope But, My Heart Is Falling For You My Preety Boyyy🙌✨", "Everybody Wanna Steal My Boyy😫", "আমি আপনাকে কিভাবে সাহায্য করতে পারি...? 🤔", "আদেশ করুন বস...🙂", "হুম শুনছি আমি আপনি বলুন 😐", "আমার সব কমান্ড দেখতে {pn}help টাইপ করুন ✅", "Ji bolen ki korte pari ami apnar jonno...?", "আদেশ করুন যাহাপানা 😎", "আবার যদি আমারে বট কইয়া ডাক দেছ তাইলে তোর বিয়ে হবে না 🫤😏", "I am your personal assistant", "তুই বট তোর নানি বট 😤 তোর কত বড় সাহস তুই আমারে বট কস 😤 তোর টা খাই নাকি পড়ি যে তুই আমারে বট কস 😤", "আপনার কি চরিত্রে সমস্যা যে এতো বার আমাকে ডাকতেছেন 🤨", "ডাকছোত কেন ফাস্ট কো 😒", "তুমি কি আমাকে ডেকেছো...? 😇"];

    var rand = Messages[Math.floor(Math.random() * Messages.length)]
    
        if ((event.body.toLowerCase() == "bot love you") || (event.body.toLowerCase() == "bot i love you")) {
         return api.sendMessage("সরি,ভালোবাসা আমার দারা হবে না-!!😔", threadID);
       };

        if ((event.body.toLowerCase() == "ayan") || (event.body.toLowerCase() == "ayan son")) {
         return api.sendMessage("এতো আয়ান বসকে ডাকেন কেন হুম-??🤨", threadID);
       };

       if ((event.body.toLowerCase() == "😇") || (event.body.toLowerCase() == "bot 😇")) {
         return api.sendMessage("এই ইমোজিটা দিবেন না পিলিজ এটা কে মহান আল্লাহর সাথে তুলনা করা হয় তাই কেউ দিবেন না পিলিজ-!!🙂", threadID);
       };

       if ((event.body.toLowerCase() == "owner") || (event.body.toLowerCase() == "bot kar")) {
         return api.sendMessage(" My real anthor fb I'd : \n\nhttps://m.me/MR.AYAN.2X", threadID);
       };

       if ((event.body.toLowerCase() == "😂") || (event.body.toLowerCase() == "😂😂")) {
         return api.sendMessage("দাঁত পরে গেলো-!!😦", threadID);
       };

      if ((event.body.toLowerCase() == "💔") || (event.body.toLowerCase() == "💔💔")) {
         return api.sendMessage("বিশ্বাস করো ভালোবাসা সুন্দর কিন্তু তার থেকে বেশি সুন্দর বন্ধুত্ব-!!😍😘", threadID);
       };

       if ((event.body.toLowerCase() == "😳") || (event.body.toLowerCase() == "😳😳")) {
         return api.sendMessage("অবাক হওয়ার কিছুই নাই-!!🐸", threadID);
       };

       if ((event.body.toLowerCase() == "🙂") || (event.body.toLowerCase() == "🙂🙂")) {
         return api.sendMessage("কি হলো জানু তোমার মন খারাপ কেন-!!🤨", threadID);
       };

       if ((event.body.toLowerCase() == "morning") || (event.body.toLowerCase() == "good morning")) {
         return api.sendMessage("️Gd morning-!!😸", threadID);
       };

       if ((event.body.toLowerCase() == "hi") || (event.body.toLowerCase() == "hii")) {
         return api.sendMessage("️Hello-!!💝", threadID);
       };

       if ((event.body.toLowerCase() == "ayan fb I'd") || (event.body.toLowerCase() == "i'd")) {
         return api.sendMessage("️https://m.me/MR.AYAN.2X", threadID);
       };

       if ((event.body.toLowerCase() == "nn nha mng") || (event.body.toLowerCase() == "nn nha mng")) {
         return api.sendMessage("️Sleep well <3 Wish you all super nice dreams <3", threadID);
       };

       if ((event.body.toLowerCase() == "🐸") || (event.body.toLowerCase() == "🐸🐸")) {
         return api.sendMessage("কি হইছে আমি কিন্তু ব্যাঙ দেখে ভয় পাই না-!!😼", threadID);
       };

       if ((event.body.toLowerCase() == "flop over") || (event.body.toLowerCase() == "flop")) {
         return api.sendMessage("️1 is interaction, 2 is kick :))))", threadID);
       };

       if (event.body.indexOf("Bot") == 0 || (event.body.toLowerCase() == "bot") || (event.body.indexOf("বট") == 0)) {
    var msg = {
      body: ` ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  }
}
}; 
