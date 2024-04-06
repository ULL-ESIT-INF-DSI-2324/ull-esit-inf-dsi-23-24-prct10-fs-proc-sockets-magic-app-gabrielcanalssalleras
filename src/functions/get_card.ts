import fs from 'fs';
import chalk from 'chalk';

/**
 * Obtiene una carta específica de la colección del usuario.
 * @param id - El ID de la carta.
 * @param userCollection - La colección de cartas del usuario.
 * @returns La carta si se encuentra, de lo contrario muestra un mensaje de error.
 */
export function getCard(id: unknown, userCollection: string) {
	for (const file of fs.readdirSync(userCollection)) {
		const card = JSON.parse(fs.readFileSync(`${userCollection}/${file}`, 'utf-8'));
		if (card.ID === id) {
			return card;
		}
	}
	console.log(chalk.red('Card not found!'));
}
