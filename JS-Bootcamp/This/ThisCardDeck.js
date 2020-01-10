function thisPractice() {
    const myDeck = {
        deck: [],
        drawnCards: [],
        suits: ['hearts', 'diamonds', 'spades', 'clubs'],
        values: '2,3,4,5,6,7,8,9,10,J,Q,K,A',
        initializeDeck() {
            //Creates a deck, using the suits and values
            const {suits, values, deck} = this;
            for (let value of values.split(',')) {
                for (let suit of suits) {
                    deck.push({
                        value,
                        suit
                    });
                };
            };
        },
        drawCard(){
            const card = this.deck.pop();
            this.drawnCards.push(card);
            return card;
        },
        drawMultiple(numCards) {
            const cards = [];
            for (let i = 0; i < numCards; i++) {
                cards.push(this.drawCard());
            }
            return cards;
        },
        shuffle() {
            const {deck} = this;
            //Loops over the array backwards
            for (let i = deck.length - 1; i > 0; i--) {
                //Picks a random index before current element
                let j = Math.floor(Math.random() * (i + 1));
                //Swaps the random index with the current one
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
        }
    };
    myDeck.initializeDeck();
    console.table(myDeck.deck);
    myDeck.shuffle();
    console.table(myDeck.deck);
}

thisPractice();