import { Game } from "../src/game";
import { expect } from "chai";
import { describe, beforeEach, it } from "mocha";

describe("game", () => {

    let game;

    beforeEach(() => {
        game = new Game();
    });

    it("awoke cells are alive", () => {
        game.awaken(0, 0);
        expect(game.isAlive(0, 0)).to.be.true;
    });

    it("alone cells die on tick", () => {
        game.awaken(0, 0);
        game.tick();
        expect(game.isAlive(0, 0)).to.be.false;
    });

    it("block stays alive", () => {
        game.awaken(0, 0);
        game.awaken(1, 0);
        game.awaken(0, 1);
        game.awaken(1, 1);
        game.tick();
        let output = draw(game, 0, 0, 1, 1);
        expect(output).to.equal("XX\nXX\n");
    });

    it("blinker blinks", () => {
        game.awaken(-1, 0);
        game.awaken(0, 0);
        game.awaken(1, 0);
        let output = draw(game, -1, -1, 1, 1);
        expect(output).to.equal("...\nXXX\n...\n");
        game.tick();
        output = draw(game, -1, -1, 1, 1);
        expect(output).to.equal(".X.\n.X.\n.X.\n");
    });

    it("builds bounding box", () => {
        game.awaken(-1, 0);
        game.awaken(0, 0);
        game.awaken(1, 0);
        game.tick();
        expect(game.bounding).to.contain({left:-1,right:1,top:-1,bottom:1});
    });

    function draw(game, left, top, right, bottom) {
        let output = "";
        for(let y = top; y<=bottom; y++) {
            for(let x = left; x<=right; x++) {
                output += game.isAlive(x, y) ? "X" : ".";
            }
            output += "\n";
        }
        return output;
    }

});