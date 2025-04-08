import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';

const data = new SlashCommandBuilder()
  .setName('ruokaa')
  .setDescription('Kertoo ruokalistan')
  .addStringOption(option =>
		option.setName('aikavali')
			.setDescription('Haluatko tämän päivän, tämän viikon vai vaikka ensiviikon ruokalistan?')
      .setRequired(true)
			.setChoices(
        {name: "Tämän päivän ruokalista", value: "tamanPaivanRuokalista", default: true},
        {name: "Tämän viikon ruokalista", value: "tamanViikonRuokalista",},
        {name: "Ensi viikon ruokalista", value: "ensiViikonRuokalista",}
        
      ));

const commands = [data.toJSON()];
const rest = new REST().setToken(process.env.BOT_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');
  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
