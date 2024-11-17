import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

const parser = new XMLParser();
import { Client, GatewayIntentBits, EmbedBuilder, CommandInteraction, ApplicationCommand } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let channel;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
async function hae_kaunis_ruokalista2() {
  const foodlist2 = await getFoodList2();
  const foodlist2Parsed = parser.parse(foodlist2);
  return foodlist2Parsed.rss.channel.item;
}

async function getFoodList2() {
  let food;
  await fetch("https://aromimenu.cgisaas.fi/EspooAromieMenus/FI/Default/ESPOO/Lintumetsankoulu/Rss.aspx?Id=bf4e16af-ddcc-4e46-9733-b424f19e3939&DateMode=2").then(vastaus => {
    food = vastaus.text()
  });

  return await food;

}


async function embedRakentaja() {
  let ruokalista = await hae_kaunis_ruokalista2();
  const exampleEmbed = {
    color: 0xbe9130,
    title: 'Ruokalista',
    author: {
      name: 'Espoo Catering',
      icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLZzjvSp-SILXuQltElemmpiR-DCp5zSh8bg&s',
      url: 'https://aromimenu.cgisaas.fi/EspooAromieMenus/FI/Default/ESPOO/Lintumetsankoulu/Restaurant.aspx',
    },
    description: 'Seuraavan viikon ruokalista',
    thumbnail: {
    },
    fields: [
  ],
    image: {
    }
  };

  for (let osa in ruokalista) {
    exampleEmbed.fields.push({
      name: ruokalista[osa].title,
      value: "",
      inline: false,
    });
    let paiva = ruokalista[osa].description.split("<br><br>")

    let Normaalilounas = paiva[1].split(":")
    exampleEmbed.fields.push({
      name: "Normaalilounas",
      value: Normaalilounas[1],
      inline: true,
    });

    let Kasvislounas = paiva[0].split(":")
    exampleEmbed.fields.push({
      name: "Kasvislounas",
      value: Kasvislounas[1],
      inline: true,
    });


    exampleEmbed.fields.push({
      name: "\u200B",
      value: "",
      inline: false,
    });

  }
  return exampleEmbed;
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'anna_ruokaa') {
    await interaction.reply({ embeds: [await embedRakentaja()] });
  }

});
client.login(process.env.BOT_TOKEN);
