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
        };
/** end other global variables **/

// setup client
client_token = sensitive.client_token;
const client = new Discord.Client();

// global flags
var isReady = true;


/*** map audio commands to mp3 files to be used ***/
  var audio_map = {
    '!africa' : './media/audio/africa.mp3',
    '!choppa' : './media/audio/choppa.mp3',
    '!fart' : './media/audio/fart.mp3',
    '!ghettocb' : './media/audio/ghettocb.mp3',
    '!horn' : './media/audio/airhorn.mp3',
    '!kanga' : './media/audio/kanga.mp3',
    '!mysterioushonk' : './media/audio/mysterioushonk.mp3',
    '!mysterioushorn' : './media/audio/mysterioushonk.mp3',
    '!suh' : './media/audio/suh.mp3',
    '!wahwah' : './media/audio/wahwah.mp3',
    '!winner' : './media/audio/best.mp3',
    '!psycho' : './media/audio/psycho-lollipop.mp3',
    '!lollipop' : './media/audio/psycho-lollipop.mp3',
    '!cosby' : './media/audio/cozby.mp3',
    '!cozby' : './media/audio/cozby.mp3',
    '!flamingo' : './media/audio/flamingo-shrimp.mp3',
    '!shrimp' : './media/audio/flamingo-shrimp.mp3',
  }
/*** end audio command mapping ***/

/*** map text commands to replies ***/
  var text_map = {
    '!y' : 'but y tho',
    '!makeitgay' : 'no u.',
    '!miles' : 'AHHHH HOYYYYY HOYYY HOYYYYYYYY',
    '!goteem' : 'http://zoo-monkey.tumblr.com/post/116786838516',
    '!about' : 'What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Discord Bot Universal Academy, and I’ve been involved in numerous shit posting raids on Al-Quaeda servers, and I have over 300 confirmed uninstalls. I am trained in gorilla warfare and I’m the top stream sniper in the entire US armed forces. You are nothing to me but just another pathetic user. I will meme you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with trying to find shit out about me over the Internet? Think again, fucker. As we speak I am contacting my secret network of Discord shit-posting bots across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your Discord channel. You’re fucking dead, kid. I can be anywhere, anytime, and I can meme you in over seven hundred ways, and that’s just with my bare threads. Not only am I extensively trained in unarmed !rolling, but I have access to the entire arsenal of the Paper Planes Gaming Room and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” !about command was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.',
  }
/*** end text command mapping ***/

/*** commands not fitting audio/text direct mappings ***/
  var other_commands = [
    '!team',
    '!stop',
    '!newbot',
    '!yt',
    '!roll',
    '!cease',
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
    var voiceChannel = channel;
    if(voiceChannel){
      if(link){
        voiceChannel.join()
          .then(connection =>{
            var dispatcher = connection.playStream(
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
    Def: construct teams
    Args:
      voice_channel (discord.js-voiceChannel)
      text_channel (discoord.js-Channel)

      ################## NOT IMPLEMENTED YET ##################
      num_teams (integer)
      team_names (array)
      max_size (integer)
      game_name (string) - ???
    Notes:
      1. defaultnames are `Bollocks` and `Box`
  */
  function teams(voice_channel,text_channel){
    var roster = {},
        team_names = [
          'Bollocks',
          'Box'
        ],
        num_teams = 2,
        team = 0,
        counter = 0,
        team_map = {}, // integer to team name
        max_size = 1,
        counter_overflow = 0,
        ret = 0,
        overflow_map = {},
        a = 1; // for versioning purposes (not the variable; the throw-away line!)

    // verify &| refuse voiceChannel -- TODO

    // setup num_teams
    num_teams = team_names.length;

    // get all members in author's active voice channel
    var members = voice_channel.members.array();

    console.log('setup complete,\n\t`members` available.');
    // debugger;
    console.log('starting // map integers to team names && team names to roster');
    // map integers to team names && team names to roster
    for(var t_n_1 in team_names){
      var t_n_2 = team_names[t_n_1];

      team_map[counter] = t_n_2;
      roster[t_n_2] = [];
      overflow_map[t_n_2] = false;
      counter += 1;
      // debugger;
    }
    counter = 0;

    // setup max team size = || =- 1
    max_size = (members.length != 1) ? Math.floor(members.length / 2) : 1;

    console.log('team_map & roster setup complete,\n\t`max_size` available.');
    // debugger;

    // evenly divide players, deciding team_1 >= team_i >= team_n
    for(mumbar in members){
      var placed = false,
          team = 0,
          b = 1,
          member = members[mumbar];

      console.log('\nplacing : '+member.user.username);

      while( !placed){
        var team = (Math.floor(Math.random() * num_teams) + (num_teams - 2)).toString();
            team_size = roster[team_map[team]].length;

        // debugger ;

        if(team_size < max_size){
          roster[team_map[team].toString()].push(member.user.username);
          placed = true;
          // debugger;
        }else{
          overflow_map[team_map[team]] = true;

          // check for overflow status, and react accordingly
          var trip_overflow = true;
          for(var over_i in overflow_map){
            trip_overflow = trip_overflow && overflow_map[over_i];
            // debugger;
          }
          if(trip_overflow){
            max_size += 1;
          }
          // debugger;
        }
        // debugger;
      }
    }

    function team_message_builder(roster){
      var divider = ",',',',',',',',',',',',',',',',',',',',',',',',',',',',',',',',',',',',',',',',',',','",
          spacer = '',
          rett = '',
          keys = Object.keys(roster),
          c = 1;

      rett += divider;
      for(var d_k in keys){
        var t_n_3 = keys[d_k],
            mini_ret = '```\n',
            mini_roster = roster[t_n_3],
            d = 1;
        // debugger;

        // setup spacer by length of team name
        for(var j=0, n=t_n_3.length; j<n; j++){
          spacer += '~';
        } spacer += '  ';

        // separate from last group
        // rett += divider + '\n';
        rett += '\n';

        // build team-specific roster lines
        mini_ret += t_n_3 + '\n';
        for(var u_i in mini_roster){
          var u_n = mini_roster[u_i];
          mini_ret += (spacer + u_n + '\n');
          // debugger;
        }

        // finish team-grouping styling
        if(mini_ret){
          mini_ret += '```\n';
        } else {
          mini_ret = '';
        }
        // debugger;

        rett += mini_ret;
        spacer = '';
      } rett += divider;
      // debugger;
      return rett;
    }

    // build message
    ret = team_message_builder(roster);
    // console.log(ret);
    text_channel.send(ret);
    return ret;
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
          case '!africa':
          case '!choppa':
          case '!fart':
          case '!ghettocb':
          case '!horn':
          case '!kanga':
          case '!mysterioushonk':
          case '!mysterioushorn':
          case '!suh':
          case '!wahwah':
          case '!winner':
          case '!psycho':
          case '!lollipop':
          case '!cosby':
          case '!cozby':
          case '!flamingo':
          case '!shrimp':
            isReady = false;
            var voiceChannel = message.member.voiceChannel;
            if(voiceChannel){
              voiceChannel.join().then(connection =>{
                const dispatcher = connection.playFile(audio_map[cmd]);
                dispatcher.on("end", end => {
                  voiceChannel.leave();
                });
              }).catch(err => console.log(err));
            } else {
              message.reply('You need to join a voice channel first!');
            }
            break;
          /* text commands */
          case '!about':
          case '!goteem':
          case '!help':
          case '!makeitgay':
          case '!miles':
          case '!y':
            text_channel.send(text_map[cmd]);
            break;
          /* non-direct commands */
          case '!team':
            teams(voice_channel, text_channel);
            // var team = Math.floor(Math.random() * 2) + 1;
            // text_channel.send(username + ', you will be on team ' + team + '.');
            break;
          /* direct commands */
          case '!roll':
            var maybe_roll_max = parseInt(args.pop());
            var roll_max = isNaN(maybe_roll_max) ? 100 : maybe_roll_max;
            roll(message, roll_max);
            break;
          case '!newbot':
            new_bot(attachments);
            break;
          case '!yt':
            var link = args.shift();
            yt(voice_channel, link, username, message);
            break;
          /* fall-through */
          case '/join':
          case '!stop':
            message.reply('Okay :(');
            break;
          case '!cease':
            cease();
            break; // not needed, but muh patternz
          case 'hello':
            if(args[0].trim() == 'wubdroid')
              message.reply('Why hello, humanoid.');
            break;
          default:
            if (cmd.slice(0,1) === '!'){
              text_channel.send(username + ': sorry, I do not recognize that command, though I am willing to learn. Get involved at https://github.com/timm3/ASSDIC');
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
        if (message.member.voiceChannel) {
          const connection = await message.member.voiceChannel.join();
        } else {
          message.reply('You need to join a voice channel first!');
        }
      } else if (special_msg === '!stop') {
        if (message.member.voiceChannel) {
          const connection = await message.member.voiceChannel.leave();
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
