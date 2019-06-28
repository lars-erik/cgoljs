import { Game } from "../src/game";
import { Application } from "../src/application";
import { expect } from "chai";

describe("app", () => {
    let game, app;

    beforeEach(() => {
        game = new Game();
        app = new Application({
            innerWidth: 1024,
            innerHeight: 728,
            document: {},
            requestAnimationFrame: () => {}
        }, 
        game,
        {
            noRender: true
        });
    });

    it("has scene", () => {
        app.createScene();
        expect(app.scene).not.to.be.null;
    });
});