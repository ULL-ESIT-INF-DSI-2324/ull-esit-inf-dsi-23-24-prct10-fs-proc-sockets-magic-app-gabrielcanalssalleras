import fs from "fs";
import { paintColor } from "./paint_color.js";

/**
 * Lista las cartas en la colección del usuario.
 * @param userCollection - La colección de cartas del usuario.
 */
export function ListCards(
  userCollection: string,
  callback: (error: string | undefined, result: string | undefined) => void,
): void {
  const user: string = userCollection.split("/")[1];
  console.log(`${user}'s collection`);
  fs.stat(userCollection, (err) => {
    if (err) {
      callback(`Collection not found!`, undefined);
      return;
    } else {
      fs.readdir(userCollection, (err, files) => {
        if (err) {
          callback(err.message, undefined);
          return;
        } else {
          for (const file of files) {
            let card;
            fs.readFile(`${userCollection}/${file}`, (err, data) => {
              if (err) {
                callback(err.message, undefined);
                return;
              }
              console.log(`----------------------------`);
              card = JSON.parse(data.toString());
							for (const key in card!) {
								if (key !== "Color") console.log(`${key}: ${card[key]}`);
								else paintColor(card[key]);
							}
              callback(undefined, `Collection listed!`);
              return;
						});
          }
        }
      });
    }
  });
}
