# ASSDIC - Automated Self-Service Discord.js Interface Commander

The name says it all.

---

### How To Contribute

#### With Code / Documentation

Quick Quide:
* Pull Requests must address an open issue
* PR branches must be named after **the** issue being addresses
* Commit messages must start with the issue identifier

Create a branch for your contribution.
Commits to `master`, though you may see them in ASSDIC's shameful past, are not allowed.
There wasn't a readme back then like there is now, though there were at least _some_ conventions ;)

##### Branch Naming Conventions:
- Primary branches are named `#{task-id}`
- Sub-branches are named `{github-userhandle}/#{task-id}/{purpose}`

Example Scenario:
* issue: `15`
* branch: `#15`
* contributor one's sub-branch: `timm3/#15`
* contributor two's sub-branch `yeetmasterflex/#15`
* contributor two's sub-branch with formatting fixes `yeetmasterflex/#15/formatting`


##### Commit Messages

Format: `#{task-id}: {primary-purpose} - {subtitle} - {description}`

Example: `#15: CMD - !humans - (audio) we killed them all`

You can see that the commit is for issue #15, where a command (CMD) that is _audio_ in nature will trigger off _!humans_ to play a snippet of a certain nature. 

If many and/or long words are necessary, leave out the subtitle.


##### Using Github Issues/Projects
Listed here are the stages and statuses of an issue in the `TODO` project.
* `inert` - a proposed issue, be it a bugfix, enhancement, or feature
* `initialized` - issue has been greenlighted for development
* `pro-o'cedin'` - issue is being worked on
* `debriefing` - submitted work for an issue is being reviewed
* `assimilated` - the work has been accepted and merged
* `crushed` - issue proposal has been denied and closed


#### With Documentation

Write them in markdown. See the resources below.

If it's related to installation, open a PR against this readme.
If there's a handy-dandy script to accompany it, that goes in the `/installation-scripts/` directory.
Installation scripts should be `skewer-case` and indicate target system and primary purpose.

e.g. `ubuntu-20.04-core-dependencies.sh`


---
### Resources

Github Markdown: https://guides.github.com/features/mastering-markdown/

## Installation of ASSDIC
### Download and install Ubuntu
Installation has been tested and confirmed from a clean install of Ubuntu Server 20.04. To get started with Ubuntu please visit the Cannonical Foundation website and procure the image from them at [this link](https://ubuntu.com/download/server). Of course other flavors of Linux will work but for simplicity this guide is written with Ubuntu and Debian like operating systems in mind. If you are using Arch or something you don't need this guide.

After Ubuntu Server 20.04 has been installed we can proceed with the guide.

### Update Packages
Run the following commands to update your repositories and packages.
```
sudo apt-get update
sudo apt-get upgrade -y
```
### Install Node.js v15.x and packages
ASSDIC runs on Node.js and as such it must be installed for ASSDIC to function.

**Note; curling to bash is a horrible idea but is done here for simplicity. Make 100% sure you are comfortable about the code being run**
```
curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
```
```
sudo apt-get install -y nodejs
```
>
Install discord.js, a well-known Node.js based Discord interface. More information can be found at [this link]([discord.js](https://discord.js.org/#/))
```
sudo npm install discord.js @discordjs/opus
```
Install ytdl in order to read media from YouTube through ASSDIC. Information about ytdl can be found at [this link].(https://github.com/ytdl-org/youtube-dl)
```
sudo npm install ytdl
sudo npm install ytdl-core
```
 Install ffmpeg, used for media transcribing. Information about ffmpeg can be found at [this link](http://www.ffmpeg.org/).
```
sudo npm i ffmpeg-static
```
 At this point you will need to update the ***sensitive.js*** file with your discord API token. A guide for generating an API token can be found [here](https://www.writebots.com/discord-bot-token/).

### Running the Bot
Your ASSDIC installation is now configured and ready to launch. Attempt to launch the bot using
```
node disbot.js
```