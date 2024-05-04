const anilist = require('anilist-node');
const axios = require('axios');
const cheerio = require('cheerio');

const Anilist = new anilist();

module.exports = {
  config: {
    name: "anilist",
    version: "1.0",
    role: 0,
    countDown: 10,
    author: "Jsus",
    shortDescription: { en: "Get someone's Anilist history" },
    longDescription: { en: "Get someone's Anilist history via UserName, ID, reply, or just yours" },
    category: "anime",
    guide: {
      en: "{pn} set [userName] - To save your Anilist userName\n" +
        "{pn} view [userName] - To get intel on the provided userName\n" +
        "{pn} - Get your Intel"
    }
  },
  onStart: async function({ usersData, message, args, event, api }) {
    try {
      switch (args[0]) {
        case 'set':
          return await process({ event, args, message, type: "set", usersData, api });
        case 'view':
          return await process({ event, args, message, type: "view", usersData, api });
        default:
          return await process({ event, args, message, type: "self", usersData, api });
      }
    } catch (error) {
      handleError(error, message, api);
    }
  }
}

async function process({ event, args, type, message, usersData, api }) {
  let sending;
  try {
    switch (type) {
      case 'set':
        if (!args[1]) return message.reply("Include the UserName of your Anilist account and make sure the privacy is set to public");
        const userProfile = await Anilist.user.profile(args[1]);
        const userID = userProfile.id;
        await usersData.set(event.senderID, { data: { anilist: args[1], anilistID: userID } });
        return message.reply("Saved your Anilist UserName");

      case 'view':
        if (!args[1]) return message.reply("Include the UserName of whose account you want to check");
        sending = await message.reply(`Fetching their Profile`);
        const userProfileView = await Anilist.user.profile(args[1]);
        const userIDView = userProfileView.id;
        const stuff = await check(args[1], userIDView);
        const form = {
          body: `${stuff.profile}\n${stuff.recentActivities}`,
          attachment: await global.utils.getStreamFromURL(stuff.metaImage)
        }
        await message.unsend(sending.messageID);
        message.reply(form);
        break;

      case 'self':
        let anilist;
        let UID;
        if (event.messageReply) {
          const repliedUserData = await usersData.get(event.messageReply.senderID);
          if (!repliedUserData.data.anilist) return message.reply("The Replied person has not paired his Anilist account");
          anilist = repliedUserData.data.anilist;
          UID = repliedUserData.data.anilistID;
          sending = await message.reply(`Fetching ${repliedUserData.data.anilist}'s Profile`);
        } else {
          const user = await usersData.get(event.senderID);
          if (!user.data.anilist) return message.reply("You have not paired your Anilist account");
          anilist = user.data.anilist;
          UID = user.data.anilistID;
          sending = await message.reply("Fetching your profile");
        }

        const stuffSelf = await check(anilist, UID);
        const formSelf = {
          body: `${stuffSelf.profile}\n${stuffSelf.recentActivities}`,
          attachment: await global.utils.getStreamFromURL(stuffSelf.metaImage)
        }
        await message.unsend(sending.messageID);
        message.reply(formSelf);
        break;
    }
  } catch (error) {
    message.reply(error.message)
  }
}

async function check(user, UID) {
  const url = `https://anilist.co/user/${user}/`;

  try {
    const { metaImage } = await fetchMetaImage(url);
    const statistics = await getUserStats(user, UID);
    const recentActivityData = await Anilist.user.getRecentActivity(UID);
    const recentHistory = recentActivityData.slice(0, 10);
    const formattedHistory = formatHistory(recentHistory, user);

    const profileOutput = `
∿∿∿ Anime Statistics ∿∿∿
    ${statistics.anime}

∿∿∿ Manga Statistics ∿∿∿
    ${statistics.manga}`;

    const recentActivitiesOutput = `
∿∿∿ Recent Activities ∿∿∿
\n${formattedHistory.join('\n')}
`;

    return {
      profile: profileOutput,
      recentActivities: recentActivitiesOutput,
      metaImage,
      UID,
      statistics
    };
  } catch (e) {
    throw e;
  }
}

async function fetchMetaImage(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const metaImage = $('meta[property="og:image"]').attr('content');
    return { metaImage };
  } catch (e) {
    return "https://i.ibb.co/GTHLQMH/437795737-409846748441463-1417744220946923667-n-jpg-stp-dst-jpg-p480x480-nc-cat-104-ccb-1-7-nc-sid-5.jpg"
  }
}

async function getUserStats(username, UID) {
  const [statsData] = await Promise.all([
    Anilist.user.stats(username),
    Anilist.user.getRecentActivity(UID)
  ]);

  return {
    anime: `
    ◈ Anime Watched: ${statsData.anime.count}
    ◈ Episodes Watched: ${statsData.anime.episodesWatched}
    ◈ Time Spent: ${statsData.anime.minutesWatched} minutes
    ◈ Average Score: ${statsData.anime.meanScore.toFixed(2)}`,
    manga: `
    ◈ Manga Read: ${statsData.manga.count}
    ◈ Chapters Read: ${statsData.manga.chaptersRead}
    ◈ Volumes Read: ${statsData.manga.volumesRead}
    ◈ Average Score: ${statsData.manga.meanScore.toFixed(2)}`
  };
}

function formatHistory(recentHistory, usr) {
  return recentHistory.map((entry, index) => {
    if (entry.media) {
      const title = entry.media.title?.english || entry.media?.title.userPreferred;
      let progress = entry?.progress || '';
      return `${index + 1}. ${title} (${toTitleCase(`${entry.status} ${progress}`)})`;
    } else {
       return entry?.type === "TEXT" ? `${index + 1}. ${usr} posted a Status` : `${index + 1}. ${usr} added some status`;
    }
  });
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
} 
