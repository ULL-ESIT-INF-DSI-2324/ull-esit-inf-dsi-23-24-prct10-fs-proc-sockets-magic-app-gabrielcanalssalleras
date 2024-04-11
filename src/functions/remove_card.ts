import fs from "fs";
import chalk from "chalk";
import { Checker } from "../classes/checker.js";

const checker = Checker.getInstance();

/**
 * Elimina una carta de la colección del usuario.
 * @param id - El ID de la carta.
 * @param userCollection - La colección de cartas del usuario.
 */
export function removeCard(
  id: unknown,
  userCollection: string,
  callback: (error: string | undefined, result: string | undefined) => void,
): void {
  const user: string = userCollection.split("/")[1];
  if (!checker.checkIfCardExistsForThisUser("", userCollection, id)) {
    console.log(chalk.red(`Card not found at ${user} collection!`));
    return;
  }
  for (const file of fs.readdirSync(userCollection)) {
    fs.stat(`${userCollection}/${file}`, (err) => {
      if (err)
        callback(
          chalk.red(`Card not found at ${user}'s collection`),
          undefined,
        );
      else {
        fs.unlink(`${userCollection}/${file}`, (err) => {
          if (err) {
            callback(chalk.red(err.message), undefined);
            return;
          } else {
            callback(
              undefined,
              chalk.green(`Card removed from ${user} collection!`),
            );
            return;
          }
        });
      }
    });
  }
}
