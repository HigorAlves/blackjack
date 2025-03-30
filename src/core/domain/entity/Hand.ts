import {Card} from "@/core/domain/value-object/Card.vo";

export class Hand {
	private cards: Card[] = [];

	addCard(card: Card) {
		this.cards.push(card);
	}

	getCards(): Card[] {
		return [...this.cards];
	}

	getTotals(): number[] {
		let totals: number[] = [0];

		for (const card of this.cards) {
			const cardPoints = card.getPoints();
			const newTotals: number[] = [];

			for (const total of totals) {
				for (const point of cardPoints) {
					newTotals.push(total + point);
				}
			}

			totals = [...new Set(newTotals)]; // Remove duplicates
		}

		return totals;
	}

	getBestScore(): number {
		const totals = this.getTotals().filter(score => score <= 21);
		return totals.length > 0 ? Math.max(...totals) : Math.min(...this.getTotals());
	}

	isBust(): boolean {
		return this.getTotals().every(score => score > 21);
	}

	hasBlackjack(): boolean {
		return this.cards.length === 2 && this.getBestScore() === 21;
	}

	toString(): string {
		return this.cards.map(card => card.toString()).join(', ');
	}
}
