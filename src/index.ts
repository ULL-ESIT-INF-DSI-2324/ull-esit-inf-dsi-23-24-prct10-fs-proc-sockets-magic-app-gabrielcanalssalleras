/* eslint-disable @typescript-eslint/no-unused-vars */
import yargs from "yargs";
import chalk from "chalk";
import { hideBin } from "yargs/helpers";
import { getUserCollection } from "./functions/get_user_collection.js";
import { newCard } from "./functions/new_card.js";
import { Checker } from "./classes/checker.js";
import { ListCards } from "./functions/list_cards.js";
import { removeCard } from "./functions/remove_card.js";
import { updateCard } from "./functions/update_card.js";
import net from "net";

// Obtiene la instancia de la clase Checker
const checker = Checker.getInstance();

const client = net.connect({ port: 60300 });

/**
 * Configura los comandos de la línea de comandos para agregar una carta a una colección.
 */
let myargs = yargs(hideBin(process.argv))
  .command(
    "add",
    "Adds a card to a collection",
    (yargs) => {
      yargs.options({
        user: {
          username: "Username",
          type: "string",
          demandOption: true,
        },
        id: {
          description: "Card ID",
          type: "number",
          demandOption: true,
        },
        name: {
          description: "Card Name",
          type: "string",
          demandOption: true,
        },
        mana: {
          description: "Mana Cost",
          type: "number",
          demandOption: true,
        },
        color: {
          description: "Card Color",
          type: "string",
          demandOption: true,
        },
        type: {
          description: "Card Type",
          type: "string",
          demandOption: true,
        },
        rarity: {
          description: "Card Rarity",
          type: "string",
          demandOption: true,
        },
        strength: {
          description: "Card Strength",
          type: "number",
          demandOption: false,
        },
        resistance: {
          description: "Card Resistance",
          type: "number",
          demandOption: false,
        },
        loyalty: {
          description: "Card Loyalty",
          type: "number",
          demandOption: false,
        },
        text: {
          description: "Card Text",
          type: "string",
          demandOption: true,
        },
        value: {
          description: "Card Value",
          type: "number",
          demandOption: true,
        },
      });
    },
    (argv) => {
      const userCollection: string = getUserCollection(argv.user);
      const card = JSON.stringify({
        action: "add",
        card: {
          id: argv.id,
          name: argv.name,
          mana: argv.mana,
          color: argv.color,
          type: argv.type,
          rarity: argv.rarity,
          strRes: [argv.strength, argv.resistance],
          loyalty: argv.loyalty,
          rules: argv.text,
          value: argv.value,
        },
        user: argv.user,
        userCollection: userCollection,
        close: "DONE",
      });
      client.write(card);
    },
  )
  .help().argv;

/**
 * Configura los comandos de la línea de comandos para listar las cartas en la colección.
 */
myargs = yargs(hideBin(process.argv))
  .command(
    "list",
    "Adds a card to the collection",
    {
      user: {
        username: "Username",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      const userCollection: string = getUserCollection(argv.user);
      client.write(
        JSON.stringify({
          action: "list",
          userCollection: userCollection,
          close: "DONE",
        }),
      );
    },
  )
  .help().argv;

/**
 * Configura los comandos de la línea de comandos para actualizar una carta en la colección.
 */
myargs = yargs(hideBin(process.argv))
  .command(
    "update",
    "Adds a card to the collection",
    (yargs) => {
      yargs.options({
        user: {
          username: "Username",
          type: "string",
          demandOption: true,
        },
        id: {
          description: "Card ID",
          type: "number",
          demandOption: true,
        },
        name: {
          description: "Card Name",
          type: "string",
          demandOption: false,
        },
        mana: {
          description: "Mana Cost",
          type: "number",
          demandOption: false,
        },
        color: {
          description: "Card Color",
          type: "string",
          demandOption: false,
        },
        type: {
          description: "Card Type",
          type: "string",
          demandOption: false,
        },
        rarity: {
          description: "Card Rarity",
          type: "string",
          demandOption: false,
        },
        strength: {
          description: "Card Strength",
          type: "number",
          demandOption: false,
        },
        resistance: {
          description: "Card Resistance",
          type: "number",
          demandOption: false,
        },
        loyalty: {
          description: "Card Loyalty",
          type: "number",
          demandOption: false,
        },
        text: {
          description: "Card Text",
          type: "string",
          demandOption: false,
        },
        value: {
          description: "Card Value",
          type: "number",
          demandOption: false,
        },
      });
    },
    (argv) => {
      const userCollection: string = getUserCollection(argv.user);
      client.write(
        JSON.stringify({
          action: "update",
          card: {
            id: argv.id,
            name: argv.name,
            mana: argv.mana,
            color: argv.color,
            type: argv.type,
            rarity: argv.rarity,
            strRes: [argv.strength, argv.resistance],
            loyalty: argv.loyalty,
            rules: argv.text,
            value: argv.value,
          },
          userCollection: userCollection,
          close: "DONE",
        }),
      );
    },
  )
  .help().argv;

/**
 * Configura los comandos de la línea de comandos para leer una carta de la colección.
 */
myargs = yargs(hideBin(process.argv))
  .command(
    "read",
    "Prints a card from a collection",
    {
      user: {
        username: "Username",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Card ID",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      const userCollection: string = getUserCollection(argv.user);

      const data = JSON.stringify({
        action: "read",
        userCollection: userCollection,
        cardID: argv.id,
        close: "DONE",
      });
      client.write(data);
    },
  )
  .help().argv;

/**
 * Configura los comandos de la línea de comandos para eliminar una carta de la colección.
 */
myargs = yargs(hideBin(process.argv))
  .command(
    "remove",
    "Removes a card from the collection",
    {
      user: {
        username: "Username",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Card ID",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      const userCollection: string = getUserCollection(argv.user);
      client.write(
        JSON.stringify({
          action: "remove",
          cardID: argv.id,
          userCollection: userCollection,
          close: "DONE",
        }),
      );
    },
  )
  .help().argv;
