import goblinImage from "../../img/goblin2.png";
import Character from "./Character";

export default class Board {
    constructor() {
        this.field = [];

        for (let i = 0; i < 16; i++) {
            this.field.push("");
        }

        this.boardContainer = document.querySelector(".board");
        this.character = "x";
    }

    clear() {
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                this.field[i]= "";
            }
        }
    }

    render() {
        this.boardContainer.innerHTML = "";

        for (let i = 0; i < this.field.length; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = this.field[i];
            this.boardContainer.append(cell);

            if (cell.textContent === this.character) {
                cell.textContent = "";

                const goblin = new Character("goblin", goblinImage);
                cell.append(goblin.element);
            }
        }
    }
}
