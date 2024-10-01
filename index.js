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
  //console.log(foodlistParsed);
  //console.log(foodlistParsed.rss.channel.item);
  //console.log(foodlistParsed.rss.channel.item.description);
  return foodlistParsed.rss.channel.item.description;
}

//await console.log(await hae_kaunis_ruokalista());

function foo() {
  console.log("bazz");
}

async function getFoodList() {
  let food;
  await fetch("https://aromimenu.cgisaas.fi/EspooAromieMenus/FI/Default/ESPOO/Lintumetsankoulu/Rss.aspx?Id=221d8290-97ee-442f-b604-11b0f6dd2346&amp;DateMode=0").then(vastaus => {
    food = vastaus.text()
  });

  return await food;

}

async function embedRakentaja() {
  let ruokalista = await hae_kaunis_ruokalista();

//  console.log(ruokalista.split("<br><br>"));
  let ruokalistat = ruokalista.split("<br><br>")
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

  for (let osa in ruokalistat) {
    //console.log(osa);

    let otsikko = ruokalistat[osa].split(":");
    //console.log(otsikko);
    exampleEmbed.fields.push({
      name: otsikko[0],
      value: otsikko[1],
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

