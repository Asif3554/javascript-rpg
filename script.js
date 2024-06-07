let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterStats = document.querySelector("#monsterStats");

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 25
    },
    {
        name: "spear",
        power: 60
    },
    {
        name: "sword",
        power: 100
    }
]

const monsters = [
    {
        name: "Goblin",
        level: 2,
        health: 25
    },
    {
        name: "Orc Warlord",
        level: 9,
        health: 75
    },
    {
        name: "Acnologia",
        level: 20,
        health: 500
    },
];

const locations = [
    {
        name: "town square",
        "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You're back in the town square. To your left, you see a store where goods and weapons can be bought. To your right, you see a path leading to a cave where folks say dangerous creatures lurk. Going here can help strengthen you as well as get you gold. Straight ahead you see the path leading to Acnologia, the dragon you are destined to slay. What will you do?"
    },
    {
        name: "store",
        "button text": ["Buy Potion (10 Gold)", "Buy Weapon", "Go To Town Square"],
        "button functions": [buyPotion, buyWeapon, goTown],
        text: "You enter the store. You see an old woman wearing a cloak presenting you five items. A potion to restore 20 HP, a stick, a dagger, a spear and a sword. If you are done shopping, head back to the town square for the next steps of your preparation, young warrior!"
    },
    {
        name: "cave",
        "button text": ["Fight Goblin", "Fight Orc Warlord", "Go To Town Square"],
        "button functions": [fightGoblin, fightOrc, goTown],
        text: "You enter the cave. You see two diving paths. According to fellow adventurers, the left path leads to a horde of goblins. The right path leads to a room with an Orc Warlord waiting for its prey. Behind you is the entrance to the town square. Where will you go?"
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown]
    },
    {
        name: "kill monster",
        "button text": ["Go To Town Square", "Go To Town Square", "Go To Town Square"],
        "button functions": [goTown, goTown, easterEgg],
        text: "You slayed the monster. You gain experience points and find gold."
    },
    {
        name: "lose",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "You're a failure at a warrior."
    },
    {
        name: "win",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "You're a winner."
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go To Town Square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secrete game. Pick a number above. Ten random numbers will be chose. If the nunber you choose matches, you win."
    }
    
]

//Button Functions

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goTown(){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function buyPotion(){
    if(gold >= 10){
        gold -= 10;
        health += 20;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else{
        text.innerText = "Old Lady: Sorry young one, but it seems you do not have enough gold. Might I suggest going to the cave and defeating some monsters?"
    }
}

function buyWeapon(){
    if (currentWeapon < weapons.length - 1){
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You have a weapon: " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory + " ";
        } else {
            text.innerText = "Not enough gold, lol";
        }
    } else {
        text.innerText = "Already got the master sword mah boi";
        button2.innerText = "Sell Weapon for 30 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
    if(inventory.length > 1){
        gold += 30;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a: " + weapons + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "You gon fight barehanded bruh?";
    }
}

function goCave(){
    update(locations[2]);
}

function fightGoblin(){
    fighting = 0;
    goSlay();
}

function fightOrc(){
    fighting = 1;
    goSlay();
}

function fightDragon(){
    fighting = 2;
    goSlay();
}

function goSlay(){
    update(locations[3]);
    text.innerText = "A " + monsters[fighting].name + " attacks!";
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack(){
    text.innerText = "A " + monsters[fighting].name + " attacks!";
    text.innerText += " You attack the " + monsters[fighting].name + " with your " + weapons[currentWeapon].name + "!";
    if (isMonsterHit()){
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
        text.innerText = "You miss";
    }
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0){
        healthText.innerText = 0;
        gameOver();
    } else if(monsterHealth <= 0){
        fighting === 2 ? winGame() : defeatMonster();
    }

    if(Math.random() <= .1 && inventory.length !== 1){
        text.innerText += "Your " + inventory.pop() + " broke!";
        currentWeapon--;
    }
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}

function isMonsterHit(){
    return Math.random() > .1 || health < 20;
}

function dodge(){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function gameOver(){
update(locations[5]);
}

function winGame(){
update(locations[6]);
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    goldText.innerText = gold;
    healthText.innerText = health;
    xp.innerText = xp;
    goTown();
}

function easterEgg(){
    update(locations[7]);
}

function pickTwo(){
    pick(2);
}

function pickEight(){
    pick(8);
}

function pick(guess){
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11))
    }

    text.innerText = "You picked " + guess + ". Here are the random numbers: \n"; 
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.indexOf(guess) !== -1) {
        text.innerText = "You're correct! You won 20 gold!";
        gold += 20;
        gold.innerText = gold;
    } else{
        text.innerText = "Wrong! You lost 10 health!"
        health -= 10;
        healthText.innerText = health;
        if(health <= 0){}
        gameOver();
    }
}