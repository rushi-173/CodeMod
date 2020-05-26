const { Client, MessageEmbed } = require('discord.js');
require('dotenv').config();
const { prefix, colors } = require('./json/config.json');
const { formatDate, serverCommand } = require('./helpers/index');
const { memberCommands, adminCommands } = require('./json/commands.json');
const { faqs } = require('./json/data.json');
const bot = new Client();

bot.once('ready', () => {
    console.log('The bot is now ready to receive commands');
    bot.user.setActivity('messages', { type: 'LISTENING' });
});

bot.on('message', (message) => {
    if (!message.content.startsWith(`${prefix}`) || message.author === bot.user) {
        return;
    }

    if (message.content.startsWith(`${prefix}`)) {
        processCommand(message);
    }
});

const processCommand = (message) => {
    let command = message.content.substr(1);
    let splitCommand = command.split(' ');
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);

    switch (primaryCommand) {
        /* //todo: ban, ama, links(to all social media platforms of Tanay)
           todo: rules, faq  */
        case 'resources':
            resourcesCommand(message);
            break;

        case 'help':
            helpCommand(message);
            break;

        case 'discordHelp':
            discordHelpCommand(message);
            break;

        case 'jobChallenge':
            jobChallengeCommand(message);
            break;

        case 'socialLinks':
            socialLinksCommand(message);
            break;

        case 'faq':
            faqCommand(message, arguments);
            break;

        case 'kick':
            kickCommand(message);
            break;

        case 'send':
            sendCommand(message, arguments);
            break;

        case 'serverInfo':
            serverInfo(message);
            break;

        case 'botInfo':
            botInfo(message);
            break;

        default:
            message.delete();
            message.author.send('Invalid command. Run `/help` to know all the valid commands');
            break;
    }
};

const resourcesCommand = (message) => {
    let embed = new MessageEmbed()
        .setTitle('Resources for developers')
        .setColor(colors.yellow)
        .addField(
            'INTERACTIVE CODING',
            '[FreeCodeCamp](https://www.freecodecamp.org)  |  [Codecademy](https://www.codecademy.com)  |  [Scrimba](https://www.scrimba.com)'
        )
        .addField('YOUTUBE', 'YouTube channels you can follow', false)
        .addField(
            'DESIGN PRINCIPLES',
            '[DesignCourse](https://www.youtube.com/user/DesignCourse)  |  [Jesse Showalter](https://www.youtube.com/user/JesseAtomic)',
            true
        )
        .addField(
            'WEB DEVELOPMENT',
            '[FreeCodeCamp](https://www.youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ)  |  [Traversy Media](https://www.youtube.com/user/TechGuyWeb)  |  [Dev Ed](https://www.youtube.com/channel/UClb90NQQcskPUGDIXsQEz5Q)',
            true
        )
        .addField(
            'STOCK IMAGES',
            '[Pexels](https://www.pexels.com)  |  [Unsplash](https://www.unsplash.com)  |  [Pixabay](https://pixabay.com/)',
            true
        )
        .addField(
            'RESOURCE LINK',
            'For dozens of cool resources check out [this link](https://github.com/bradtraversy/design-resources-for-developers) by Brad Travesy'
        );

    message
        .delete()
        .catch(() =>
            console.log('[Warning]: DM to the bot cannot be deleted with `message.delete()` ')
        );
    message.author.send(embed);
};

const helpCommand = (message) => {
    const dm = serverCommand(message);

    if (dm) {
        let memberEmbed = new MessageEmbed()
            .setTitle('Member commands')
            .setColor(colors.green)
            .setThumbnail(message.guild.iconURL())
            .addFields([...memberCommands]);

        let adminEmbed = new MessageEmbed()
            .setTitle('Admin commands')
            .setColor(colors.green)
            .setThumbnail(message.guild.iconURL())
            .addFields([...adminCommands]);

        message
            .delete()
            .catch(() =>
                console.log('[Warning]: DM to the bot cannot be deleted with `message.delete()` ')
            );
        if (message.member.hasPermission(['ADMINISTRATOR'])) {
            message.author.send(memberEmbed);
            message.author.send(adminEmbed);
        } else {
            message.author.send(memberEmbed);
        }
    }
};

const discordHelpCommand = (message) => {
    let discordHelpEmbed = new MessageEmbed()
        .setTitle('Get Started with Discord')
        .setColor(colors.green)
        .addField(
            'Get started',
            '[Discord YouTube link](https://www.google.com/search?client=firefox-b-d&q=discord+for+dummies#kpvalbx=_xFfJXt7hAcbf9QP6lJ6ICQ48)'
        );

    message
        .delete()
        .catch(() =>
            console.log('[Warning]: DM to the bot cannot be deleted with `message.delete()` ')
        );
    message.author.send(discordHelpEmbed);
};

const jobChallengeCommand = (message) => {
    let embed = new MessageEmbed()
        .setTitle('Details for TeamTanayJobChallenge')
        .setColor(colors.yellow)
        .addField(
            'JOB CHALLENGE WEBSITE',
            '[TEAMTANAYJOBCHALLENGE WEBSITE](https://2020.teamtanay.jobchallenge.dev)',
            false
        )
        .addField(
            'STUCK IN REGISTERATION PROCESS?',
            '[Watch this comprehensive playlist](https://www.youtube.com/watch?v=QzjgBj9oaAA&list=PLzvhQUIpvvug0h5H3W6e_TEGGBivEtnaJ)',
            false
        )
        .addField(
            'JOB CHALLENGE PARTICIPANTS',
            '[Participants list](https://2020.teamtanay.jobchallenge.dev/participants)',
            true
        )
        .addField(
            'JOB CHALLENGE FAQ',
            '[FAQ list](https://2020.teamtanay.jobchallenge.dev/faqs)',
            true
        )
        .addField(
            'JOB CHALLENGE BLOG',
            '[BLOG LINK](https://2020.teamtanay.jobchallenge.dev/blogs)',
            true
        )
        .addField(
            'JOB CHALLENGE DISCUSSION HANDLES',
            '[TELEGRAM](https://t.me/teamtanay)  |  [INSTAGRAM](https://www.instagram.com/tanaypratap)',
            true
        );

    message
        .delete()
        .catch(() =>
            console.log('[Warning]: DM to the bot cannot be deleted with `message.delete()` ')
        );
    message.author.send(embed);
};

const socialLinksCommand = (message) => {
    let embed = new MessageEmbed()
        .setTitle("Tanay's social handles")
        .setColor(colors.yellow)
        .setThumbnail(
            'https://instagram.fbom15-1.fna.fbcdn.net/v/t51.2885-19/s320x320/90181421_510156213222489_6690442420095549440_n.jpg?_nc_ht=instagram.fbom15-1.fna.fbcdn.net&_nc_ohc=QI8cRp3F8jEAX8v63zw&oh=3049ecd08c681c1cd52cff42ed0b4a26&oe=5EF5EA33'
        )
        .addField(
            'YouTube',
            '[Subscribe on YouTube](https://youtube.com/tanaypratap)  |  [Unpolished Streams](https://www.youtube.com/channel/UCPy1Y8K7-3iRgQTmifCgZtw/)',
            false
        )
        .addField('Instagram', '[Follow on Instagram](https://www.instagram.com/tanaypratap)', true)
        .addField('\u200b', '\u200b')
        .addField('TWITTER', '[Follow on Twitter](https://twitter.com/tanaypratap)', true)
        .addField(
            'LearnCodingFree',
            '[Learn coding for free](https://learncodingforfree.org)',
            true
        )
        .addField('TELEGRAM', '[Join #TEAMTANAY](https://t.me/teamtanay)', true)
        .addField(
            'LINKEDIN',
            '[Follow on LinkedIN](https://www.linkedin.com/in/tanaypratap/)',
            true
        )
        .addField('\u200b', '\u200b')
        .addField(
            'PODCASTS',
            '[TeaWithTanay](https://teawithtanay.com)  |  [ProductFM](https://bit.ly/product-fm)  |  [ThinkingWithTanay](https://bit.ly/thinkingwithtanay)',
            false
        )
        .addField(
            'INITIATIVES',
            '[JobChallenge](https://2020.jobchallenge.teamtanay.dev)  |  [Open Mentorship Program](https://bit.ly/mentorship-karona)  |  [Reddit Disscussion](https://www.reddit.com/r/teamtanay/ )'
        );

    message
        .delete()
        .catch(() =>
            console.log('[Warning]: DM to the bot cannot be deleted with `message.delete()` ')
        );
    message.author.send(embed);
};

// ! Broken command since the limit of Embed exceds {embed: 6000 chars, addField: 1024 chars, name: 256 chars, footer: 2048 chars, author: 256 chars }
const faqCommand = (message, arguments) => {
    // The array which stores the results as per the question passed
    let faqArray = [];
    // todo: Make a duplicate checker function that takes 2 FAQ's in this case and checks if the question or answer has similarityCount > 5
    // Todo: If yes then it is called for review
    // let similarityCount = 0;

    // This if condition does the checking and returns the FAQ's (if any)
    if (arguments.length > 0) {
        // Iterate through the FAQ data
        faqs.forEach((faq) => {
            // Iterates through the arguments array and checks if the element is present in the faq.name
            for (let i = 0; i < arguments.length; i++) {
                // If the element is present in the faq.name it goes in further
                if (faq.name.toLowerCase().includes(arguments[i])) {
                    // This condition checks if the faq object is already present in faqArray or not
                    if (!faqArray.includes(faq)) {
                        // If faq is not present in faqArray then it pushes the FAQ
                        faqArray.push(faq);
                    }
                }
            }
        });

        if (faqArray.length === 0)
            message.author.send(
                "No FAQ's matched your question. Try `/faq` and go through it once?"
            );
    }

    let faqEmbed;

    faqArray.forEach((faq) => {
        faqEmbed = new MessageEmbed()
            .setColor(colors.green)
            .setTitle('FAQ')
            .setThumbnail(
                'https://instagram.fbom15-1.fna.fbcdn.net/v/t51.2885-19/s320x320/90181421_510156213222489_6690442420095549440_n.jpg?_nc_ht=instagram.fbom15-1.fna.fbcdn.net&_nc_ohc=QI8cRp3F8jEAX8v63zw&oh=3049ecd08c681c1cd52cff42ed0b4a26&oe=5EF5EA33'
            )
            .addField(`${faq.name}`, `${faq.value}`);

        console.log(faq);
        message.author.send(faqEmbed);
    });

    message
        .delete()
        .catch(() =>
            console.log('[Warning]: DM to the bot cannot be deleted with `message.delete()` ')
        );
};

const kickCommand = async (message) => {
    try {
        const dm = serverCommand(message);

        let user = message.mentions.users.first();

        if (user && dm) {
            let admin = message.guild.member(message.author);
            let member = message.guild.member(user);
            if (member && admin.hasPermission('KICK_MEMBERS')) {
                if (member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
                    bot.user.username === member.user.username
                        ? message.reply(`You really think you can kick me? Traitor! `)
                        : message.reply(`You can\'t kick ${member} `);
                    message.delete();
                    return;
                }

                member
                    .kick('Violation of server rules and regulations')
                    .then(() => {
                        let rules = '`/rules`';

                        let kickEmbed = new MessageEmbed()
                            .setTitle(`${user.username} is kicked from ${message.guild.name}`)
                            .setColor(0xff0000)
                            .setThumbnail(message.author.displayAvatarURL)
                            .addField('Kicked User', `${member}`, true)
                            .addField('Kicked By', `<@${message.author.id}>`, true)
                            .addField('Spammed In', `${message.channel} channel`, true)
                            .addField(
                                'Reason',
                                'Violation of server rules and regulations. You can learn more about the rules by typing `/rules`',
                                true
                            );

                        // !It seems that message.guild.channels.find() is not a function anymore
                        // let kickChannel = message.guild.channels.find(`name`, 'kickreports');
                        // if (!kickChannel) return message.channel.send(kickEmbed);

                        // kickChannel.send(kickEmbed);
                        message.channel.send(kickEmbed);
                        message
                            .delete()
                            .catch(() =>
                                console.log(
                                    '[Warning]: DM to the bot cannot be deleted with `message.delete()` '
                                )
                            );
                    })
                    .catch((err) => {
                        message.author.send(`Unable to kick ${user}`);
                        console.log(err);
                    });
            } else {
                message.reply(`You don\'t have permissions to kick anyone`);
            }
        } else {
            message.channel.send(
                `Oooo, someone was going to be kicked out. But seems like ${message.author} didn\'t specify who`
            );
        }
    } catch (error) {
        throw error;
    }
};

const sendCommand = async (message, arguments) => {
    const dm = serverCommand(message);

    if (dm) {
        if (arguments.length < 2) {
            message.author.send(
                'Try the command like this `/send @mentionsomeone type your message`'
            );
        }
        let user = message.guild.member(message.mentions.users.first());
        if (!user) message.author.send(`There is no user as ${arguments[0]}`);

        message
            .delete()
            .catch(() =>
                console.log('[Warning]: DM to the bot cannot be deleted with `message.delete()` ')
            );
        mentionMessage = arguments.slice(1).join(' ');
        let sendEmbed = new MessageEmbed()
            .setTitle(`Private message`)
            .setColor(colors.green)
            .setThumbnail(message.author.displayAvatarURL())
            .addField('Sent By', message.author, true)
            .addField('Channel', message.channel, true)
            .addField('\u200b', '\u200b')
            .addField('Message', mentionMessage);

        message
            .delete()
            .catch(() =>
                console.log('[Warning]: DM to the bot cannot be deleted with `message.delete()` ')
            );
        user.send(sendEmbed);
    }
};

const serverInfo = (message) => {
    const dm = serverCommand(message);

    if (dm) {
        let serverEmbed = new MessageEmbed()
            .setTitle(`${message.guild.name}'s Info`)
            .setColor(colors.green)
            .setThumbnail(message.guild.iconURL())
            .addField('\u200b', '\u200b')
            .addField('Server Name:', message.guild.name, true)
            .addField('Server created at:', formatDate(message.guild.createdAt), true)
            .addField('You joined on: ', formatDate(message.member.joinedAt), true)
            .addField('Total members: ', message.guild.memberCount, true);

        message
            .delete()
            .catch(() =>
                console.log('[Warning]: DM to the bot cannot be deleted with `message.delete()` ')
            );
        message.author.send(serverEmbed);
    }
};

const botInfo = (message) => {
    const dm = serverCommand(message);

    if (dm) {
        let botInfoEmbed = new MessageEmbed()
            .setTitle(`${bot.user.username}'s Info`)
            .setColor(colors.green)
            .setThumbnail(bot.user.displayAvatarURL())
            .addField('Bot Name', bot.user.username, true)
            .addField('First time cried on', formatDate(bot.user.createdAt), true)
            .addField('\u200b', '\u200b')
            .addField('Server', message.guild.name, true)
            .addField('Joined server on', formatDate(message.guild.joinedAt), true)
            .addField('\u200b', '\u200b')
            .addField(
                'Wanna operate me?',
                '[Github](https://github.com/rahul1116/DiscordBot)',
                true
            )
            .addField('Son Of', '[Rahul Ravindran](https://github.com/rahul1116)', true);

        message
            .delete()
            .catch(() =>
                console.log('[Warning]: DM to the bot cannot be deleted with `message.delete()` ')
            );
        message.author.send(botInfoEmbed);
    }
};

bot.login(process.env.token);