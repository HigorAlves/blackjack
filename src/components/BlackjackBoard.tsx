'use client';

import React from 'react';
import {useGameAdapter} from "@/hooks/useGameAdapter.hook";
import {createGameStateDTO} from "@/core/application/dto/GameState.dto";
import {StatusBar} from "@/components/StatusBar";
import {HandView} from "@/components/HandView";
import {ActionPanel} from "@/components/ActionPanel";

export const BlackjackBoard: React.FC = () => {
	const {
		game,
		startGame,
		hit,
		stand,
		resetGame,
	} = useGameAdapter();

	const state = createGameStateDTO(game);

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
