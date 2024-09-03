import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let channel;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function foo(){
  console.log("bazz");
}

async function getFoodList(){
  let food;
  await fetch("https://aromimenu.cgisaas.fi/EspooAromieMenus/FI/Default/ESPOO/Lintuvaarankoulu/Rss.aspx?Id=221d8290-97ee-442f-b604-11b0f6dd2346&amp;DateMode=0").then(vastaus => {
    food = vastaus.text();
  });
  return await food;
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'uwu') {
    await interaction.reply('uwu~');
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'anna_ruokaa') {

    const foodlist = await getFoodList();
    await interaction.reply(foodlist);
  }
});

client.login(process.env.BOT_TOKEN);
