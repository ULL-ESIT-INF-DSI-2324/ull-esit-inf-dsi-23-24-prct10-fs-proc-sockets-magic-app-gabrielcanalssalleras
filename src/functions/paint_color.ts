import chalk, { BackgroundColorName, ForegroundColorName } from "chalk";

/**
 * Pinta el color de la carta en la consola.
 * @param color - El color de la carta.
 */
export function paintColor(color: string) {
	const rainbowColors: ForegroundColorName[] = ['red', 'yellow', 'green', 'blue', 'magenta', 'white'];
	let rainbowOutput: string = '';
	const letters: string[] = color.split("", color.length);
	switch(color) {
		case "Blanco":
			console.log(chalk.white(`Color: ${color}`));
			break;
		case "Azul":
			console.log(chalk.blue(`Color: ${color}`));
			break;
		case "Verde":
			console.log(chalk.green(`Color: ${color}`));
			break;
		case "Rojo":
			console.log(chalk.red(`Color: ${color}`));
			break;
		case "Negro":
			console.log(chalk.black.bgWhite(`Color: ${color}`));
			break;
		case "Incoloro":
			console.log(chalk.grey(`Color: ${color}`));
			break;
		case "Multicolor":
			letters.forEach((letter, index) => {
				function getColor(): ForegroundColorName | BackgroundColorName {
					return rainbowColors[index % rainbowColors.length];
				}
				rainbowOutput += chalk[getColor()](letter);
			});
			console.log(`Color: ${rainbowOutput}`);
			break;
	}
}
