import fs from "fs";
import { Checker } from "../classes/checker.js";
import chalk from "chalk";

// Obtiene la instancia de la clase Checker
const checker = Checker.getInstance();

/**
 * Actualiza una carta existente en la colección del usuario.
 * @param ID - El ID de la carta.
 * @param userCollection - La colección de cartas del usuario.
 * @param Name - El nuevo nombre de la carta (opcional).
 * @param Mana - El nuevo mana de la carta (opcional).
 * @param Color - El nuevo color de la carta (opcional).
 * @param Type - El nuevo tipo de la carta (opcional).
 * @param Rarity - La nueva rareza de la carta (opcional).
 * @param Strength - La nueva fuerza de la carta (opcional).
 * @param Resistance - La nueva resistencia de la carta (opcional).
 * @param Loyalty - La nueva lealtad de la carta (opcional).
 * @param Text - El nuevo texto de la carta (opcional).
 * @param Value - El nuevo valor de la carta (opcional).
 */
export function updateCard(
  ID: unknown,
  userCollection: string,
  callback: (error: string | undefined, result: string | undefined) => void,
  Name?: unknown,
  Mana?: unknown,
  Color?: unknown,
  Type?: unknown,
  Rarity?: unknown,
  Strength?: unknown,
  Resistance?: unknown,
  Loyalty?: unknown,
  Text?: unknown,
  Value?: unknown,
): void {
  let name: string | undefined;
  if (!checker.checkIfCardExistsForThisUser("", userCollection, ID)) {
    console.log(
      chalk.red(
        `Card not found at ${userCollection.split("/")[1]} collection!`,
      ),
    );
    callback(
      `Card not found at ${userCollection.split("/")[1]} collection!`,
      undefined,
    );
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
						fs.readFile(`${userCollection}/${file}`, (err, data) => {
							if (err) {
								callback(err.message, undefined);
                return;
              }
              if (JSON.parse(data.toString()).ID == ID) {
								const card = JSON.parse(fs.readFileSync(`${userCollection}/${file}`).toString());
								if (Name) card!.Name = Name;
								if (Mana && checker.checkMana(Mana)) card!.Mana = Mana;
								if (Color && checker.checkColor(Color)) card!.Color = Color;
								if (Type && checker.checkType(Type)) card!.Type = Type;
								if (Rarity && checker.checkRarity(Rarity)) card!.Rarity = Rarity;
								if (Strength) card!.Strength = Strength;
								if (Resistance) card!.Resistance = Resistance;
								if (Loyalty) card!.Loyalty = Loyalty;
								if (Text) card!.Text = Text;
								if (Value) card!.Value = Value;
								if (
								  !checker.checkLoyalty(card!.Type, card!.Loyalty) ||
								  !checker.checkStrRes(card!.Type, card!.Strength, card!.Resistance)
								) {
								  console.log(chalk.red("Card not updated!"));
								  return;
								}
			
								if (Name) {
								  fs.rename(
								    `${userCollection}/${name!}.json`,
								    `${userCollection}/${Name}.json`,
								    (err) => {
								      if (err) {
								        callback(chalk.red(err.message), undefined);
								      } else {
								        callback(
								          undefined,
								          chalk.green(`File renamed from ${name!} to ${Name}`),
								        );
								      }
								    },
								  );
								  name = Name as string;
								} else name = card!.Name;
	
								fs.writeFile(
								  `${userCollection}/${name!}.json`,
								  JSON.stringify(
								    {
								      ID: card!.ID,
								      Name: card!.Name,
								      Mana: card!.Mana,
								      Color: card!.Color,
								      Type: card!.Type,
								      Rarity: card!.Rarity,
								      Strength: card!.Strength,
								      Resistance: card!.Resistance,
								      Loyalty: card!.Loyalty,
								      Text: card!.Text,
								      Value: card!.Value,
								    },
								    null,
								    2,
								  ),
								  (err) => {
								    if (err) {
								      callback(chalk.red(err.message), undefined);
											return;
								    } else {
								      callback(undefined, chalk.green(`Card updated!`));
											return;
								    }
								  },
								);
              }
            });
          }
        }
      });
    }
  });
}
