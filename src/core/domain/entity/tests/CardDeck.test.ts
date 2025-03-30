import { describe, it, expect } from 'vitest';
import {Deck} from "@/core/domain/entity/Deck.entity";

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
