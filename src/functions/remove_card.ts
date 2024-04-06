import fs from 'fs';
import chalk from 'chalk';

/**
 * Elimina una carta de la colección del usuario.
 * @param id - El ID de la carta.
 * @param userCollection - La colección de cartas del usuario.
 */
export function removeCard(id: unknown, userCollection: string) {
	for (const file of fs.readdirSync(userCollection)) {
		const card = JSON.parse(fs.readFileSync(`${userCollection}/${file}`, 'utf-8'));
		if (card.ID === id) {
			fs.unlinkSync(`${userCollection}/${file}`);
			const user = userCollection.split('/')[1];
			console.log(chalk.green(`Card removed from ${ user } collection!`));
			return;
		}
	}
}
