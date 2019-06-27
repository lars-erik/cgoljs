import { Application } from "../src/application";
import { expect } from "chai";

describe("app", () => {
    it("is alive", () => {
        let app = new Application({
            innerWidth: 1024,
            innerHeight: 728,
            document: {},
            requestAnimationFrame: () => {}
        }, {
            noRender: true
        });
        app.createScene();
        expect(app).not.to.be.null;
    });
});