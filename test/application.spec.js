import { Game } from "../src/game";
import { Application } from "../src/application";
import { expect } from "chai";

describe("app", () => {
    let game, app;

    function createApp(width, height) {
        return new Application({
            innerWidth: width,
            innerHeight: height,
            document: {},
            requestAnimationFrame: () => {},
            addEventListener: () => {}
        }, 
        game,
        {
            noRender: true
        });
    }

    beforeEach(() => {
        game = new Game();
        app = createApp(1024, 768)
    });

    it("has scene", () => {
        app.createScene();
        expect(app.scene).not.to.be.null;
    });

    it("adds cells in viewport to scene", () => {
/*
1024x768 - 1.3333333333333332
38.49001794597505x28.867513459481287

1829x917 - 1.994547437295529
57.57762499170259x28.867513459481287
*/
        app.createScene();

        const points = [
            [-21, 0],
            [-20, 0],
            [20, 0],
            [21, 0],
            [0, -15],
            [0, -14],
            [0, 14],
            [0, 15]
        ];
        
        const expected = [
            [0, -14],
            [-20, 0],
            [20, 0],
            [0, 14]
        ];

        points.forEach(x => game.awaken(x));
        app.update();

        expect(app.scene.children.map(x => [x.position.x, x.position.y])).to.eql(expected);
    });
});