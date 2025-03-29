export type CardSuit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
export type CardValue = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export class Card {
	constructor(
		public readonly suit: CardSuit,
		public readonly value: CardValue
	) {}

	getPoints(): number[] {
		if (this.value === 'A') return [1, 11];
		if (['K', 'Q', 'J'].includes(this.value)) return [10];
		return [parseInt(this.value, 10)];
	}

	toString(): string {
		return `${this.value} of ${this.suit}`;
	}
}
