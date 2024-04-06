/* eslint-disable @typescript-eslint/no-unused-vars */
import yargs from "yargs";
import chalk from "chalk";
import { hideBin } from "yargs/helpers";
import { getUserCollection } from "./functions/get_user_collection.js";
import { newCard } from "./functions/new_card.js";
import { Checker } from "./classes/checker.js";
import { ListCards } from "./functions/list_cards.js";
import { removeCard } from './functions/remove_card.js';
import { getCard } from "./functions/get_card.js";
import { updateCard } from "./functions/update_card.js";
import { paintColor } from "./functions/paint_color.js";

// Obtiene la instancia de la clase Checker
const checker = Checker.getInstance();

/**
 * Configura los comandos de la línea de comandos para agregar una carta a una colección.
 */
let myargs = yargs(hideBin(process.argv))
.command('add', 'Adds a card to a collection', (yargs) => {
	yargs.options({
		user: {
			username: 'Username',
			type: 'string',
			demandOption: true
		},
		id: {
			description: 'Card ID',
			type: 'number',
			demandOption: true
		},
		name: {
			description: 'Card Name',
			type: 'string',
			demandOption: true
		},
		mana: {
			description: 'Mana Cost',
			type: 'number',
			demandOption: true
		},
		color: {
			description: 'Card Color',
			type: 'string',
			demandOption: true
		},
		type: {
			description: 'Card Type',
			type: 'string',
			demandOption: true
		},
		rarity: {
			description: 'Card Rarity',
			type: 'string',
			demandOption: true
		},
		strength: {
			description: 'Card Strength',
			type: 'number',
			demandOption: false
		},
		resistance: {
			description: 'Card Resistance',
			type: 'number',
			demandOption: false
		},
		loyalty: {
			description: 'Card Loyalty',
			type: 'number',
			demandOption: false
		},
		text: {
			description: 'Card Text',
			type: 'string',
			demandOption: true
		},
		value: {
			description: 'Card Value',
			type: 'number',
			demandOption: true
		}
	});
	}, (argv) => {
		const userCollection: string = getUserCollection(argv.user);
		if (!checker.checkLoyalty(argv.type, argv.loyalty) ||
				!checker.checkStrRes(argv.type, argv.strength, argv.resistance)) {
			console.log(chalk.red(`Card not added to ${argv.user} collection!`));
			return;
		}
		if (checker.checkIfCardExistsForThisUser(argv.name, userCollection, argv.id)) {
			console.log(chalk.red(`Card already exists at ${argv.user} collection!`));
			return;
		}
		else newCard(argv.id,
			argv.name,
			argv.user,
			argv.mana,
			argv.color,
			argv.type,
			argv.rarity,
			[argv.strength, argv.resistance],
			argv.loyalty,
			argv.text,
			argv.value,
			userCollection);
	})
 .help()
 .argv;

/**
 * Configura los comandos de la línea de comandos para listar las cartas en la colección.
 */
myargs = yargs(hideBin(process.argv))
.command('list', 'Adds a card to the collection', {
	user: {
		username: 'Username',
		type: 'string',
		demandOption: true
	}
 }, (argv) => {
	const userCollection: string = getUserCollection(argv.user);
	ListCards(userCollection);
 })
 .help()
 .argv;

 /**
 * Configura los comandos de la línea de comandos para actualizar una carta en la colección.
 */
myargs = yargs(hideBin(process.argv))
.command('update', 'Adds a card to the collection', (yargs) => {
	yargs.options({
		user: {
			username: 'Username',
			type: 'string',
			demandOption: true
		},
		id: {
			description: 'Card ID',
			type: 'number',
			demandOption: true
		},
		name: {
			description: 'Card Name',
			type: 'string',
			demandOption: false
		},
		mana: {
			description: 'Mana Cost',
			type: 'number',
			demandOption: false
		},
		color: {
			description: 'Card Color',
			type: 'string',
			demandOption: false
		},
		type: {
			description: 'Card Type',
			type: 'string',
			demandOption: false
		},
		rarity: {
			description: 'Card Rarity',
			type: 'string',
			demandOption: false
		},
		strength: {
			description: 'Card Strength',
			type: 'number',
			demandOption: false
		},
		resistance: {
			description: 'Card Resistance',
			type: 'number',
			demandOption: false
		},
		loyalty: {
			description: 'Card Loyalty',
			type: 'number',
			demandOption: false
		},
		text: {
			description: 'Card Text',
			type: 'string',
			demandOption: false
		},
		value: {
			description: 'Card Value',
			type: 'number',
			demandOption: false
		}
	});
	}, (argv) => {
	 const userCollection: string = getUserCollection(argv.user);
	 if (!checker.checkIfCardExistsForThisUser(argv.name, userCollection, argv.id)) {
		 console.log(chalk.red(`Card not found at ${argv.user} collection!`));
	 } else updateCard(argv.id,
		 userCollection,
		 argv.name,
		 argv.mana,
		 argv.color,
		 argv.type,
		 argv.rarity,
		 argv.strength,
		 argv.resistance,
		 argv.loyalty,
		 argv.text,
		 argv.value);
	})
 .help()
 .argv; 

/**
* Configura los comandos de la línea de comandos para leer una carta de la colección.
*/
myargs = yargs(hideBin(process.argv))
.command('read', 'Prints a card from a collection', {
 user: {
	 username: 'Username',
	 type: 'string',
	 demandOption: true
 },
 id: {
		description: 'Card ID',
		type: 'number',
		demandOption: true
 }
}, (argv) => {
 const userCollection: string = getUserCollection(argv.user);
 if (!checker.checkIfCardExistsForThisUser("", userCollection, argv.id)) {
	 console.log(chalk.red(`Card not found at ${argv.user} collection!`));
	 return;
 }
 const card = getCard(argv.id, userCollection);
 for (const key in card) { 
	 if (key !== 'Color') console.log(`${key}: ${card[key]}`);
	 else paintColor(card[key]);
 }
})
.help()
.argv;

/**
* Configura los comandos de la línea de comandos para eliminar una carta de la colección.
*/
myargs = yargs(hideBin(process.argv))
.command('remove', 'Adds a card to the collection', {
 user: {
	 username: 'Username',
	 type: 'string',
	 demandOption: true
 },
 id: {
		description: 'Card ID',
		type: 'number',
		demandOption: true
 }
}, (argv) => {
 const userCollection: string = getUserCollection(argv.user);
 if (!checker.checkIfCardExistsForThisUser("", userCollection, argv.id)) { 
	 console.log(chalk.red(`Card not found at ${argv.user} collection!`));
	 return;
 }
 removeCard(argv.id, userCollection);
})
.help()
.argv;