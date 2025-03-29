import { describe, it, expect } from 'vitest';
import {Card} from "@/core/domain/Card";
import {Deck} from "@/core/domain/Deck";

describe('Card', () => {
	it('should return correct points for number cards', () => {
		const card = new Card('Hearts', '7');
		expect(card.getPoints()).toEqual([7]);
	});

	it('should return correct points for face cards', () => {
		const card = new Card('Spades', 'K');
		expect(card.getPoints()).toEqual([10]);
	});

	it('should return both point values for an Ace', () => {
		const card = new Card('Diamonds', 'A');
		expect(card.getPoints()).toEqual([1, 11]);
	});

	it('should display the card as a string', () => {
		const card = new Card('Clubs', 'Q');
		expect(card.toString()).toBe('Q of Clubs');
	});
});

describe('Deck', () => {
	it('should initialize with 52 cards', () => {
		const deck = new Deck();
		expect(deck.cardsLeft()).toBe(52);
	});

	it('should draw a card and reduce the deck size', () => {
		const deck = new Deck();
		const initialSize = deck.cardsLeft();
		const card = deck.draw();
		expect(card).toBeDefined();
		expect(deck.cardsLeft()).toBe(initialSize - 1);
	});

	it('should throw an error if drawing from an empty deck', () => {
		const deck = new Deck();
		for (let i = 0; i < 52; i++) {
			deck.draw();
		}
		expect(() => deck.draw()).toThrowError('Deck is empty');
	});
});
