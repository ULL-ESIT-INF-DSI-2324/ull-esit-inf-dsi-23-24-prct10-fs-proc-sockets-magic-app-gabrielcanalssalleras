import fs from "fs";
import { Checker } from "../classes/checker.js";
import chalk from "chalk";

// Obtiene la instancia de la clase Checker
const checker = Checker.getInstance();

/**
 * Crea una nueva carta y la añade a la colección del usuario.
 * @param ID - El ID de la carta.
 * @param Name - El nombre de la carta.
 * @param User - El usuario.
 * @param Mana - El mana de la carta.
 * @param Color - El color de la carta.
 * @param Type - El tipo de la carta.
 * @param Rarity - La rareza de la carta.
 * @param Strres - La fuerza y resistencia de la carta.
 * @param Loyalty - La lealtad de la carta.
 * @param Text - El texto de la carta.
 * @param Value - El valor de la carta.
 * @param userCollection - La colección de cartas del usuario.
 */
export function newCard(
  ID: unknown,
  Name: unknown,
  User: unknown,
  Mana: unknown,
  Color: unknown,
  Type: unknown,
  Rarity: unknown,
  Strres: unknown[],
  Loyalty: unknown,
  Text: unknown,
  Value: unknown,
  userCollection: unknown,
  callback: (error: string | undefined, result: string | undefined) => void,
): void {
  if (
    !checker.checkLoyalty(Type, Loyalty) ||
    !checker.checkStrRes(Type, Strres[0], Strres[1])
  ) {
    console.log(chalk.red(`Card not added to ${User} collection!`));
    callback(chalk.red(`Card not added to ${User} collection!`), undefined);
    return;
  }
  if (
    checker.checkIfCardExistsForThisUser(Name, userCollection as string, ID)
  ) {
    console.log(chalk.red(`Card already exists at ${User} collection!`));
    callback(`Card already exists at ${User} collection!`, undefined);
    return;
  }
  
  fs.stat(`${userCollection}/${Name}.json`, (err) => {
    if (
      err ||
      !(
        checker.checkId(ID, userCollection) &&
        checker.checkMana(Mana) &&
        checker.checkColor(Color) &&
        checker.checkType(Type) &&
        checker.checkRarity(Rarity)
      )
    ) {
      fs.writeFile(
        `${userCollection}/${Name}.json`,
        JSON.stringify(
          {
            ID,
            Name,
            Mana,
            Color,
            Type,
            Rarity,
            Strength: Strres[0],
            Resistance: Strres[1],
            Loyalty,
            Text,
            Value,
          },
          null,
          2,
        ),
        (err) => {
          if (err) {
            callback(chalk.red(err.message), undefined);
          } else {
            callback(
              undefined,
              chalk.green(`Card added to ${User} collection!`),
            );
          }
        },
      );
    } else {
      callback(chalk.red(`Card not added to ${User} collection!`), undefined);
    }
  });
}
