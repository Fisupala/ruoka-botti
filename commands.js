import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';

const data = new SlashCommandBuilder()
  .setName('ruokaa')
  .setDescription('Kertoo ruokalistan')
  .addStringOption(option =>
		option.setName('nimi')
			.setDescription('Desc')
			.setAutocomplete(true));

const commands = [data.toJSON()];
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');
  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
