const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('./config.json'); // Import the configuration file

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'about') {
        const aboutEmbed = {
            color: 0x0099ff,
            title: 'Welcome to Beh Bot!',
            description: 'Beh Bot is here to assist you with various tasks and provide information.',
            timestamp: new Date(),
            footer: {
                text: 'Beh Bot',
            },
        };

        await interaction.reply({ embeds: [aboutEmbed] });
    }
});

const commands = [
    new SlashCommandBuilder()
        .setName('about')
        .setDescription('Displays a welcome message')
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(config.TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(config.CLIENT_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.login(config.TOKEN);