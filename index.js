import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

const parser = new XMLParser();
import { Client, GatewayIntentBits, EmbedBuilder, CommandInteraction, ApplicationCommand } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let channel;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
async function hae_kaunis_ruokalista() {
  const foodlist = await getFoodList();
  //console.log(foodlist);
  const foodlistParsed = parser.parse(foodlist);
  console.log(foodlistParsed.rss.channel);
  //console.log(foodlistParsed.rss.channel.item);
  //console.log(foodlistParsed.rss.channel.item.description);
  return foodlistParsed.rss.channel.item;
}

//await console.log(await hae_kaunis_ruokalista());

function foo() {
  console.log("bazz");
}

async function getFoodList() {
  let food;
  await fetch("https://aromimenu.cgisaas.fi/EspooAromieMenus/FI/Default/ESPOO/Lintumetsankoulu/Rss.aspx?Id=bf4e16af-ddcc-4e46-9733-b424f19e3939&DateMode=1").then(vastaus => {
    food = vastaus.text()
  });

  return await food;

}

async function embedRakentaja() {
  let ruokalista = await hae_kaunis_ruokalista();

  //  console.log(ruokalista.split("<br><br>"));
  //  let ruokalistat = ruokalista.split("<br><br>")
  const exampleEmbed = {
    color: 0xbe9130,
    title: 'Ruokalista',
    author: {
    },
    description: 'Tämän päivän ruokalista',
    thumbnail: {
    },
    fields: [
/*    {
        name: 'Perusruoka',
        value: ruokalista, //ruoka tähän
        inline: false,
      },
*/    ],
    image: {
    }
  };

  for (let osa in ruokalista) {
    console.log(osa);

    //let otsikko = ruokalistat[osa].split(":");
    //console.log(otsikko);
    exampleEmbed.fields.push({
      name: ruokalista[osa].title,
      value: "",
      inline: false,
    });
    let paiva = ruokalista[osa].description.split("<br><br>")

    let Kasvislounas = paiva[0].split(":")
    exampleEmbed.fields.push({
      name: "Kasvislounas",
      value: Kasvislounas[1],
      inline: true,
    });

    let Normaalilounas = paiva[1].split(":")
    exampleEmbed.fields.push({
      name: "Normaalilounas",
      value: Normaalilounas[1],
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
/*
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
 
  if (interaction.commandName === 'anna_ruokaa') {
 
    interaction.reply(await hae_kaunis_ruokalista());
  }
});
*/
client.login(process.env.BOT_TOKEN);
