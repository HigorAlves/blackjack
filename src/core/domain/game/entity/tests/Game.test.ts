import { describe, it, expect, beforeEach } from 'vitest';
import {Game} from "@/core/domain/game/entity/Game.entity";

describe('Game', () => {
	let game: Game;

	beforeEach(() => {
		game = new Game();
		game.start();
	});

	it('should start the game and deal 2 cards to player and dealer', () => {
		expect(game.getPlayer().getHand().getCards()).toHaveLength(2);
		expect(game.getDealer().getHand().getCards()).toHaveLength(2);
		expect(game.getStatus()).toBe('in_progress');
	});

	it('should allow the player to hit', () => {
		const initialLength = game.getPlayer().getHand().getCards().length;
		game.playerHit();

		const newLength = game.getPlayer().getHand().getCards().length;
		expect(newLength).toBeGreaterThan(initialLength);
	});

	it('should mark game as finished if player busts', () => {
		const player = game.getPlayer();

		// Force a bust manually
		player.hit({ getPoints: () => [10], toString: () => '10 of Spades' } as never);
		player.hit({ getPoints: () => [10], toString: () => '10 of Hearts' } as never);
		player.hit({ getPoints: () => [10], toString: () => '10 of Diamonds' } as never);

		game.playerHit(); // triggers bust logic
		expect(game.getStatus()).toBe('finished');
		expect(game.getWinner()).toBe('dealer');
	});

	it('should allow player to stand and let dealer play', () => {
		game.playerStand();
		expect(game.getStatus()).toBe('finished');
		expect(game.getDealer().getHand().getCards().length).toBeGreaterThanOrEqual(2);
	});

	it('should determine correct winner when both player and dealer have valid hands', () => {
		// Player: 10 + 9 = 19
		const player = game.getPlayer();
		player.reset();
		player.hit({ getPoints: () => [10], toString: () => '10 of Spades' } as never);
		player.hit({ getPoints: () => [9], toString: () => '9 of Diamonds' } as never);

		// Dealer: 10 + 6 = 16, will draw one more: 5 => total = 21
		const dealer = game.getDealer();
		dealer.reset();
		dealer.getHand().addCard({ getPoints: () => [10], toString: () => '10 of Clubs' } as never);
		dealer.getHand().addCard({ getPoints: () => [6], toString: () => '6 of Spades' } as never);
		dealer.getHand().addCard({ getPoints: () => [5], toString: () => '5 of Spades' } as never);

		 
		// @ts-expect-error We need to change to use a get
		game.status = 'finished';

		expect(game.getWinner()).toBe('dealer');
	});


	it('should return draw when scores are equal', () => {
		const player = game.getPlayer();
		const dealer = game.getDealer();

		player.reset();
		player.hit({ getPoints: () => [10], toString: () => '10 of Spades' } as never);
		player.hit({ getPoints: () => [7], toString: () => '7 of Clubs' } as never);

		dealer.reset();
		dealer.getHand().addCard({ getPoints: () => [10], toString: () => '10 of Diamonds' } as never);
		dealer.getHand().addCard({ getPoints: () => [7], toString: () => '7 of Hearts' } as never);

		// @ts-expect-error
		game.status = 'finished';

		expect(game.getWinner()).toBe('draw');
	});
});
