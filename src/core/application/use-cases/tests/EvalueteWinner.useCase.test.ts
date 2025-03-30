import { describe, it, expect, beforeEach } from 'vitest';
import {Game} from "@/core/domain/game/entity/Game.entity";
import {StartGame} from "@/core/application/use-cases/StartGame.useCase";
import {PlayerStand} from "@/core/application/use-cases/PlayerStand.useCase";
import {EvaluateWinner} from "@/core/application/use-cases/EvaluateWinner.useCase";

describe('useCases', () => {
	describe('EvaluateWinner', () => {
		let game: Game;

		beforeEach(() => {
			game = new Game();
			new StartGame(game).execute();
		});

		it('should return a valid winner after player stands', () => {
			new PlayerStand(game).execute();
			const result = new EvaluateWinner(game).execute();

			expect(result).toMatch(/player|dealer|draw/);
		});

		it('should throw if called before game is finished', () => {
			const evaluator = new EvaluateWinner(game);
			expect(() => evaluator.execute()).toThrow('Cannot evaluate winner: game is not finished');
		});

		it('should return player as winner if dealer busts', () => {
			// Force player: 10 + 8 = 18
			const player = game.getPlayer();
			player.reset();
			player.hit({ getPoints: () => [10], toString: () => '10' } as any);
			player.hit({ getPoints: () => [8], toString: () => '8' } as any);

			// Force dealer bust: 10 + 10 + 5 = 25
			const dealer = game.getDealer();
			dealer.reset();
			dealer.getHand().addCard({ getPoints: () => [10], toString: () => '10' } as any);
			dealer.getHand().addCard({ getPoints: () => [10], toString: () => '10' } as any);
			dealer.getHand().addCard({ getPoints: () => [5], toString: () => '5' } as any);

			(game as any).status = 'finished';

			const result = new EvaluateWinner(game).execute();
			expect(result).toBe('player');
		});
	});
})

