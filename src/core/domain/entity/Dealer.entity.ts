import {Hand} from "@/core/domain/entity/Hand";
import {Deck} from "@/core/domain/entity/Deck.entity";
import {Card} from "@/core/domain/value-object/Card.vo";

export class Dealer {
	private hand: Hand = new Hand();
	private hasPlayed: boolean = false;

	getHand(): Hand {
		return this.hand;
	}

	getVisibleCard(): Card | null {
		const cards = this.hand.getCards();
		return cards.length > 0 ? cards[0] : null;
	}

	play(deck: Deck): void {
		if (this.hasPlayed) return;

		while (this.hand.getBestScore() < 17 && !this.hand.isBust()) {
			const card = deck.draw();
			this.hand.addCard(card);
		}

		this.hasPlayed = true;
	}

	reset(): void {
		this.hand = new Hand();
		this.hasPlayed = false;
	}

	hasBlackjack(): boolean {
		return this.hand.hasBlackjack();
	}

	isBust(): boolean {
		return this.hand.isBust();
	}

	getBestScore(): number {
		return this.hand.getBestScore();
	}

	toString(): string {
		return this.hand.toString();
	}
}
