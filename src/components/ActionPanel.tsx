import React from 'react';
import {Button} from "@/components/ui/button";

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
			<Button variant="default" onClick={onStart}>
				🎮 Start Game
			</Button>
			<Button variant="secondary" onClick={onHit} disabled={!isPlaying}>
				➕ Hit
			</Button>
			<Button variant="destructive" onClick={onStand} disabled={!isPlaying}>
				✋ Stand
			</Button>
			<Button variant="outline" onClick={onReset}>
				🔄 Reset
			</Button>
		</div>
	);
};
