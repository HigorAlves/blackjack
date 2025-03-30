import React from 'react';
import {CardDTO} from "@/core/application/dto/GameState.dto";
import {CardView} from "@/components/CardView";

interface HandViewProps {
	title: string;
	cards: CardDTO[];
	score?: number;
	hideScore?: boolean;
}

export const HandView: React.FC<HandViewProps> = ({title, cards, score, hideScore = false,}) => {
	return (
		<div className="mb-6">
			<h2 className="text-2xl font-semibold">{title}</h2>
			<div className="flex gap-2 mt-2 flex-wrap">
				{cards.map((card, index) => (
					<CardView key={index} card={card} />
				))}
			</div>
			{!hideScore && (
				<p className="mt-2 text-sm">Score: {score ?? 0}</p>
			)}
		</div>
	);
};
