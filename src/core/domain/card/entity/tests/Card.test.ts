import { describe, it, expect } from 'vitest';
import {Card} from "@/core/domain/card/entity/Card.entity";

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
