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
