const character = {
  name: "Snortleblat",
  characterClass: "Swamp Beast Diplomat",
  level: 5,
  health: 100,
  image: "snortleblat.webp",

  attacked() {
    this.health -= 20;
    if (this.health <= 0) {
      this.health = 0;
      this.updateDisplay();
      alert(`${this.name} has died!`);
    } else {
      this.updateDisplay();
    }
  },

  levelUp() {
    this.level += 1;
    this.updateDisplay();
  },

  updateDisplay() {
    document.getElementById("charName").textContent = this.name;
    document.getElementById("charClass").textContent = this.characterClass;
    document.getElementById("charLevel").textContent = this.level;
    document.getElementById("charHealth").textContent = this.health;
  }
};

character.updateDisplay();