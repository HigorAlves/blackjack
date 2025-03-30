'use client';

import React, {useEffect} from 'react';
import {useGameAdapter} from "@/hooks/useGameAdapter.hook";
import {createGameStateDTO} from "@/core/application/dto/GameState.dto";
import {StatusBar} from "@/components/StatusBar";
import {HandView} from "@/components/HandView";
import {ActionPanel} from "@/components/ActionPanel";
import confetti from "canvas-confetti";

export const BlackjackBoard: React.FC = () => {
	const {
		game,
		startGame,
		hit,
		stand,
		resetGame,
	} = useGameAdapter();
	const state = createGameStateDTO(game);

	const dispatchFireworks= () => {
		const duration = 5 * 1000;
		const animationEnd = Date.now() + duration;
		const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

		const randomInRange = (min: number, max: number) =>
			Math.random() * (max - min) + min;

		const interval = window.setInterval(() => {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 50 * (timeLeft / duration);
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			});
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			});
		}, 250);
	};

	useEffect(() => {
		if(state.winner === 'player') {
			dispatchFireworks();
		}
	}, [state.winner]);

	return (
		<div className="max-w-3xl mx-auto p-6 text-white">
			<StatusBar status={state.status} winner={state.winner} />
			<HandView
				title="Dealer"
				cards={state.dealer.cards}
				score={state.dealer.score}
				hideScore={state.dealer.hideSecondCard}
			/>

			<HandView
				title="Player"
				cards={state.player.cards}
				score={state.player.score}
			/>

			<ActionPanel
				status={state.status}
				onStart={startGame}
				onHit={hit}
				onStand={stand}
				onReset={resetGame}
			/>
		</div>
	);
};
