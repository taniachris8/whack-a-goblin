export default class Character { 
    constructor(name, src) {
        this.name = name;
        this.src = src;
        this.element = this.createCharacter();
    } 

    createCharacter() {
        const img = document.createElement("img");
        img.alt = "x";
        img.classList.add("character");
        img.src = this.src;
        
        return img;
    }
}