import { Application } from "./application";
import { Game } from "./game";

let game = new Game();

game.awaken(-18, 0);
game.awaken(-17, 0);
game.awaken(-18, -1);
game.awaken(-17, -1);

game.awaken(-8, 0);
game.awaken(-8, -1);
game.awaken(-8, -2);
game.awaken(-7, 1);
game.awaken(-7, -3);
game.awaken(-6, 2);
game.awaken(-6, -4);
game.awaken(-5, 2);
game.awaken(-5, -4);
game.awaken(-4, -1);
game.awaken(-3, 1);
game.awaken(-3, -3);
game.awaken(-2, 0);
game.awaken(-2, -1);
game.awaken(-2, -2);
game.awaken(-1, -1);

game.awaken(2, 2);
game.awaken(2, 1);
game.awaken(2, 0);
game.awaken(3, 2);
game.awaken(3, 1);
game.awaken(3, 0);
game.awaken(4, 3);
game.awaken(4, -1);

game.awaken(6, 4);
game.awaken(6, 3);
game.awaken(6, -1);
game.awaken(6, -2);

game.awaken(16, 2);
game.awaken(17, 2);
game.awaken(16, 1);
game.awaken(17, 1);

let app = new Application(window, game);
app.createScene();