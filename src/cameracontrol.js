import * as THREE from "three";

const directions = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight"
]

const opposites = {
    "ArrowUp": "ArrowDown",
    "ArrowDown": "ArrowUp",
    "ArrowLeft": "ArrowRight",
    "ArrowRight": "ArrowLeft"
};

const translates = {
    "w": "ArrowUp",
    "a": "ArrowLeft",
    "s": "ArrowDown",
    "d": "ArrowRight"
}

const vectors = {
    "ArrowUp": new THREE.Vector3(0, 1, 0),
    "ArrowDown": new THREE.Vector3(0, -1, 0),
    "ArrowLeft": new THREE.Vector3(-1, 0, 0),
    "ArrowRight": new THREE.Vector3(1, 0, 0),
};

function translate(key) {
    if (translates[key]) {
        return translates[key];
    }
    return key;
}

export class CameraControl {

    constructor() {
        this.speed = 0;
        this.maxSpeed = 1;
        this.keyDown = false;
        this.direction = new THREE.Vector3();
        this.vector = new THREE.Vector3();

        this.heldDirections = {
            "ArrowUp": false,
            "ArrowDown": false,
            "ArrowLeft": false,
            "ArrowRight": false
        };
    }

    toggle(direction) {
        this.heldDirections[direction] = true;
        this.heldDirections[opposites[direction]] = false;
               
        this.direction.set(0, 0, 0);
        directions.forEach(dir => {
            if (this.heldDirections[dir]) {
                this.direction.add(vectors[dir]);
            }
        });
    }

    update() {
        if (this.keyDown) {
            this.speed = Math.min(1, this.speed + .1);
        }
        else {
            this.speed = Math.max(0, this.speed - .1);
        }
 
        this.vector.set(this.direction.x, this.direction.y, 0);
        this.vector.multiplyScalar(this.speed);
    }

    addDirection(direction) {
        direction = translate(direction);

        if (!directions.includes(direction)) {
            return;
        }

        this.keyDown = true;
        this.toggle(direction);
    }

    removeDirection(direction) {
        direction = translate(direction);

        if (!directions.includes(direction)) {
            return;
        }

        this.heldDirections[direction] = false;
        let anyDown = false;
        directions.forEach(x => {
            if (this.heldDirections[x]) {
                anyDown = true;
            }
        });
        this.keyDown = anyDown;
    }

}