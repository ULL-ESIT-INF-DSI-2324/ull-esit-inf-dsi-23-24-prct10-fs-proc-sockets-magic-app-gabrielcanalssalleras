import fs from 'fs';
import { Color } from '../constants/color.js';
import { Rareza } from '../constants/rareza.js';
import { Tipo } from '../constants/tipo.js';
import chalk from 'chalk';

/**
 * Clase para verificar diferentes aspectos de las cartas.
 */
export class Checker {
	private static instance: Checker;

	private constructor() {}

	/**
	 * Obtiene la instancia de la clase Checker.
	 * @returns La instancia de la clase Checker.
	 */
	static getInstance() {
		if (!Checker.instance) {
			Checker.instance = new Checker();
		}
		return Checker.instance;
	}
	
	/**
	 * Verifica si el ID de la carta ya existe.
	 * @param id - El ID de la carta.
	 * @param user - El usuario.
	 * @returns Verdadero si el ID no existe, falso en caso contrario.
	 */
	checkId(id: unknown, user: unknown): boolean {
		for (const file of fs.readdirSync(`${ user }`)) {
			const card = JSON.parse(fs.readFileSync(`${ user }/${ file }`, 'utf-8'));
			if (card.ID === id) return false;
		}
		return true;
	}

	/**
	 * Verifica la lealtad de la carta.
	 * @param type - El tipo de la carta.
	 * @param loyalty - La lealtad de la carta.
	 * @returns Verdadero si la lealtad es válida, falso en caso contrario.
	 */
	checkLoyalty(type: unknown, loyalty?: unknown): boolean {
		if (type !== 'Planeswalker' && loyalty) {
			console.log(chalk.red('Loyalty is only for Planeswalker cards'));
			return false;
		}
		if (type === 'Planeswalker' && !loyalty) {
			console.log(chalk.red('Planeswalker cards must have loyalty'));
			return false;
		}
		if (type === 'Planeswalker' && loyalty && typeof loyalty !== 'number') {
			console.log(chalk.red('Loyalty must be a number'));
			return false;
		}
		return true;
	}

	/**
	 * Verifica si la carta existe para este usuario.
	 * @param card - La carta.
	 * @param userCollection - La colección de cartas del usuario.
	 * @param id - El ID de la carta.
	 * @returns Verdadero si la carta existe, falso en caso contrario.
	 */
	checkIfCardExistsForThisUser(card: unknown, userCollection: string, id: unknown): boolean {
		if (!this.checkId(id, userCollection)) return true;
		if (card && fs.existsSync(`${ userCollection }/${ card }.json`)) return true;
		return false;
	}

	/**
	 * Verifica la fuerza y resistencia de la carta.
	 * @param type - El tipo de la carta.
	 * @param str - La fuerza de la carta.
	 * @param res - La resistencia de la carta.
	 * @returns Verdadero si la fuerza y resistencia son válidas, falso en caso contrario.
	 */
	checkStrRes(type: unknown, str?: unknown, res?: unknown): boolean {
		if (type !== 'Criatura' && (str || res)) {
			console.log(chalk.red('Strength and resistance are only for Creature cards'));
			return false;
		}
		if ((type === 'Criatura') && (!str || !res)) {
			console.log(chalk.red('Creature cards must have strength and resistance'));
			return false;
		}
		if (type === 'Criatura' && str && typeof str !== 'number') {
			console.log(chalk.red('Strength must be a number'));
			return false;
		}
		if (type === 'Criatura' && res && typeof res !== 'number') {
			console.log(chalk.red('Resistance must be a number'));
			return false;
		}
		return true;
	}

	/**
	 * Verifica el mana de la carta.
	 * @param mana - El mana de la carta.
	 * @returns Verdadero si el mana es válido, falso en caso contrario.
	 */
	checkMana(mana: unknown): boolean {
		if (typeof mana !== 'number') {
			console.log(chalk.red('Mana must be a number'));
			return false;
		}
		return true;
	}

	/**
	 * Verifica el color de la carta.
	 * @param color - El color de la carta.
	 * @returns Verdadero si el color es válido, falso en caso contrario.
	 */
	checkColor(color: unknown): boolean {
		if (typeof color !== 'string') {
			console.log(chalk.red('Color must be a string'));
			return false;
		}
		if (!Object.values(Color).includes(color)) {
			console.log(chalk.red('Invalid color!'));
			return false;
		}
		return true;
	}

	/**
	 * Verifica el tipo de la carta.
	 * @param type - El tipo de la carta.
	 * @returns Verdadero si el tipo es válido, falso en caso contrario.
	 */
	checkType(type: unknown): boolean {
		if (typeof type !== 'string') {
			console.log(chalk.red('Type must be a string'));
			return false;
		}
		if (!Object.values(Tipo).includes(type)) {
			console.log(chalk.red('Invalid type!'));
			return false;
		}
		return true;
	}

	/**
	 * Verifica la rareza de la carta.
	 * @param rarity - La rareza de la carta.
	 * @returns Verdadero si la rareza es válida, falso en caso contrario.
	 */
	checkRarity(rarity: unknown): boolean {
		if (typeof rarity !== 'string') {
			console.log(chalk.red('Rarity must be a string'));
			return false;
		}
		if (!Object.values(Rareza).includes(rarity)) {
			console.log(chalk.red('Invalid rarity!'));
			return false;
		}
		return true;
	}
}
