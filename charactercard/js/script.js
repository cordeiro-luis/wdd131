// Select the elements
const name = document.querySelector("#name");
const classElement = document.querySelector("#class");
const level = document.querySelector("#level");
const health = document.querySelector("#health");
const image = document.querySelector("#image");
const attackButton = document.querySelector("#attack-button");
const levelUpButton = document.querySelector("#level-up-button");

// Create a character object with properties and methods
const character = {
    name: 'Snortleblat',
    class: 'Swamp Beast Diplomat',
    level: 5,    //initial level value
    health: 60,  //initial health value
    image: 'images/snortleblat.webp',
    alt: 'Snortleblat, a Swamp Beast Diplomat looking out from a misty swamp',
    attacked: function () {
        this.health -= 20
        if (this.health <= 0) {
            this.health = 0;
            alert(`${this.name} is dead!`);
        }
    },
    levelUp: function () {
        this.level++;
    }
};

// Populate the card with the character's information containd in the character object
name.textContent = character.name;
classElement.textContent = character.class;
level.textContent = character.level;
health.textContent = character.health;
image.src = character.image;
image.alt = character.alt;

// Add event listeners to the buttons
attackButton.addEventListener("click", function () {
    character.attacked();
    health.textContent = character.health;
});

levelUpButton.addEventListener("click", function () {
    character.levelUp();
    level.textContent = character.level;
});     