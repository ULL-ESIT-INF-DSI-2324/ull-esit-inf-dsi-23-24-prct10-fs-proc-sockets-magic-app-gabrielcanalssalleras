import { expect } from 'chai';
import 'mocha';
import { execSync } from 'child_process';

const addCard = 'node dist/index.js add --user "testing" --id 23 --name "Electromante trasgo" --mana 2 --color "Multicolor" --type "Criatura" --text "Arrollar. Vuela." --value 1 --rarity "Comun" --strength 2 --resistance 2';
const addCard2 = 'node dist/index.js add --user "testing" --id 2 --name "Bola de Fuego" --mana 4 --color "Rojo" --type "Conjuro" --text "Duele bastante." --value 25 --rarity "Infrecuente"';
const addCriatureWithouthStrength = 'node dist/index.js add --user "testing" --id 12 --name "Bobbin el Goblin" --mana 1 --color "Verde" --type "Criatura" --text "Aplica herida." --value 1 --rarity "Rara" --resistance 2';
const addCriatureWithouthResistance = 'node dist/index.js add --user "testing" --id 3 --name "Bobbol el Kobold" --mana 1 --color "Rojo" --type "Criatura" --text "Aplica herida." --value 1 --rarity "Comun" --strength 2';
const addNotCriatureWithStrength = 'node dist/index.js add --user "testing" --id 4 --name "Espada de Ameiko" --mana 1 --color "Blanco" --type "Artefacto" --text "Gana 5 vidas." --value 1 --rarity "Comun" --strength 2';
const addNotCriatureWithResistance = 'node dist/index.js add --user "testing" --id 5 --name "Lágrimas de lamia" --mana 1 --color "Verde" --type "Instantaneo" --text "Veneno." --value 1 --rarity "Infecuente" --resistance 2';
const addPlaneswalkerWithouthLoyalty = 'node dist/index.js add --user "testing" --id 6 --name "Hoid" --mana 1 --color "Negro" --type "Planeswalker" --text "Tiene una flauta." --value 1 --rarity "Mítica"';
const addNotPlaneswalkerWithLoyalty = 'node dist/index.js add --user "testing" --id 7 --name "The Amongus Potion" --mana 5 --color "Incoloro" --type "Conjuro" --text "Veneno." --value 1 --rarity "Comun" --loyalty 2';
const listPlayerCards = 'node dist/index.js list --user "testing"';
const readACard = 'node dist/index.js read --user "testing" --id 2'
const readACardBadID = 'node dist/index.js read --user "testing" --id 25'
const removeCard = 'node dist/index.js remove --user "testing" --id 2'
const removeACardBadID = 'node dist/index.js remove --user "testing" --id 25'
const updateCard = 'node dist/index.js update --user "testing" --id 2 --mana 5';
const updateCardBadID = 'node dist/index.js update --user "testing" --id 27 --mana 8';
const updateNotCriatureWithStrength = 'node dist/index.js update --user "testing" --id 2 --strength 2';
const updateNotCriatureWithResistance = 'node dist/index.js update --user "testing" --id 2 --resistance 2';
const updateNotPlaneswalkerWithLoyalty = 'node dist/index.js update --user "testing" --id 2 --loyalty 2';

const enum Colors {
	White = "\x1b[37m",
	Blue = "\x1b[34m",
	Black = "\x1b[30m",
	Red = "\x1b[31m",
	Green = "\x1b[32m",
	EOS = "\x1b[39m\n"	
}

describe('Magic Cards', () => {

	before(() => {
		execSync('rm -rf collections/testing')
	});

	it('Al insertar la primera carta de un usuario se crea su coleccion, su fichero personal', () => {
		let stdout: string;
		stdout = execSync('[ ! -d "collections/testing" ] && echo "Directory testing does not exist."').toString().trim();
		expect(stdout).to.be.equal("Directory testing does not exist.")
		stdout = execSync(addCard).toString();
		expect(stdout).to.be.equal(Colors.Green + "Card added to testing collection!" + Colors.EOS);
		stdout = execSync('[ -d "collections/testing" ] && echo "Directory testing exists."').toString().trim();
		expect(stdout).to.be.equal("Directory testing exists.")
	});

	it('Puedes añadir cartas a un usuario. Se crea un directorio con el nombre de la carta', () => {
		let stdout: string;
		stdout = execSync('[ ! -f "collections/testing/Bola de Fuego.json" ] && echo "File Bola de Fuego does not exist."').toString().trim();
		expect(stdout).to.be.equal("File Bola de Fuego does not exist.")
		stdout = execSync(addCard2).toString();
		expect(stdout).to.be.equal(Colors.Green + "Card added to testing collection!" + Colors.EOS);
		stdout = execSync('[ -f "collections/testing/Bola de Fuego.json" ] && echo "File Bola de Fuego exists."').toString().trim();
		expect(stdout).to.be.equal("File Bola de Fuego exists.")
	});

	it('No puedes añadir cartas con el mismo ID', () => {
		let stdout: string;
		stdout = execSync(addCard).toString();
		expect(stdout).to.be.equal(Colors.Red + "Card already exists at testing collection!" + Colors.EOS);
	});

	it('Las cartas de tipo Criatura deben tener el atributo strength', () => {
		let stdout: string;
		stdout = execSync(addCriatureWithouthStrength).toString();
		expect(stdout).to.be.equal(Colors.Red + "Creature cards must have strength and resistance" + Colors.EOS +
															 Colors.Red + "Card not added to testing collection!" + Colors.EOS);
	});

	it('Las cartas de tipo Criatura deben tener el atributo resistance', () => {
		let stdout: string;
		stdout = execSync(addCriatureWithouthResistance).toString();
		expect(stdout).to.be.equal(Colors.Red + "Creature cards must have strength and resistance" + Colors.EOS + 
															 Colors.Red + "Card not added to testing collection!" + Colors.EOS);
	});

	it('Las cartas que no sean de tipo Criatura no deben tener el atributo strength', () => {
		let stdout: string;
		stdout = execSync(addNotCriatureWithStrength).toString();
		expect(stdout).to.be.equal(Colors.Red + "Strength and resistance are only for Creature cards" + Colors.EOS + 
															 Colors.Red + "Card not added to testing collection!" + Colors.EOS);
	});

	it('Las cartas que no sean de tipo Criatura no deben tener el atributo resistance', () => {
		let stdout: string;
		stdout = execSync(addNotCriatureWithResistance).toString();
		expect(stdout).to.be.equal(Colors.Red + "Strength and resistance are only for Creature cards" + Colors.EOS + 
															 Colors.Red + "Card not added to testing collection!" + Colors.EOS);
	});

	it('Las cartas de tipo Planeswalker deben tener el atributo loyalty', () => {
		let stdout: string;
		stdout = execSync(addPlaneswalkerWithouthLoyalty).toString();
		expect(stdout).to.be.equal(Colors.Red + "Planeswalker cards must have loyalty" + Colors.EOS + 
															 Colors.Red + "Card not added to testing collection!" + Colors.EOS);
	});

	it('Las cartas que no sean de tipo Planeswalker no deben tener el atributo loyalty', () => {
		let stdout: string;
		stdout = execSync(addNotPlaneswalkerWithLoyalty).toString();
		expect(stdout).to.be.equal(Colors.Red + "Loyalty is only for Planeswalker cards" + Colors.EOS + 
															 Colors.Red + "Card not added to testing collection!" + Colors.EOS);
	});

	it('Las cartas se almacenan correctamente en un fichero JSON listando sus atributos', () => {
		let stdout: string;
		stdout = execSync('cat "collections/testing/Bola de Fuego.json"').toString();
		expect(stdout).to.be.equal('{\n  "ID": 2,\n  "Name": "Bola de Fuego",\n  "Mana": 4,\n  "Color": "Rojo",\n  ' + 
															 '"Type": "Conjuro",\n  "Rarity": "Infrecuente",\n  "Text": "Duele bastante.",\n  "Value": 25\n}');
		stdout = execSync('cat "collections/testing/Electromante trasgo.json"').toString();
		expect(stdout).to.be.equal('{\n  "ID": 23,\n  "Name": "Electromante trasgo",\n  "Mana": 2,\n  "Color": "Multicolor",\n  ' + 
															 '"Type": "Criatura",\n  "Rarity": "Comun",\n  "Strength": 2,\n  "Resistance": 2,\n  "Text": "Arrollar. Vuela.",\n  "Value": 1\n}');
	});

	it('Puedes listar las cartas de un usuario', () => {
		let stdout: string;
		stdout = execSync(listPlayerCards).toString();
		expect(stdout).to.be.equal('testing\'s collection\n----------------------------\nID: 2' +
															 '\nName: Bola de Fuego\nMana: 4\nColor: Rojo\nType: Conjuro\n' +
															 'Rarity: Infrecuente\nText: Duele bastante.\nValue: 25\n----------------------------\n' +
															 'ID: 23\nName: Electromante trasgo\nMana: 2\nColor: Multicolor\nType: Criatura\nRarity: Comun' +
															 '\nStrength: 2\nResistance: 2\nText: Arrollar. Vuela.\nValue: 1\n');
	});

	it('Puedes mostrar una carta de un usuario', () => {
		let stdout: string;
		stdout = execSync(readACard).toString();
		expect(stdout).to.be.equal('ID: 2\nName: Bola de Fuego\nMana: 4\nColor: Rojo\nType: Conjuro\nRarity: Infrecuente\nText: Duele bastante.\nValue: 25\n');
	});

	it('No puedes mostrar una carta que no existe', () => {
		let stdout: string;
		stdout = execSync(readACardBadID).toString();
		expect(stdout).to.be.equal("Card not found at testing collection!\n");
	});

	it('Puedes eliminar una carta de un usuario', () => {
		let stdout: string;
		stdout = execSync(removeCard).toString();
		expect(stdout).to.be.equal("Card removed from testing collection!\n");
		stdout = execSync('[ ! -f "collections/testing/Bola de Fuego.json" ] && echo "File Bola de Fuego does not exist."').toString().trim();
		expect(stdout).to.be.equal("File Bola de Fuego does not exist.")
		execSync(addCard2)
	});

	it('No puedes eliminar una carta que no existe', () => {
		let stdout: string;
		stdout = execSync(removeACardBadID).toString();
		expect(stdout).to.be.equal("Card not found at testing collection!\n");
	});

	it('Puedes actualizar una carta de un usuario', () => {
		let stdout: string;
		stdout = execSync(updateCard).toString();
		expect(stdout).to.be.equal("Card updated!\n");
		stdout = execSync('cat "collections/testing/Bola de Fuego.json"').toString();
		expect(stdout).to.be.equal('{\n  "ID": 2,\n  "Name": "Bola de Fuego",\n  "Mana": 5,\n  "Color": "Rojo",\n  ' + 
															 '"Type": "Conjuro",\n  "Rarity": "Infrecuente",\n  "Text": "Duele bastante.",\n  "Value": 25\n}');
	});

	it('No puedes actualizar una carta que no existe', () => {
		let stdout: string;
		stdout = execSync(updateCardBadID).toString();
		expect(stdout).to.be.equal("Card not found at testing collection!\n");
	});

	it('No puedes actualizar una carta que no es de tipo Criatura con strength', () => {
		let stdout: string;
		stdout = execSync(updateNotCriatureWithStrength).toString();
		expect(stdout).to.be.equal("Strength and resistance are only for Creature cards\nCard not updated!\n");
	});

	it('No puedes actualizar una carta que no es de tipo Criatura con resistance', () => {
		let stdout: string;
		stdout = execSync(updateNotCriatureWithResistance).toString();
		expect(stdout).to.be.equal("Strength and resistance are only for Creature cards\nCard not updated!\n");
	});

	it('No puedes actualizar una carta que no es de tipo Planeswalker con loyalty', () => {
		let stdout: string;
		stdout = execSync(updateNotPlaneswalkerWithLoyalty).toString();
		expect(stdout).to.be.equal("Loyalty is only for Planeswalker cards\nCard not updated!\n");
	});

});