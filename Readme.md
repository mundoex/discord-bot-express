# Discord Bot Express
Discord Bot Framework for command management inspired by [Express](https://www.npmjs.com/package/express) written in [Typescript](https://www.npmjs.com/package/typescript)

# Quick Start
```bash
$ npm install discord.js
$ npm install discord-bot-express
```

## Setting up the commands
```js
var CommandManager=require("discord-bot-express").CommandManager;
const {NotABot}=require("discord-bot-express").BotMiddleware;

CommandManager.setPrefix("Bot "); //Bot prefix not required
CommandManager.use(NotABot); //Middleware that prevents bot from calling itself

CommandManager.command("pick :option1 or :option2", function(msg, client, params){
    var options=[params.option1, params.option2];
    var rng=(Math.floor(Math.random() * 2) + 1) -1;
    msg.channel.send(options[rng]);
});

```

## Setting up the bot
```js
const CommandManager=require("./CommandManager"); //The CommandManager defined in the Setting up commands section
const secret = require("./secret.json"); //Json file with token given by discord
const discord = require("discord.js");
const client = new discord.Client();

client.login(secret.token);

client.on("ready",()=>console.log("Online"));

client.on("message",msg=>CommandManager.handleMessage(msg, client));
```
## Examples

  To view the examples, check [here](https://www.google.com) 

## Features

  * Command parsing abstraction
  * Simple command creation and organization
  * Simple trigger word creation and organization
  * Middleware pattern for modular command pipeline

## Usage

## Contributing
* Have [Git](https://git-scm.com/) Installed
* Have [Node.js](https://nodejs.org/en/) Installed

```bash
$ git clone https://github.com/mundoex/discord-bot-express
$ npm install
```
Make a pull request with your changes <br>
Contributions are welcome :)

## License
[MIT](LICENSE)