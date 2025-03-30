import {Card, CardSuit, CardValue} from "@/core/domain/deck/value-object/card/Card.vo";

export class Deck {
	private cards: Card[] = [];

	constructor() {
		this.initializeDeck();
		this.shuffle();
	}

	private initializeDeck() {
		const suits: CardSuit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
		const values: CardValue[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.cards = suits.flatMap(suit =>
			values.map(value => new Card(suit, value))
		);
	}

	private shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	draw(): Card {
		if (this.cards.length === 0) {
			throw new Error('Deck is empty');
		}
		return this.cards.pop()!;
	}

	cardsLeft(): number {
		return this.cards.length;
	}
}
