import React from 'react';

interface ActionPanelProps {
	status: string;
	onStart: () => void;
	onHit: () => void;
	onStand: () => void;
	onReset: () => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({status, onStart, onHit, onStand, onReset}) => {
	const isPlaying = status === 'in_progress';

	return (
		<div className="flex justify-center gap-4 flex-wrap">
			<button
				className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
				onClick={onStart}
			>
				Start Game
			</button>
			<button
				className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded disabled:opacity-40"
				onClick={onHit}
				disabled={!isPlaying}
			>
				Hit
			</button>
			<button
				className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded disabled:opacity-40"
				onClick={onStand}
				disabled={!isPlaying}
			>
				Stand
			</button>
			<button
				className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
				onClick={onReset}
			>
				Reset
			</button>
		</div>
	);
};
