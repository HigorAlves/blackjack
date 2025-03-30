import { describe, it, expect } from 'vitest';
import {Game} from "@/core/domain/game/entity/Game.entity";
import {StartGame} from "@/core/application/use-cases/StartGame.useCase";

describe('useCases', () => {
	describe('StartGame', () => {
		it('should initialize the game with two cards each', () => {
			const game = new Game();
			const useCase = new StartGame(game);

			useCase.execute();

			expect(game.getStatus()).toBe('in_progress');
			expect(game.getPlayer().getHand().getCards()).toHaveLength(2);
			expect(game.getDealer().getHand().getCards()).toHaveLength(2);
		});
	});
})

