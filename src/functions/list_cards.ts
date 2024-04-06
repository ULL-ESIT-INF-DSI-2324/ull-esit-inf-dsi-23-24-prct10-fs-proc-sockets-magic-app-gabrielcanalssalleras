import fs from "fs";
import { paintColor } from "./paint_color.js";

/**
 * Lista las cartas en la colección del usuario.
 * @param userCollection - La colección de cartas del usuario.
 */
export function ListCards(userCollection: string) {
	const user: string = userCollection.split('/')[1];
	console.log (`${user}'s collection`);
	for (const file of fs.readdirSync(`${ userCollection }`)) {
		console.log (`----------------------------`);
		const card = JSON.parse(fs.readFileSync(`${ userCollection }/${ file }`, 'utf-8'));
		for (const key in card) {
			if (key !== "Color")	console.log(`${key}: ${card[key]}`);
			else paintColor(card[key]);
		}
	}
}
