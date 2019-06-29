import * as THREE from "three";
import { expect } from "chai";
import { CameraControl } from "../src/cameracontrol";

describe("camera control", () => {
    let controller;

    beforeEach(() => {
        controller = new CameraControl();
    });

    it("increases speed per tick while arrow key is down", () => {
        controller.addDirection("ArrowRight");
        for(let i = 0; i<10; i++) {
            controller.update();

            let expected = [round((i+1)/10), 0, 0];
            const speed = [round(controller.vector.toArray()[0]), 0, 0];

            expect(speed).to.eql(expected);
        }
    });
    
    it("stops increasing at max speed", () => {
        controller.addDirection("ArrowRight");
        for(let i = 0; i<11; i++) {
            controller.update();
        }
        expect(controller.vector.toArray()).to.eql([1, 0, 0]);
    });

    it("decreases speed per tick while no key is down", () => {
        controller.addDirection("ArrowRight");
        controller.removeDirection("ArrowRight");
        controller.speed = 1;

        for(let i = 0; i<10; i++) {
            controller.update();

            let expected = [round(1-((i+1)/10)), 0, 0];
            const speed = [round(controller.vector.toArray()[0]), 0, 0];

            expect(speed).to.eql(expected);
        }
    });

    it("stops decreasing at zero speed", () => {
        for(let i = 0; i<11; i++) {
            controller.update();
        }
        expect(controller.vector.toArray()[0]).to.eql(0);
    })

    it("points in direction of two last arrows being pressed", () => {
        controller.addDirection("ArrowDown");
        controller.addDirection("ArrowRight");
        controller.addDirection("ArrowUp");
        controller.update();
        let vector = roundVector(controller.vector);

        expect(vector.toArray()).to.eql([.1, .1, 0]);
    });

    function round(num) {
        return Math.round(num * 10) / 10;
    }

    function roundVector(vector) {
        return new THREE.Vector3(round(vector.x), round(vector.y), round(vector.z))
    }

});