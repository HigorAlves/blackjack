import { describe, it, expect, beforeEach } from 'vitest';
import {Game} from "@/core/domain/aggregator/Game.entity";
import {StartGame} from "@/core/application/use-cases/StartGame.useCase";
import {PlayerHit} from "@/core/application/use-cases/PlayerHit.useCase";

describe('PlayerHit', () => {
	let game: Game;

	beforeEach(() => {
		game = new Game();
		new StartGame(game).execute();
	});

	it('should allow player to draw a card', () => {
		const playerHit = new PlayerHit(game);
		const initialCards = game.getPlayer().getHand().getCards().length;

		playerHit.execute();

		const currentCards = game.getPlayer().getHand().getCards().length;
		expect(currentCards).toBe(initialCards + 1);
	});

	it('should finish the game if player busts after hit', () => {
		const player = game.getPlayer();

		// Force a bust by stacking big cards
		player.hit({ getPoints: () => [10], toString: () => '10 of Hearts' } as never);
		player.hit({ getPoints: () => [10], toString: () => '10 of Diamonds' } as never);
		player.hit({ getPoints: () => [10], toString: () => '10 of Spades' } as never);

		const playerHit = new PlayerHit(game);
		playerHit.execute(); // triggers internal bust check

		expect(game.getStatus()).toBe('finished');
		expect(game.getWinner()).toBe('dealer');
	});

	it('should throw if game is not in progress', () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		game.status = 'finished';

		const playerHit = new PlayerHit(game);
		expect(() => playerHit.execute()).toThrowError('Cannot hit unless game is in progress.');
	});
});
