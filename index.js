import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";

const parser = new XMLParser();
import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let channel;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
async function hae_kaunis_ruokalista(){
  const foodlist = await getFoodList();
  //console.log(foodlist);
  const foodlistParsed = parser.parse(foodlist);
  //console.log(foodlistParsed);
  //console.log(foodlistParsed.rss.channel.item);
  //console.log(foodlistParsed.rss.channel.item.description);
  return foodlistParsed.rss.channel.item.description;
}

await console.log(await hae_kaunis_ruokalista());

function foo(){
  console.log("bazz");
}

async function getFoodList(){
  let food;
  await fetch("https://aromimenu.cgisaas.fi/EspooAromieMenus/FI/Default/ESPOO/Lintumetsankoulu/Rss.aspx?Id=221d8290-97ee-442f-b604-11b0f6dd2346&amp;DateMode=0").then(vastaus => {
    food = vastaus.text()
  });

  return await food;

  }

function embedRakentaja(){
  const exampleEmbed = new EmbedBuilder()
  .setColor(c1991c)
  .setTitle('Tänään ruokana')
  .setURL('https://discord.js.org/')
  .setDescription('')
  .setThumbnail('https://i.imgur.com/AfFp7pu.png')
  .addFields(
    { name: 'Regular field title', value: 'Some value here' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true },
  )
  .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
  .setTimestamp()

  return { embeds: [exampleEmbed] };
}  

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'uwu') {
    await interaction.reply(embedRakentaja());
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'anna_ruokaa'){

    interaction.reply(await hae_kaunis_ruokalista());
  }
  if (interaction.commandName === 'testi'){
    interaction.reply("Moi");
  }
});

client.login(process.env.BOT_TOKEN);
