/*** imports / requires ***/
const Discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const ytdl = require('ytdl-core');
const sensitive = require('./sensitive.js');
/*** end imports / requires ***/

/** other global variables **/
const streamOptions = {
        seek: 0,
        volume: 1,
        passes: 3,
        };
/** end other global variables **/

// setup client
client_token = sensitive.client_token;
const client = new Discord.Client();

// global flags
var isReady = true;

/*** map audio commands to mp3 files to be used ***/
  var audio_map = {
    '!horn' : './media/audio/airhorn.mp3',
  }
/*** end audio command mapping ***/

/*** map text commands to replies ***/
  var text_map = {
    '!hello' : 'I am alive!',
  }
/*** end text command mapping ***/

/*** commands not fitting audio/text direct mappings ***/
  var other_commands = [
    '!stop',
    '!yt',
    '!roll',
  ]
/*** end non-direct-response mapping ***/

/*** setup help command ***/
  var commands = [];
  commands = commands.concat(Object.keys(audio_map));
  commands = commands.concat(Object.keys(text_map));
  commands = commands.concat(other_commands);

  var help_prefix = 'Available commands: ';
  var help_cmd = help_prefix + commands.join(' ');
  text_map['!help'] = help_cmd;
/*** end help command building ***/

/*** command functions ***/

  /*
    Def: upload and run new bot file
    Args:
      bot_att (Discord.js-MessageAttachment) - new bot object
  */
  function new_bot(bot_att){
    var ret = 'def new_bot ret';

    if(bot_att){
      // debugging
      console.log((typeof bot_att).toString()); // object // how useless
      var f_prefix = './';
      // write new bot file
      try{
        var f_name = bot_att.filename;
        // var f_url = bot_att.url;
        var f_url = bot_att.proxyURL;
        var f_path = f_prefix + f_name;

        try{
          var f_writer = fs.createWriteStream(f_path);
        } catch(err) {
          console.log('error opening filestream to write to');
          console.log(err);
        }
        try{
          var request = http.get(f_url, function(response) {
            try{
              response.pipe(f_writer);
            } catch(err) {
              console.log('error writing stream');
              console.log(err);
            }
          });
        } catch(err) {
          console.log('error downloading file from discord');
          console.log(err);
        }
      } catch (err) {
        console.log('error writing file!');
        console.log(err);
      }
      ret = 'file dl attempted?'
    } else {
      var ret = 'no file found';
    }
    console.log(ret);
    return ret;
  }

  /*
    Def: play audio from youtube link
    Arg:
      channel (Discord.js-Channel) - channel to play audio in
      link (string) - youtube link to play audio from
      username (string) - username of requestee
      message (Discord.js-Message) - original message
  */
  function yt(channel, link, username, message){
    var voiceChannel = message.member.voice.channel;
    if(voiceChannel){
      if(link){
        voiceChannel.join()
          .then(connection =>{
            var dispatcher = connection.play(
                                          ytdl(
                                            link,
                                            { filter: 'audioonly' }
                                            ),
                                          streamOptions
                                          );
            dispatcher.on("end", end => {
              voiceChannel.leave();
            });
        }).catch(err => console.log(err));
      } else {
        message.reply('You need to provide a link, boy-o!');
      }
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }

  /*
    Def: roll 0/1 to {limit} somewhat randomly
    Args:
      message (Discord.js-Message) - message to reply to
      limit (int) - max roll value
  */
  function roll(message, limit) {
    var pseudo_random_value = Math.floor((Math.random() * Math.floor(limit)));
    message.reply(pseudo_random_value);
  }

  /*
    Def: kill process
    Args:
    Notes:
  */
  function cease(){
    console.log('!cease performed');
    process.exit();
  }

  /*
    Def: move @mention between (random) voice channels X times, finally placing in voiceChannel of caller
    Args:
      message (Discord.js-Message) - message to work with
      limit (int) - number of times to move @mention
    Notes:
      1. if control over no voice channels, reply with sad statement
      2. only try to move @mentions in/out channels where bot has required permission
  */
  function context_wrecker(message, limit) {
    var mentions = message.mentions
        members = mentions.users,
        guild = message.guild,
        channels = guild.channels,
        real_limit = limit - 1,
        voice_channels = [],
        period = 1;

    // build voice channels
    for(var channel_index in channels){
      var channel = channels[channel];
      if(channel.type === 'voice'){
        voice_channels.push(channel);
      }
    }

    // for each @mention, move them around X times
    for(var mem_index in members){
      var member = members[mem_index];
    }
  }

/*** end command functions ***/

/*** ready status announcement ***/
  client.on('ready', () => {
    console.log('Ready!\n');
  });
/*** end ready status announcement ***/

/**** listeners ****/
  /*** direct response listener ***/
    client.on('message', message => {
      // ignore self-posts
      if (message.author.bot){return;}

      // useful attributes
      var username = message.author.username;
      var text_channel = message.channel;
      var voice_channel = message.member.voiceChannel;
      var full_message = message.content;
      var cmd = '';
      var args = [];
      var attachments = message.attachments; // type = Discord.js[Collection]

      console.log(attachments);
      // var props = Object.keys(attachments);
      // console.log('trying to print props');
      // try {
      //   for(var prop in props){
      //     console.log(prop);
      //   }
      // } catch(err) {
      //   console.log(err);
      // }
      console.log('now processing command');

      // get arguments & set cmd // cleaned up message.content
      var pre_args = full_message.trim().split(/ +/g);
      try {
        cmd = pre_args[0].trim().toLowerCase();
      } catch(err) {
        console.log(err);
      }
      try{
        args = pre_args.slice(1,pre_args.length);
      } catch(err) {
        console.log(err);
      } finally{
        console.log('args: ' + args.toString());
      }


      if(isReady){
        isReady = false;

        switch(cmd){
          /* voice commands */
          case '!horn':
            isReady = false;
            var voiceChannel = message.member.voice.channel;
            if(voiceChannel){
              voiceChannel.join().then(connection =>{
                const dispatcher = connection.play(audio_map[cmd]);
                dispatcher.on("end", end => {
                  message.member.voice.channel.leave();
                });
              }).catch(err => console.log(err));
            } else {
              message.reply('You need to join a voice channel first!');
            }
            break;
          /* text commands */
          case '!hello':
            text_channel.send(text_map[cmd]);
            break;
          /* direct commands */
          case '!roll':
            var maybe_roll_max = parseInt(args.pop());
            var roll_max = isNaN(maybe_roll_max) ? 100 : maybe_roll_max;
            roll(message, roll_max);
            break;
          case '!yt':
            var link = args.shift();
            yt(voice_channel, link, username, message);
            break;
          /* fall-through */
          case '/join':
          case '!stop':
            message.reply('Stopping boss!');
            break;
          default:
            if (cmd.slice(0,1) === '!'){
              text_channel.send('Sorry what was that command?');
              text_channel.send('https://i.kym-cdn.com/entries/icons/original/000/018/489/nick-young-confused-face-300x256-nqlyaa.jpg');
            }
            break;
        }
        isReady = true;
      }
    });
  /*** end direct response listener ***/

  /*** special commands ***/
    client.on('message', async message => {
      var special_msg = message.content.toLowerCase();
      // Voice only works in guilds, if the message does not come from a guild,
      // we ignore it
      if (!message.guild) return;

      if (special_msg === '/join') {
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
          const connection = await message.member.voice.channel.join();
        } else {
          message.reply('You need to join a voice channel first!');
        }
      } else if (special_msg === '!stop') {
        if (message.member.voice.channel) {
          const connection = await message.member.voice.channel.leave();
        } else {
          message.reply('You need to join a voice channel first, noob!');
        }
      }
    });
  /*** end special commands ***/
/**** end listeners ****/

/*** non-sense ***/
  /** client login w/ credentials **/
  client.login(client_token);
  /** end client login w/ credentials **/
/*** end non-sense ***/
