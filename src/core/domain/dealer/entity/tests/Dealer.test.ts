import { describe, it, expect, beforeEach } from 'vitest';
import {Deck} from "@/core/domain/deck/entity/Deck.entity";
import {Dealer} from "@/core/domain/dealer/entity/Dealer.entity";

describe('Dealer', () => {
	let deck: Deck;
	let dealer: Dealer;

	beforeEach(() => {
		deck = new Deck();
		dealer = new Dealer();
	});

	it('should initially have an empty hand', () => {
		expect(dealer.getHand().getCards()).toHaveLength(0);
	});

	it('should play and draw cards until reaching 17 or higher', () => {
		dealer.play(deck);

		const score = dealer.getBestScore();
		expect(score).toBeGreaterThanOrEqual(17);
		expect(score).toBeLessThanOrEqual(23);
	});

	it('should not draw again if already played', () => {
		dealer.play(deck);
		const firstScore = dealer.getBestScore();

		// Forcefully lower deck to check if play() runs again
		deck.draw = () => {
			throw new Error('Should not draw again');
		};

		dealer.play(deck); // should do nothing
		expect(dealer.getBestScore()).toBe(firstScore);
	});

	it('should reveal first visible card', () => {
		dealer.play(deck);
		const visible = dealer.getVisibleCard();
		expect(visible).not.toBeNull();
		expect(visible?.toString()).toMatch(/of/);
	});

	it('should detect blackjack if first two cards total 21', () => {
		const mockDeck = new Deck();
		mockDeck['cards'] = [
			{ getPoints: () => [11], toString: () => 'A of Spades' } as never,
			{ getPoints: () => [10], toString: () => 'K of Clubs' } as never,
		];

		const blackjackDealer = new Dealer();
		blackjackDealer.play(mockDeck);

		expect(blackjackDealer.hasBlackjack()).toBe(true);
	});

	it('should reset correctly', () => {
		dealer.play(deck);
		expect(dealer.getHand().getCards().length).toBeGreaterThan(0);

		dealer.reset();
		expect(dealer.getHand().getCards()).toHaveLength(0);
	});

	it('should detect bust if dealer goes over 21', () => {
		const mockDeck = new Deck();
		mockDeck['cards'] = [
			{ getPoints: () => [10], toString: () => '10 of Spades' } as never,
			{ getPoints: () => [10], toString: () => 'K of Hearts' } as never,
			{ getPoints: () => [5], toString: () => '5 of Clubs' } as never,
		];

		const bustDealer = new Dealer();
		bustDealer.play(mockDeck);

		expect(bustDealer.isBust()).toBe(true);
	});
});
