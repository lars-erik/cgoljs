import * as THREE from "three";
import { ViewPort } from "./viewport";
import { CameraControl } from "./cameracontrol";

const home = " ";

export class Application {
    constructor(window, game, options) {
        this.game = game;
        this.window = window;
        this.options = options || {};
        this.cameraControl = new CameraControl();

        this.window.addEventListener("keydown", e => {
            this.handleKey(e.key);
        });
        
        this.window.addEventListener("keyup", e => {
            this.handleKeyUp(e.key);
        });
                
        this.window.addEventListener("wheel", e => {
            let zoomAmount = .5;
            if (e.deltaY < 0) {
                zoomAmount *= -1;
            }
            this.camera.position.z = Math.min(Math.max(this.camera.position.z + zoomAmount, 5), 200);
            console.log(this.camera.position.z);
        });
    }

    handleKey(key) {
        if (key === home) {
            this.camera.position.set(0, 0, this.camera.position.z);
            return;
        }

        this.cameraControl.addDirection(key);
    }

    handleKeyUp(key) {
        this.cameraControl.removeDirection(key);
    }

    createCell(x, y) {
        const cell = this.mesh.clone(false);
        cell.position.set(x, y, 0);
        return cell;
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, this.window.innerWidth / this.window.innerHeight, 1, 2000);
        this.camera.position.z = 25;

        this.viewPort = new ViewPort(this.camera, this.window);

        let geometry = new THREE.BoxGeometry( .95, .95, .1 );
        let material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        this.mesh = new THREE.Mesh(geometry, material);

        if (!this.options.noRender) {
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(this.window.innerWidth, this.window.innerHeight);
            document.body.appendChild(this.renderer.domElement);
        }

        this.render();
    }
   
    update() {
        this.viewPort.update();
        this.cameraControl.update();

        this.camera.position.add(this.cameraControl.vector);

        while(this.scene.children.length > 0){ 
            this.scene.remove(this.scene.children[0]);
        }

        let bbox = this.viewPort;
        for(let y = bbox.bottom; y <= bbox.top; y++) {
            for(let x = bbox.left; x <= bbox.right; x++) {
                if (this.game.isAlive(x, y)) {
                    this.scene.add(this.createCell(x, y));
                }
            }
        }
    }

    render() {
        this.game.tick();
        this.update();
        
        if (!this.options.noRender) {
            this.renderer.render(this.scene, this.camera);
        }

        this.window.requestAnimationFrame(() => {
            this.render();
        });
    }
}