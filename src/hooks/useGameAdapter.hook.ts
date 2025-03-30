import { useState, useMemo } from 'react';
import {StartGame} from "@/core/application/use-cases/StartGame.useCase";
import {PlayerHit} from "@/core/application/use-cases/PlayerHit.useCase";
import {PlayerStand} from "@/core/application/use-cases/PlayerStand.useCase";
import {ResetGame} from "@/core/application/use-cases/ResetGame.useCase";
import {EvaluateWinner} from "@/core/application/use-cases/EvaluateWinner.useCase";
import {Game} from "@/core/domain/aggregator/Game.entity";


export const useGameAdapter = () => {
	const [game] = useState(() => new Game());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, rerender] = useState({});

	const forceUpdate = () => rerender({});

	const startGame = () => {
		new StartGame(game).execute();
		forceUpdate();
	};

	const hit = () => {
		try {
			new PlayerHit(game).execute();
		} catch (e) {
			console.warn(e);
		}
		forceUpdate();
	};

	const stand = () => {
		new PlayerStand(game).execute();
		forceUpdate();
	};

	const resetGame = () => {
		new ResetGame(game).execute();
		forceUpdate();
	};

	const winner = useMemo(() => {
		if (game.isFinished()) {
			return new EvaluateWinner(game).execute();
		}
		return null;
	}, [game.getStatus()]);

	return {
		game,
		startGame,
		hit,
		stand,
		resetGame,
		winner,
		status: game.getStatus(),
		player: game.getPlayer(),
		dealer: game.getDealer(),
	};
};
