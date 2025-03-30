import { describe, it, expect, beforeEach } from 'vitest';
import {Game} from "@/core/domain/aggregator/Game.entity";
import {StartGame} from "@/core/application/use-cases/StartGame.useCase";
import {PlayerStand} from "@/core/application/use-cases/PlayerStand.useCase";

describe('useCases', () => {
	describe('PlayerStand', () => {
		let game: Game;

		beforeEach(() => {
			game = new Game();
			new StartGame(game).execute();
		});

		it('should mark player as standing and finish the game', () => {
			const playerStand = new PlayerStand(game);
			playerStand.execute();

			expect(game.getPlayer().isStanding()).toBe(true);
			expect(game.getStatus()).toBe('finished');
			expect(game.getWinner()).toMatch(/player|dealer|draw/);
		});

		it('should not allow standing if game is not in progress', () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			game.status = 'finished';
			const playerStand = new PlayerStand(game);

			expect(() => playerStand.execute()).toThrowError('Cannot stand unless game is in progress.');
		});

		it('should trigger dealer to play after player stands', () => {
			const dealerBefore = game.getDealer().getHand().getCards().length;

			new PlayerStand(game).execute();

			const dealerAfter = game.getDealer().getHand().getCards().length;
			expect(dealerAfter).toBeGreaterThanOrEqual(dealerBefore);
		});
	});
})

