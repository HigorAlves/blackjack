import { describe, it, expect, beforeEach } from 'vitest';
import {Player} from "@/core/domain/entity/Player.entity";
import {Card} from "@/core/domain/value-object/Card.vo";

describe('Player', () => {
	let player: Player;

	beforeEach(() => {
		player = new Player();
	});

	it('should start with an empty hand and not standing', () => {
		expect(player.getHand().getCards()).toHaveLength(0);
		expect(player.isStanding()).toBe(false);
	});

	it('should allow hitting and add cards to hand', () => {
		const card = new Card('Hearts', '9');
		player.hit(card);
		expect(player.getHand().getCards()).toHaveLength(1);
		expect(player.getBestScore()).toBe(9);
	});

	it('should allow standing and prevent further hits', () => {
		player.stand();
		expect(player.isStanding()).toBe(true);

		const card = new Card('Clubs', '5');
		expect(() => player.hit(card)).toThrow('Player has already stood and cannot hit');
	});

	it('should detect blackjack with two cards totaling 21', () => {
		const ace = new Card('Spades', 'A');
		const king = new Card('Hearts', 'K');

		player.hit(ace);
		player.hit(king);

		expect(player.hasBlackjack()).toBe(true);
	});

	it('should detect bust if score exceeds 21', () => {
		player.hit(new Card('Hearts', '10'));
		player.hit(new Card('Clubs', '9'));
		player.hit(new Card('Diamonds', '5'));

		expect(player.isBust()).toBe(true);
	});

	it('should not bust with ace counted as 1', () => {
		player.hit(new Card('Hearts', 'A'));
		player.hit(new Card('Spades', '9'));
		player.hit(new Card('Clubs', 'A'));

		expect(player.isBust()).toBe(false);
		expect(player.getBestScore()).toBe(21);
	});

	it('should reset properly', () => {
		player.hit(new Card('Hearts', '10'));
		player.stand();

		player.reset();

		expect(player.getHand().getCards()).toHaveLength(0);
		expect(player.isStanding()).toBe(false);
	});
});
