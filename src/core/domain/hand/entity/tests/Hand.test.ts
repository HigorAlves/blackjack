import { describe, it, expect } from 'vitest';
import {Hand} from "@/core/domain/hand/entity/Hand";
import {Card} from "@/core/domain/card/entity/Card.entity";

describe('Hand', () => {
	it('should add cards and return them', () => {
		const hand = new Hand();
		const card1 = new Card('Hearts', '5');
		const card2 = new Card('Clubs', 'K');

		hand.addCard(card1);
		hand.addCard(card2);

		const cards = hand.getCards();
		expect(cards.length).toBe(2);
		expect(cards[0].toString()).toBe('5 of Hearts');
		expect(cards[1].toString()).toBe('K of Clubs');
	});

	it('should calculate correct totals without aces', () => {
		const hand = new Hand();
		hand.addCard(new Card('Spades', '9'));
		hand.addCard(new Card('Diamonds', '7'));

		expect(hand.getTotals()).toEqual([16]);
		expect(hand.getBestScore()).toBe(16);
	});

	it('should calculate multiple totals with aces', () => {
		const hand = new Hand();
		hand.addCard(new Card('Hearts', 'A'));
		hand.addCard(new Card('Clubs', '7'));

		expect(hand.getTotals().sort()).toEqual([18, 8]);
		expect(hand.getBestScore()).toBe(18);
	});

	it('should correctly detect bust', () => {
		const hand = new Hand();
		hand.addCard(new Card('Spades', '10'));
		hand.addCard(new Card('Clubs', '9'));
		hand.addCard(new Card('Diamonds', '5'));

		expect(hand.isBust()).toBe(true);
	});

	it('should not detect bust if one total is valid', () => {
		const hand = new Hand();
		hand.addCard(new Card('Hearts', 'A'));
		hand.addCard(new Card('Spades', '9'));
		hand.addCard(new Card('Clubs', 'A'));

		// Totals: 1+9+1=11, 11+9+1=21, etc.
		expect(hand.getTotals()).toContain(21);
		expect(hand.isBust()).toBe(false);
		expect(hand.getBestScore()).toBe(21);
	});

	it('should detect blackjack (2 cards totaling 21)', () => {
		const hand = new Hand();
		hand.addCard(new Card('Hearts', 'A'));
		hand.addCard(new Card('Clubs', 'K'));

		expect(hand.hasBlackjack()).toBe(true);
	});

	it('should not detect blackjack if more than 2 cards total 21', () => {
		const hand = new Hand();
		hand.addCard(new Card('Hearts', '7'));
		hand.addCard(new Card('Diamonds', '7'));
		hand.addCard(new Card('Clubs', '7'));

		expect(hand.getBestScore()).toBe(21);
		expect(hand.hasBlackjack()).toBe(false);
	});
});
