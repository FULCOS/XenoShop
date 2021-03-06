const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client(586911197979344903);
const { DiscordToken } = require('NTg2OTExMTk3OTc5MzQ0OTAz.XQvbJQ.jm-VG6jRHMGspe6g1vzgWSP1RRc');

var subbedChannels = [];

if (fs.existsSync('channels.json')) {
    subbedChannels = JSON.parse(fs.readFileSync('channels.json'));
}

const promiseSerial = funcs =>
  funcs.reduce((promise, func) =>
    promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([]))

function leaveServers(servers) {
    return promiseSerial(servers.map(v => () => v.leave().then(s => console.log("Left " + s.name))));
}

client.on('ready', () => {
    let channelList = subbedChannels.map(v => v.channel);
    let servers = client.guilds.filter(guild => guild.channels.filter(ch => channelList.includes(ch.id)).size <= 0);
    fs.writeFileSync('./servers.txt', servers.map(v => v.name).join("\n"));
    leaveServers(servers).then(r => {
        client.destroy();
    });
});

client.login(NTg2OTExMTk3OTc5MzQ0OTAz.XQvbJQ.jm-VG6jRHMGspe6g1vzgWSP1RRc);
