global.api = {
  samirApi: "https://apis-samir.onrender.com"
};

module.exports = {
  config: {
    name: "stalk",
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: "stalk",
    longDescription: "multi stalk command",
    category: "𝗜𝗡𝗙𝗢",
  },  /**User interface designed by Mesbah Bb'e */
  getTargetUID: (event) => {
    if (event.type === "message_reply") {
      return event.messageReply.senderID;
    } else {
      return event.senderID;
    }
  },

  getUserInfo: async (api, threadID, targetID) => {
    try {
      const data = await api.getUserInfo(targetID);
      const { name, gender, birthday, isOnline, isFriend, socialMediaLinks, profileUrl } = data[targetID];
      const genderText = gender === 1 ? "female" : gender === 2 ? "male" : "unknown";
      const userName = name || "Name not available";
      const uid = targetID;
      const areFriends = isFriend ? "Yes ✅" : "No ❌";
      const fbLink = `https://www.facebook.com/profile.php?id=${uid}`;
      const profilePicURL = profileUrl || "";
      const profilePic = `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      const message = {
        body: `
       ╭──『 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗦𝗧𝗔𝗟𝗞 』
       ✧ Name: ${userName}
       ✧ UID: ${uid}
       ✧ Gender: ${genderText}
       ✧ Friends: ${areFriends}
       ✧ Facebook Link: ${fbLink}
       ✧ Profile Picture:
       ╰───────────◊`,
        attachment: await global.utils.getStreamFromURL(profilePic),
      };
      api.sendMessage(message, threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while fetching user information.", threadID);
    }
  },

  onStart: async function ({ api, event, args }) {
    const { messageReply, senderID, threadID, type, mentions } = event;

    if (args.length > 0 && args[0] === 'fb') {
      const uid = this.getTargetUID(event);
      await this.getUserInfo(api, threadID, uid);
    } else if (args.length > 0 && args[0].toLowerCase() === 'insta') {
      const username = args[1];
      if (!username) {
        return api.sendMessage("Please provide an Instagram username.", event.threadID);
      }

      try {
        const apiUrl = `${global.api.samirApi}/stalk/insta?username=${username}`;
        const { data } = await axios.get(apiUrl);
        const { user_info } = data;

        if (!user_info) {
          return api.sendMessage("Profile not found.", event.threadID);
        }

        const profilePicStream = await global.utils.getStreamFromURL(user_info.profile_pic_url);
        const messageBody = `
        ╭──『 𝗜𝗡𝗦𝗧𝗔 𝗦𝗧𝗔𝗟𝗞 』
        ✧ Full Name: ${user_info.full_name}
        ✧ Username: @${user_info.username}
        ✧ Biography: ${user_info.biography}
        ✧ External URL: ${user_info.external_url ? user_info.external_url : "does not have"}
        ✧ Private Account: ${user_info.is_private ? "Yes" : "No"}
        ✧ Verified: ${user_info.is_verified ? "Yes" : "No"}
        ✧ Posts: ${user_info.posts}
        ✧ Followers: ${user_info.followers}
        ✧ Following: ${user_info.following}
        ╰───────────◊`.trim();

        await api.sendMessage({ body: messageBody, attachment: profilePicStream }, event.threadID);
      } catch (error) {
        console.error(error);
        return api.sendMessage("An error occurred while fetching the Instagram profile.", event.threadID);
      }
    } else if (args.length > 0 && args[0].toLowerCase() === 'tik') {
      const username = args.slice(1).join(" ");
      if (!username) {
        return api.sendMessage("Please provide a TikTok username.", event.threadID);
      }

      try {
        const response = await axios.get(`${global.api.samirApi}/tikstalk?username=${encodeURIComponent(username)}`);
        const data = response.data;

        let messageBody = `
        ╭──『 𝗧𝗜𝗞𝗧𝗢𝗞 𝗦𝗧𝗔𝗟𝗞 』
        ✧ Nickname: ${data.nickname}
        ✧ Username: ${data.username}
        ✧ Video Count: ${data.videoCount}
        ✧ Following Count: ${data.followingCount}
        ✧ Follower Count: ${data.followerCount}
        ✧ Heart Count: ${data.heartCount}
        ✧ Digg Count: ${data.diggCount}
        ╰───────────◊`;

        api.sendMessage({
          body: messageBody,
          attachment: await global.utils.getStreamFromURL(data.avatarLarger)
        }, event.threadID);
      } catch (error) {
        console.error(error);
        return api.sendMessage("Failed to fetch TikTok user information.", event.threadID);
      }
    } else if (args.length > 0 && args[0].toLowerCase() === 'twitter') {
      const username = args.slice(1).join(" ");
      if (!username) {
        return api.sendMessage("Please provide a Twitter username.", event.threadID);
      }

      try {
        const response = await axios.get(`${global.api.samirApi}/tweet/stalk?username=${encodeURIComponent(username)}`);
        const { profile, username: user, name, followers, following, media, statusCount, description } = response.data;

        let messageBody = `
        ╭──『 𝗧𝗪𝗜𝗧𝗧𝗘𝗥 𝗦𝗧𝗔𝗟𝗞 』
        ✧ Name: ${name}\n✧ Username: ${user}
        ✧ Followers: ${followers}
        ✧ Following: ${following}
        ✧ Media: ${media}
        ✧ Status Count: ${statusCount}
        ✧ Description: ${description}
        ╰───────────◊`;

        await api.sendMessage({
          body: messageBody,
          attachment: await global.utils.getStreamFromURL(profile)
        }, event.threadID);
      } catch (error) {
        console.error(error);
        return api.sendMessage("Failed to fetch Twitter user information.", event.threadID);
      }
    } else if (args.length > 0 && args[0].toLowerCase() === 'pastebin') {
      const username = args[1];
      if (!username) {
        return api.sendMessage("Please provide a Pastebin username.", event.threadID);
      }

      try {
        const apiUrl = `${global.api.samirApi}/pastebin/userinfo?name=${encodeURIComponent(username)}`;
        const response = await axios.get(apiUrl);
        const userInfo = response.data;

        const messageBody = `
        ╭──『 𝗣-𝗕𝗜𝗡 𝗦𝗧𝗔𝗟𝗞 』
        ✧ name ${userInfo.name}
        ✧ Viewing: ${userInfo.viewing}
        ✧ Total Views: ${userInfo.totalViews}
        ✧ Rating: ${userInfo.rating}
        ✧ Joined: ${userInfo.joined}
        ✧ Creation Date: ${userInfo.creationDate}
        ╰───────────◊`;

        await api.sendMessage({
          body: messageBody,
          attachment: await global.utils.getStreamFromURL(userInfo.userIcon)
        }, event.threadID);
      } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching Pastebin user information.", event.threadID);
      }
    } else if (args.length > 0 && args[0].toLowerCase() === 'github') {
      const username = args.slice(1).join(" ");
      if (!username) {
        return api.sendMessage("Please provide a GitHub username.", event.threadID);
      }

      try {
        const cyclic = 'cyclic';
        const response = await axios.get(`https://api-proxy.${cyclic}.app/gitstalk?user=${username}`);
        const userProfile = response.data.user;

        const messageBody = `
        ╭──『 𝗚𝗜𝗧𝗛𝗨𝗕 𝗦𝗧𝗔𝗟𝗞 』
        ✧ Name: ${userProfile.name}
        ✧ Username: ${userProfile.username}
        ✧ Bio: ${userProfile.bio}
        ✧ Followers: ${userProfile.followers}
        ✧ Following: ${userProfile.following}
        ✧ Total Public Repos: ${userProfile.publicRepos}
        ✧ Location: ${userProfile.location}
        ✧ Creation Date: ${userProfile.createdAt}
        ✧ Profile URL: ${userProfile.githubUrl}
        ✧ Profile Picture:
        ╰───────────◊
        `;
        const messageToSend = {
          body: messageBody,
          attachment: await global.utils.getStreamFromURL(userProfile.avatarUrl)
        };

        return api.sendMessage(messageToSend, event.threadID);
      } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the user information", event.threadID);
      }
    } else {
     api.sendMessage(`╭──『 𝗦𝗧𝗔𝗟𝗞 』  
✧ stalk fb <uid> | <mention>
✧ stalk insta <username>
✧ stalk tik <username>
✧ stalk twitter <username>
✧ stalk pastebin <username>
✧ stalk github <username>
╰───────────◊`, threadID);
    }
  },
}; 
