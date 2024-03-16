const Monitor = require('ping-monitor');
const notifier = require('node-notifier');

const myMonitor = new Monitor({
    address: '157.240.15.35',//change the ip address of the web to run the bot or leave 127.0.0.1 also known as localhost nha bruh( just for pro 🐧)
    port: 8080, //port bot 
    interval: 50, // 10 giây
  config: {
    intervalUnits: 'minutes', // minutes, seconds,hour
    generateId: true // defaults is true
  }
});


myMonitor.on('up', function (res, state) {
    console.log('Check Connected : ' + res.address + ':' + res.port + ' Is Online !'); //ping 
});


myMonitor.on('up', function (res, state) {
    console.log('Check Connected : ' + res.address + ':' + res.port + ' Is online !');
      return notifier.notify({title: 'Check Connected',message: 'Dead Bot =))'});// noti
});


myMonitor.on('run', function (res, state) {
    console.log(res.address + ' monitor has run.');
      return notifier.notify({title: 'Check Connected',message: 'Dead Bot =))'});
});


myMonitor.on('error', function (error, res) {
    console.log(error);
    return notifier.notify({title: 'Check Connected',message: 'Bot Damn it =))'});
});


myMonitor.on('timeout', function (error, res) {
    console.log(error);
      return notifier.notify({title: 'Check Connected',message: 'Bot Damn it =))'});
});