import { describe, it, expect, beforeEach } from 'vitest';
import {Game} from "@/core/domain/aggregator/Game.entity";
import {StartGame} from "@/core/application/use-cases/StartGame.useCase";
import {ResetGame} from "@/core/application/use-cases/ResetGame.useCase";

describe('useCases', () => {
	describe('ResetGame', () => {
		let game: Game;

		beforeEach(() => {
			game = new Game();
			new StartGame(game).execute();
		});

		it('should reset player and dealer hands and game status', () => {
			expect(game.getPlayer().getHand().getCards()).toHaveLength(2);
			expect(game.getDealer().getHand().getCards()).toHaveLength(2);
			expect(game.getStatus()).toBe('in_progress');

			const resetGame = new ResetGame(game);
			resetGame.execute();

			expect(game.getPlayer().getHand().getCards()).toHaveLength(0);
			expect(game.getDealer().getHand().getCards()).toHaveLength(0);
			expect(game.getStatus()).toBe('waiting');
		});

		it('should clear player and dealer hands and reset game status', () => {
			expect(game.getPlayer().getHand().getCards().length).toBe(2);
			expect(game.getDealer().getHand().getCards().length).toBe(2);
			expect(game.getStatus()).toBe('in_progress');

			new ResetGame(game).execute();

			expect(game.getPlayer().getHand().getCards().length).toBe(0);
			expect(game.getDealer().getHand().getCards().length).toBe(0);
			expect(game.getStatus()).toBe('waiting');
		});

		it('should allow starting a new game after reset', () => {
			new ResetGame(game).execute();
			expect(game.getStatus()).toBe('waiting');

			new StartGame(game).execute();

			expect(game.getStatus()).toBe('in_progress');
			expect(game.getPlayer().getHand().getCards().length).toBe(2);
			expect(game.getDealer().getHand().getCards().length).toBe(2);
		});
	});
})

