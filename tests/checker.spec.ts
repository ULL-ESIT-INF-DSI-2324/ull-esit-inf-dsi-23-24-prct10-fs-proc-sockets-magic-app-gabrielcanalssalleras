import { expect } from 'chai';
import 'mocha';
import { Checker } from '../src/classes/checker.js';

describe('Clase Checker', () => {
	it('Debería retornar una instancia de Checker', () => {
		const checker = Checker.getInstance();
		expect(checker).to.be.an.instanceOf(Checker);
	});

	it('checkLoyalty comprueba si la lealtad es válida', () => {
		const checker = Checker.getInstance();
		expect(checker.checkLoyalty('Criatura', 3)).to.be.false;
		expect(checker.checkLoyalty('Planeswalker', null)).to.be.false;
		expect(checker.checkLoyalty('Planeswalker', "This is my loyalty")).to.be.false;
		expect(checker.checkLoyalty('Planeswalker', 3)).to.be.true;
	});

	it('checkStrRes comprueba si la fuerza y resistencia son válidas', () => {
		const checker = Checker.getInstance();
		expect(checker.checkStrRes('Criatura', 3)).to.be.false;
		expect(checker.checkStrRes('Criatura', null, 3)).to.be.false;
		expect(checker.checkStrRes('Criatura', "This is my strength", 3)).to.be.false;
		expect(checker.checkStrRes('Criatura', 3, "This is my resistance")).to.be.false;
		expect(checker.checkStrRes('Criatura', 3, 3)).to.be.true;
		expect(checker.checkStrRes('Tierra', 3)).to.be.false;
		expect(checker.checkStrRes('Tierra', null, 3)).to.be.false;
		expect(checker.checkStrRes('Tierra', 3, 3)).to.be.false;
	});

	it('checkMana comprueba si el mana es válido', () => {
		const checker = Checker.getInstance();
		expect(checker.checkMana('3')).to.be.false;
		expect(checker.checkMana(3)).to.be.true;
	});

	it('checkcolor comprueba si el color es válido', () => {
		const checker = Checker.getInstance();
		expect(checker.checkColor('Rojo')).to.be.true;
		expect(checker.checkColor(16)).to.be.false;
		expect(checker.checkColor('Rosa')).to.be.false;
	});

	it('checkType comprueba si el tipo es válido', () => {
		const checker = Checker.getInstance();
		expect(checker.checkType('Criatura')).to.be.true;
		expect(checker.checkType('Tierra')).to.be.true;
		expect(checker.checkType('Planeswalker')).to.be.true;
		expect(checker.checkType('Encantamiento')).to.be.true;
		expect(checker.checkType('Instantaneo')).to.be.true;
		expect(checker.checkType('Conjuro')).to.be.true;
		expect(checker.checkType('Artefacto')).to.be.true;
		expect(checker.checkType('Ritual')).to.be.false;
		expect(checker.checkType(16)).to.be.false;
	});

	it('checkRarity comprueba si la rareza es válida', () => {
		const checker = Checker.getInstance();
		expect(checker.checkRarity('Comun')).to.be.true;
		expect(checker.checkRarity('Rara')).to.be.true;
		expect(checker.checkRarity('Mitica')).to.be.true;
		expect(checker.checkRarity('Rarísima')).to.be.false;
		expect(checker.checkRarity(16)).to.be.false;
	});
});