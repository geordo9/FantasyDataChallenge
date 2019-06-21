'use strict';

class Card {
    constructor(suit, rank) {

        this.suit = suit;
        this.rank = rank;

        Object.freeze(this);
    }
}


class Deck {
    constructor() {
        this.deck = [];
        // this way a new deck is automatically suffled when created
        this.reset();
        this.shuffle();
    }

    reset() {
        this.deck = [];

        const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        const ranks = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

        for (let suit in suits) {
            for (let rank in ranks) {
                this.deck.push(new Card(suits[suit], ranks[rank]));
            }
        }

        console.log('A new deck has been created!')
    }

    shuffle() {
        const { deck } = this;
        let m = deck.length, i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            [deck[m], deck[i]] = [deck[i], deck[m]];
        }

        console.log('Deck has been shuffled!');
        return this;
    }

    draw() {
        const drawnCard = this.deck.pop();
        console.log('You drew the ' + drawnCard.rank + ' of ' + drawnCard.suit);
    }

    display() {
        console.log('The cards left in the deck are:')
        for (let x = 0; x < this.deck.length; x++) {
            console.log(this.deck[x].rank + ' of ' + this.deck[x].suit);
        }
    }
}


// readline to have user input with the deck

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const deck1 = new Deck();
console.log(deck1.deck[0].rank + ' of ' + deck1.deck[0].suit);
const map = new Map();
map.set('n', 'New Deck');
map.set('s', 'Shuffle Deck');
map.set('d', 'Draw Card');
map.set('r', 'Show Remaining Cards');
map.set('q', 'Quit');

console.log('Use the following key mappings:')
for (const [key, value] of map.entries()) {
    console.log(`${key} = ${value}`);
}

rl.on('line', (answer) => {
    if (answer === 'n') {
        deck1.reset();
    } if (answer === 's') {
        deck1.shuffle();
    } if (answer === 'd') {
        deck1.draw();
    } if (answer === 'r') {
        deck1.display();
    } if (answer === 'q') {
        rl.close();
    }
});