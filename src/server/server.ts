import { EventSocket } from "../functions/event.js";
import net from "net";
import { newCard } from "../functions/new_card.js";
import { updateCard } from "../functions/update_card.js";
import { removeCard } from "../functions/remove_card.js";
import { ListCards } from "../functions/list_cards.js";
import { getCard } from "../functions/get_card.js";
import { paintColor } from "../functions/paint_color.js";

net
  .createServer((connection) => {
    console.log("A client has connected.");
    const serverSocket = new EventSocket(connection);

    serverSocket.on("close", () => {
      console.log("A client has disconnected.\n");
    });

    serverSocket.on("request", (request, connection) => {
      console.log("Received request: ", request.action);
      switch (request.action) {
        case "add":
          newCard(
            request.card.id,
            request.card.name,
            request.user,
            request.card.mana,
            request.card.color,
            request.card.type,
            request.card.rarity,
            request.card.strRes,
            request.card.loyalty,
            request.card.rules,
            request.card.value,
            request.userCollection,
            (error, result) => {
              if (error) {
                connection.write(
                  JSON.stringify({ status: "Error", answer: error }),
                );
              } else {
                console.log(result);
                connection.write(
                  JSON.stringify({ status: "Success", answer: result }),
                );
              }
              connection.end();
            },
          );
          break;
        case "update":
          updateCard(
            request.card.id,
            request.userCollection,
            (error, result) => {
              if (error) {
                connection.write(
                  JSON.stringify({ status: "Error", answer: error }),
                );
                console.log(error);
              } else {
                connection.write(
                  JSON.stringify({ status: "Success", answer: result }),
                );
                console.log(result);
              }
              connection.end();
            },
            request.card.name,
            request.card.mana,
            request.card.color,
            request.card.type,
            request.card.rarity,
            request.card.strRes[0],
            request.card.strRes[1],
            request.card.loyalty,
            request.card.rules,
            request.card.value,
          );
          break;
        case "remove":
          removeCard(
            request.cardID,
            request.userCollection,
            (error, result) => {
              if (error) {
                connection.write(
                  JSON.stringify({ status: "Error", answer: error }),
                  console.log(error),
                );
              } else {
                connection.write(
                  JSON.stringify({ status: "Success", answer: result }),
                  console.log(result)
                );
              }
              connection.end();
            },
          );
          break;
        case "read":
          getCard(request.cardID, request.userCollection, (error, result) => {
            if (error) {
              connection.write(
                JSON.stringify({ status: "Error", answer: error }),
              );
            } else {
              const card = JSON.parse(result!);
              for (const key in card!) {
                if (key !== "Color") console.log(`${key}: ${card[key]}`);
                else paintColor(card[key]);
              }
              connection.write(
                JSON.stringify({ status: "CardReceived", answer: result }),
              );
            }
            connection.end();
          });
          break;
        case "list":
          ListCards(request.userCollection, (error, result) => {
            if (error) {
              connection.write(
                JSON.stringify({ status: "Error", answer: error }),
                console.log(result),
              );
            } else {
              connection.write(
                JSON.stringify({ status: "CardsReceived", answer: result }),
                console.log(result),
              );
            }
            connection.end();
          });
          break;
        default:
          connection.write(console.log("Invalid action"));
          connection.end();
      }
    });
  })
  .listen(60300, () => {
    console.log("Waiting for clients to connect.");
  });
