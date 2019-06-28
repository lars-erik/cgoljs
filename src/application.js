import * as THREE from "three";

export class Application {
    constructor(window, game, options) {
        this.game = game;
        this.window = window;
        this.options = options || {};
    }

    createCell() {
        return this.mesh.clone(false);
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, this.window.innerWidth / this.window.innerHeight, 1, 2000);
        this.camera.position.z = 20;
    
        this.camera.position.z = 25;

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
        while(this.scene.children.length > 0){ 
            this.scene.remove(this.scene.children[0]);
        }

        let bbox = {left:-50,top:-50,right:50,bottom:50};
        for(let yi = bbox.top; yi <= bbox.bottom; yi++) {
            for(let xi = bbox.left; xi <= bbox.right; xi++) {
                let y = yi.toString(), x = xi.toString();
                if (this.game.isAlive(x, y)) {
                    let cell = this.createCell();
                    cell.position.set(xi, yi, 0);
                    this.scene.add(cell);
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