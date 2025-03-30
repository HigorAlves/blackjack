import { describe, it, expect, beforeEach } from 'vitest';
import {Game} from "@/core/domain/game/entity/Game.entity";
import {StartGame} from "@/core/application/use-cases/StartGame.useCase";
import {PlayerHit} from "@/core/application/use-cases/PlayerHit.useCase";
import {PlayerStand} from "@/core/application/use-cases/PlayerStand.useCase";
import {EvaluateWinner} from "@/core/application/use-cases/EvaluateWinner.useCase";
import {ResetGame} from "@/core/application/use-cases/ResetGame.useCase";

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
			player.hit({ getPoints: () => [10], toString: () => '10 of Hearts' } as any);
			player.hit({ getPoints: () => [10], toString: () => '10 of Diamonds' } as any);
			player.hit({ getPoints: () => [10], toString: () => '10 of Spades' } as any);

			const playerHit = new PlayerHit(game);
			playerHit.execute(); // triggers internal bust check

			expect(game.getStatus()).toBe('finished');
			expect(game.getWinner()).toBe('dealer');
		});

		it('should throw if game is not in progress', () => {
			(game as any).status = 'finished';

			const playerHit = new PlayerHit(game);
			expect(() => playerHit.execute()).toThrowError('Cannot hit unless game is in progress.');
		});
	});

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
			(game as any).status = 'finished';
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

