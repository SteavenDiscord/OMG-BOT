const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

const prefix = "/";

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "hello") {
    message.channel.send("Hello, World!");
  }
if (command === 'userinfo') {
  if (message.mentions.users.first()) {
    const taggedUser = message.mentions.users.first();
    const avatarURL = taggedUser.displayAvatarURL();
    const createdAt = new Date(taggedUser.createdAt);

    message.reply(`Username: ${taggedUser.username}\nID: ${taggedUser.id}\nAvatar: ${avatarURL}\nAccount created on: ${createdAt}`);
  } else {
    const avatarURL = message.author.displayAvatarURL();
    const createdAt = new Date(message.author.createdAt);

    message.reply(`Your username: ${message.author.username}\nYour ID: ${message.author.id}\nYour avatar: ${avatarURL}\nAccount created on: ${createdAt}`);
  }
}
if (command === 'ping') {
  const startTime = Date.now();
  message.channel.send('Pinging...')
    .then((msg) => {
      const endTime = Date.now();
      msg.edit(`Pong! Latency is ${endTime - startTime}ms`);
    })
    .catch(console.error);
}
if (command === 'clear') {
  const deleteCount = parseInt(args[0], 10) + 1;

  if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
    return message.reply('Please enter a number between 1 and 99 for the number of messages to delete');
  }

  message.channel.bulkDelete(deleteCount, true)
    .then(deleted => console.log(`Deleted ${deleted.size} messages.`))
    .catch(err => message.reply(`Something went wrong: ${err}`));
}
  if (command === 'giverole') {
     // Check if the user has permission to use the command
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      message.reply('You do not have permission to use this command.');
      return;
    }

    // Check if a user and role were mentioned
    const user = message.mentions.members.first();
    const role = message.mentions.roles.first();
    if (!user || !role) {
      message.reply('Please mention a user and a role.');
      return;
    }

    // Give the role to the user
    user.roles.add(role)
      .then(() => {
        // Send a success message
        message.channel.send(`Successfully gave the ${role.name} role to ${user.displayName}.`);
      })
      .catch(error => {
        // Handle any errors that occur
        console.error('Error while giving role:', error);
        message.channel.send('An error occurred while giving the role.');
      });
  }
  if (command === 'removerole') {
    // Check if the user has permission to use the command
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      message.reply('You do not have permission to use this command.');
      return;
    }

    // Check if a user and role were mentioned
    const user = message.mentions.members.first();
    const role = message.mentions.roles.first();
    if (!user || !role) {
      message.reply('Please mention a user and a role.');
      return;
    }

    // Remove the role from the user
    user.roles.remove(role)
      .then(() => {
        // Send a success message
        message.channel.send(`Successfully removed the ${role.name} role from ${user.displayName}.`);
      })
      .catch(error => {
        // Handle any errors that occur
        console.error('Error while removing role:', error);
        message.channel.send('An error occurred while removing the role.');
      });
  }
if (command === "meme") {
    const axios = require('axios');
    const Discord = require('discord.js');
    const embed = new Discord.MessageEmbed();
    
    axios.get('https://www.reddit.com/r/memes/random/.json')
        .then(response => {
            const [post] = response.data[0].data.children;

            const permalink = post.data.permalink;
            const memeUrl = `https://reddit.com${permalink}`;
            const memeImage = post.data.url;
            const memeTitle = post.data.title;
            const memeUpvotes = post.data.ups;
            const memeNumComments = post.data.num_comments;

            embed.setTitle(`${memeTitle}`);
            embed.setURL(`${memeUrl}`);
            embed.setColor('RANDOM');
            embed.setImage(memeImage);
            embed.setFooter({
                text:`👍 ${memeUpvotes} 💬 ${memeNumComments}`
            });

            message.channel.send({ embeds: [embed] });
        })
        .catch(console.error);
}
  if (command === "help") {
    // Create an embed with the list of commands
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Bot Commands')
      .setDescription('Here are the available commands for this bot:')
      .addFields(
        { name: '/help', value: 'Displays this list of commands' },
        { name: '/ping', value: 'Pings the bot to check if it is working' },
        { name: '/meme', value: 'Displays a random meme from r/memes' },
        // Add more command fields here if needed
      );

    // Reply to the message with the embed
    message.channel.send({ embeds: [embed] });
  }
if (command === "adminhelp") {
  if (message.member.permissions.has('ADMINISTRATOR')) { // check if the user is an administrator
    // Create an embed with the list of commands
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Bot Admin Commands')
      .setDescription('Here are the available admin commands for this bot:')
      .addFields(
        { name: '/adminhelp', value: 'Displays this list of commands' },
        { name: '/giverole', value: 'Gives a role to a User' },
        { name: '/removerole', value: 'Removes a Role from User' },
		{ name: '/clear', value: 'To clear the chat from 1 - 99 messages' },
        // Add more command fields here if needed
      );

    // Reply to the message with the embed
    message.channel.send({ embeds: [embed] });
  } else { // show an error message if the user is not an administrator
    message.reply("Sorry, only administrators can use this command.");
  }
}
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return; // Exit the loop if the message was sent by a bot
  if (message.content.toLowerCase().includes("what happened to arab craft minecraft server")) {
    message.reply("We had to close it sadly for hardware reasons.");
    return; // Exit the loop to prevent additional replies
  }
  if (message.content.toLowerCase().includes("hi halal")) {
    message.reply("SO HALAL MODE.");
    return;
  }
  if (message.content.toLowerCase().includes("hi bitch")) {
    message.reply("SO HARAM MODE.");
    return;
  }
  if (message.content.toLowerCase().includes("hi")) {
    message.reply("Hi, Frineda!");
    return;
  }
  if (message.content.toLowerCase().includes("hello")) {
    message.reply("Hello, Frineda!");
    return;
  }
  if (message.content.toLowerCase().includes("hey")) {
    message.reply("Hey, Frineda!");
    return;
  }
  if (message.content.toLowerCase().includes("harm")) {
    message.reply("Harm on you, Frineda!");
    return;
  }
  if (message.content.toLowerCase().includes("nah")) {
    message.reply("Okay, as you see.");
    return;
  }
  if (message.content.toLowerCase().includes("$help")) {
    message.reply("This command moved to `/help` while Discord doesn't register commands. It's working.");
    return;
  }
  if (message.content.toLowerCase().includes("hey it works")) {
    message.reply("What works, Frineda?");
    return;
  }
  if (message.content.toLowerCase().includes("it works now")) {
    message.reply("What works, Frineda?");
    return;
  }
});

const welcomeChannelId = "1092532367551385711"

client.on('guildMemberAdd', member => {
  // Get the channel by ID
  const channel = member.guild.channels.cache.get(welcomeChannelId);
  
  if (channel) {
    // Send a welcome message to the channel
    channel.send(`${member} Welcome to the server!`);
  }
});
client.on("guildMemberRemove", (member) => {
  const channel = client.channels.cache.get('1094958643163713556'); // Replace 'INSERT_CHANNEL_ID_HERE' with the actual channel ID
  channel.send(`${member.user.tag} left the server.`); // Customized message to be sent in the channel
});

client.on('message', message => {
  if (message.author.bot) return; // ignore messages from other bots
  if (!message.guild) return; // ignore DMs
  if ((message.content.includes('http') || message.content.includes('https') || message.content.includes('www.')) && !message.member.hasPermission('ADMINISTRATOR')) { // check if the message contains a link and the user is not an administrator
    message.delete(); // delete the message
    message.reply('Sorry, you are not allowed to post links in this server! Your message has been deleted.') // send a warning message to the person
      .then(msg => {
        setTimeout(() => {
          msg.delete(); // delete the warning message after 15 seconds
        }, 15000); // set the delay to 15 seconds (15000 milliseconds)
      })
      .catch(console.error);
  }
});

const swearWords = ['fuck', 'shit', 'wtf', 'fu`ck`']; //create an array of swear words

client.on('message', message => {
  if (swearWords.some(word => message.content.toLowerCase().includes(word))) { //check if message content includes any swear words
    message.delete(); //delete the message
    message.reply('Sorry, you are not allowed to swear in this server! Your message has been deleted.')
      .then(msg => {
        setTimeout(() => {
          msg.delete(); //delete the warning message after 15 seconds
        }, 15000); //set the delay to 15 seconds (15000 milliseconds)
      })
      .catch(console.error);
  }
});


client.on('guildMemberAdd', (member) => {
  const guild = member.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`Welcome to the server, ${member}!`);
  }
});

client.on('guildMemberRemove', (member) => {
  const guild = member.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`${member} has left the server.`);
  }
});

client.on('messageDelete', (message) => {
  const guild = message.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`A message by ${message.author.tag} was deleted in ${message.channel}: "${message.content}"`);
  }
});
// Channel update listener
client.on('channelUpdate', (oldChannel, newChannel) => {
  const guild = oldChannel.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`Channel ${oldChannel.name} has been updated to ${newChannel.name}`);
  }
});

// Channel create listener
client.on('channelCreate', (channel) => {
  const guild = channel.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`New channel created: ${channel.name}`);
  }
});

// Channel delete listener
client.on('channelDelete', (channel) => {
  const guild = channel.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`Channel deleted: ${channel.name}`);
  }
});


// User update listener
client.on('guildMemberUpdate', (oldMember, newMember) => {
  const guild = oldMember.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`User ${oldMember} has been updated to ${newMember}`);
  }
});

// Edited messages listener
client.on('messageUpdate', (oldMessage, newMessage) => {
  const guild = oldMessage.guild;
  const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
  if (modLogChannel) {
    modLogChannel.send(`A message by ${oldMessage.author.tag} was edited in ${oldMessage.channel}: "${oldMessage.content}" was changed to "${newMessage.content}"`);
  }
});
// Role add listener
client.on('guildMemberUpdate', (oldMember, newMember) => {
  // Check if roles were added to the member
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
  if (addedRoles.size > 0) {
    const guild = oldMember.guild;
    const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
    if (modLogChannel) {
      modLogChannel.send(`User ${newMember.displayName} has been given the role(s): ${addedRoles.map(role => role.name).join(', ')}`);
    }
  }
  
  // Check if roles were removed from the member
  const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
  if (removedRoles.size > 0) {
    const guild = oldMember.guild;
    const modLogChannel = guild.channels.cache.find(channel => channel.name === 'modlogs');
    if (modLogChannel) {
      modLogChannel.send(`User ${newMember.displayName} has had the role(s): ${removedRoles.map(role => role.name).join(', ')} removed`);
    }
  }
});

client.login(process.env.TOKEN)