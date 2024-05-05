const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

module.exports = {
  config: {
    name: "ass",
    author: "MR.AYAN",
    countDown: 5,
    category: "test"
  },
  onStart: async function({ event, message }) {
    try {
      if (event?.messageReply?.attachments?.[0]?.type !== "photo") {
        return message.reply("Invalid image reply")
      }
      message.reply("Processing")
      const buffer = await fuck(event.messageReply.attachments[0].url);
      const file = `anus${Date.now()}.png`
      fs.writeFileSync(file, buffer);
      await message.reply({ attachment: fs.createReadStream(file) });
     await new Promise(x => setTimeout(x, 5000));
fs.unlinkSync(file)
    } catch (err) {
      message.reply(err.message)
      console.error(err.message);
    }
  }
}


async function fuck(media) {
  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext('2d');

  const backgroundImage = await loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7YbzLhlbSmBDL--AXK9k-AjNWfeuo31KLyA&usqp=CAU");
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  const pfp = await loadImage(media);
  const pfpSize = 200;
  const pfpX = 412;
  const pfpY = 720;
  const borderRadius = pfpSize / 2;
  ctx.save();
  ctx.beginPath();
  ctx.arc(pfpX + pfpSize / 2, pfpY + pfpSize / 2, borderRadius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(pfp, pfpX, pfpY, pfpSize, pfpSize);
  ctx.restore();

  return canvas.toBuffer();
} 
