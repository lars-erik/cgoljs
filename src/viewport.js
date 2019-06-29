export class ViewPort {
    constructor(camera, window) {
        this.camera = camera;
        this.window = window;
        this.update();
    }

    update() {
        let depth = 0;
        const cameraOffset = this.camera.position.z;
        if (depth < cameraOffset) {
            depth -= cameraOffset;
        } else {
            depth += cameraOffset;
        }
        const vFOV = this.camera.fov * Math.PI / 180;

        this.height = 2 * Math.tan(vFOV / 2) * Math.abs(depth);
        this.width = this.height * this.camera.aspect;
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        this.left = Math.floor(this.camera.position.x - halfWidth);
        this.top = Math.floor(this.camera.position.y + halfHeight);
        this.right = Math.ceil(this.camera.position.x + halfWidth);
        this.bottom = Math.ceil(this.camera.position.y - halfHeight);
    }

    log() {
        console.log(this.window.innerWidth + "x" + this.window.innerHeight + " - " + this.camera.aspect);
        console.log(this);
    }
}