import fs from "fs";
import { Checker } from "../classes/checker.js";
import chalk from "chalk";

const checker = Checker.getInstance();

/**
 * Obtiene una carta específica de la colección del usuario.
 * @param id - El ID de la carta.
 * @param userCollection - La colección de cartas del usuario.
 * @returns La carta si se encuentra, de lo contrario muestra un mensaje de error.
 */
export function getCard(
  id: unknown,
  userCollection: string,
  callback: (error: string | undefined, result: string | undefined) => void,
): void {
	
	if (
		!checker.checkIfCardExistsForThisUser(
			"",
			userCollection,
			id,
		)
	) {
		console.log(
			chalk.red(`Card not found at ${userCollection.split("/")[1]} collection!`),
		);
		callback(`Card not found at ${userCollection.split("/")[1]} collection!`, undefined);
	}

  fs.stat(userCollection, (err) => {
    if (err) {
			console.log(err.message);
      callback(`Card not found!`, undefined);
    } else {
      fs.readdir(userCollection, (err, files) => {
        if (err) {
          callback(err.message, undefined);
        } else {
          for (const file of files) {
            let card;
            fs.readFile(`${userCollection}/${file}`, (err, data) => {
              if (err) {
                callback(err.message, undefined);
                return;
              }
              card = JSON.parse(data.toString());
              if (card.ID === id) {
								callback(undefined, data.toString());
								return;	
              }
            });
          }
        }
      });
    }
  });
}
