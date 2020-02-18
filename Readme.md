# Discord Bot Express
Discord Bot Framework for command management inspired by [Express](https://www.npmjs.com/package/express) written in [Typescript](https://www.npmjs.com/package/typescript)

# Quick Start
```bash
$ npm install discord.js
$ npm install discord-bot-express
```

## Setting up the commands
Check [here](https://github.com/mundoex/ExampleBot) for better example
```js
var CommandManager=require("discord-bot-express").CommandManager;
const {NotABot}=require("discord-bot-express").BotMiddleware;

CommandManager.setPrefix("Bot "); //Bot prefix not required
CommandManager.use(NotABot); //Middleware that prevents bot from calling itself

// :<name> defines a parameter for the command with the given name

// :<name>? defines a optional parameter for the command with the given name

//With annonymous function
CommandManager.command("pick :option1 or :option2", function(msg, client, params){
    var options=[params.option1, params.option2];
    var rng=(Math.floor(Math.random() * 2) + 1) -1;
    msg.channel.send(options[rng]);
});

//with declared function
function sayHello(msg,client,params){
  msg.channel.send("Hello");
}
CommandManager.command("say hello", sayHello)
.setDescription("Says Hello");

//Example of middleware that prevents non shinobi users to use command
CommandManager.command("slap :user",Permissions.isShinobi, slap)
.setDescription("Slaps user");

//Example of a trigger word for the bot
CommandManager.trigger(StartsWith("Ok"),triggers.okBoomer);

//Export the CommandManager you defined
module.exports=CommandManager;

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
### Making your own middleware functions
```js
//Creating your own middleware function
function(msg,client,params,next){
  var condition;//Your condition for the middleware to pass
  if(condition){
    next();
  }
}
```


## Examples

  To view a working example of a bot with this framework, check [here](https://github.com/mundoex/ExampleBot) 

## Features

  * Command parsing abstraction
  * Simple command creation and organization
  * Simple trigger word creation and organization
  * Middleware pattern for modular command pipeline
  * Create your own middlewares and plug them in
  * Based on Express

## Available Functions
```js
CommandManager.setTriggerRate // Sets the rate with trigger words trigger
CommandManager.setPrefix //Sets the Bot prefix
CommandManager.use //Adds middleware that is going to be called before checking for commands or triggers
CommandManager.handleMessage //Takes in the msg and client from discord and runs the command or trigger if its called correctly
CommandManager.command //adds the command text and function that is going to be called
CommandManager.trigger //adds the trigger function and function that is going to be called
//Predefined functions to use as a trigger function you can you your own
TriggerBuilder.StarsWith
TriggerBuilder.EndsWith
TriggerBuilder.Includes
TriggerBuilder.Regex
TriggerBuilder.Matches
```

## Contributing
* Have [Git](https://git-scm.com/) Installed
* Have [Node.js](https://nodejs.org/en/) Installed

```bash
$ git clone https://github.com/mundoex/discord-bot-express
$ npm install
```
Make a pull request with your changes <br>
Contributions, features request or any other kind of help are very welcome :)

## License
[MIT](LICENSE)