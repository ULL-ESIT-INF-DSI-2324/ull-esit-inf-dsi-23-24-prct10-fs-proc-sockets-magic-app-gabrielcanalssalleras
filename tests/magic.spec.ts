import { expect } from "chai";
import "mocha";
import { execSync } from "child_process";
import { newCard } from "../src/functions/new_card.js";
import { updateCard } from "../src/functions/update_card.js";
import { getCard } from '../src/functions/get_card.js';
import { ListCards } from '../src/functions/list_cards.js';

const enum Colors {
  White = "\x1b[37m",
  Blue = "\x1b[34m",
  Black = "\x1b[30m",
  Red = "\x1b[31m",
  Green = "\x1b[32m",
  EOS = "\u001b[39m",
}

describe("Magic cards", () => {
  const user = "testing";
  const collection = `collections/${user}`;

  before(() => {
    execSync("rm -rf collections/testing/*");
  });

  const card = {
    ID: 23,
    Name: "Electromante trasgo",
    Mana: 2,
    Color: "Multicolor",
    Type: "Criatura",
    Rarity: "Comun",
    Strength: 2,
    Resistance: 2,
    Text: "Arrollar. Vuela.",
    Value: 1,
  };

  describe("Adding a Card", () => {
    it("Adds a card to a user collection", (done) => {
      newCard(
        card.ID,
        card.Name,
        user,
        card.Mana,
        card.Color,
        card.Type,
        card.Rarity,
        [card.Strength, card.Resistance],
        undefined,
        card.Text,
        card.Value,
        collection,
        (error, result) => {
          expect(error).to.be.undefined;
          expect(result).to.be.equal(
            Colors.Green + `Card added to ${user} collection!` + Colors.EOS,
          );
          done();
        },
      );
    });

    it("Cannot add the same card twice", (done) => {
      newCard(
        card.ID,
        card.Name,
        user,
        card.Mana,
        card.Color,
        card.Type,
        card.Rarity,
        [card.Strength, card.Resistance],
        undefined,
        card.Text,
        card.Value,
        collection,
        (error, result) => {
          expect(error).to.equal(`Card already exists at ${user} collection!`);
          expect(result).to.be.undefined;
          done();
        },
      );
    });
  });

  describe("Updating a Card", () => {
    it("You can update a users card", (done) => {
      updateCard(
        card.ID,
        collection,
        (error, result) => {
          expect(error).to.be.undefined;
          expect(result).to.equal(Colors.Green + `Card updated!` + Colors.EOS);
          done();
        },
        undefined,
        undefined,
        "Green",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
    });

    it ("You can't update a card that doesn't exist", (done) => {
      updateCard(
        316,
        collection,
        (error, result) => {
          expect(error).to.equal(`Card not found at ${user} collection!`);
          expect(result).to.be.undefined;
          done();
        },
        undefined,
        undefined,
        "Green",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
    });
  });

  
  describe("Reading a Card", () => {
    it("You can read a card from a users collection", (done) => {
      const cardID = 23;
      getCard(cardID, collection, (error, result) => {
        expect(error).to.be.undefined;
        expect(JSON.parse(result!)).to.eql(card);
        done();
      });
    });
  
    it("You can't read a card that doesn't exist", (done) => {
      const cardID = 316;
      getCard(cardID, collection, (error, result) => {
        expect(error).to.equal(`Card not found at ${user} collection!`);
        expect(result).to.be.undefined;
        done();
      });
    });
  });
  
  describe("Listing a Collection", () => {
    it("You can list a users collection", (done) => {
      ListCards(collection, (error, result) => {
        expect(error).to.be.undefined;
        expect(result).to.equal("Collection listed!");
        done();
      });
    });

    it("You can't list a collection that doesn't exist", (done) => {
      ListCards("collections/unknown", (error, result) => {
        expect(error).to.equal("Collection not found!");
        expect(result).to.be.undefined;
        done();
      });
    });
  });
});