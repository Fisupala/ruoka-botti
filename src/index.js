import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

const parser = new XMLParser();
import { Client, GatewayIntentBits, EmbedBuilder, CommandInteraction, ApplicationCommand } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let channel;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


async function parseRuokalista(ruokalista) {
  const foodlist2 = await ruokalista;
  const foodlist2Parsed = await parser.parse(foodlist2);
  if (Array.isArray(foodlist2Parsed.rss.channel.item)) {
    return await foodlist2Parsed.rss.channel.item;
  }
  else {
    return [foodlist2Parsed.rss.channel.item];
  }
}

async function haeTamanViikonRuokalista() {
  let food;
  //alempana linkki tämän viikon ruokalistaan
  await fetch("https://aromimenu.cgisaas.fi/EspooAromieMenus/FI/Default/ESPOO/Lintumetsankoulu/Rss.aspx?Id=bf4e16af-ddcc-4e46-9733-b424f19e3939&DateMode=1").then(vastaus => {
    food = vastaus.text()
  });

  return parseRuokalista(food);

}

async function haeEnsiViikonRuokalista() {
  let food;
  //alempana linkki ensi viikon ruokalistaan
  await fetch("https://aromimenu.cgisaas.fi/EspooAromieMenus/FI/Default/ESPOO/Lintumetsankoulu/Rss.aspx?Id=bf4e16af-ddcc-4e46-9733-b424f19e3939&DateMode=2").then(vastaus => {
    food = vastaus.text()
  });

  return parseRuokalista(food);

}

async function haeTamanPaivanRuokalista() {
  let food;
  //alempana linkki ensi viikon ruokalistaan
  await fetch("https://aromimenu.cgisaas.fi/EspooAromieMenus/FI/Default/ESPOO/Lintumetsankoulu/Rss.aspx?Id=bf4e16af-ddcc-4e46-9733-b424f19e3939&DateMode=0").then(vastaus => {
    food = vastaus.text()
  });

  return parseRuokalista(food);

}

async function embedRakentaja(ruokalista_ei_odotettu, description) {
  const ruokalista = await ruokalista_ei_odotettu;

  const exampleEmbed = {
    color: 0xbe9130,
    title: 'Ruokalista',
    author: {
      name: 'Espoo Catering', // linkin nimi
      icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLZzjvSp-SILXuQltElemmpiR-DCp5zSh8bg&s', // Espoo logo
      url: 'https://aromimenu.cgisaas.fi/EspooAromieMenus/FI/Default/ESPOO/Lintumetsankoulu/Restaurant.aspx', // Linkki ruokalistasivustolle
    },
    description: description,
    thumbnail: {
    },
    fields: [
    ],
    image: {
    }
  };

  for (let osa in ruokalista) {
    if (ruokalista.length != 1) {
      exampleEmbed.fields.push({
        name: ruokalista[osa].title,
        value: "",
        inline: false,
      });
    }
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

  if (interaction.commandName === 'ruokaa') {
    const aikavali = interaction.options.getString("aikavali")
    if (aikavali === "tamanViikonRuokalista") {
      const ruokalista2 = haeTamanViikonRuokalista();
      await interaction.reply({ embeds: [await embedRakentaja(ruokalista2, "Tämän viikon ruokalista")] });

    }
    else if (aikavali === "ensiViikonRuokalista") {
      const ruokalista2 = haeEnsiViikonRuokalista();
      await interaction.reply({ embeds: [await embedRakentaja(ruokalista2, "Ensiviikon ruokalista")] });

    }
    else {
      const ruokalista2 = haeTamanPaivanRuokalista();
      await interaction.reply({ embeds: [await embedRakentaja(ruokalista2, "Tämän päivän ruokalista")] });

    }
  }

});
client.login(process.env.BOT_TOKEN);