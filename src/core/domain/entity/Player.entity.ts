import {Hand} from "@/core/domain/entity/Hand";
import {Card} from "@/core/domain/value-object/Card.vo";

export class Player {
	private hand: Hand = new Hand();
	private standing: boolean = false;

	hit(card: Card): void {
		if (this.standing) {
			throw new Error('Player has already stood and cannot hit');
		}
		this.hand.addCard(card);
	}

	stand(): void {
		this.standing = true;
	}

	isStanding(): boolean {
		return this.standing;
	}

	getHand(): Hand {
		return this.hand;
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

	reset(): void {
		this.hand = new Hand();
		this.standing = false;
	}
}
