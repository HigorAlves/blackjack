import React from 'react';
import {CardDTO} from "@/core/application/dto/GameState.dto";

export const CardView: React.FC<{ card: CardDTO }> = ({ card }) => {
	return (
		<div className="bg-black border border-gray-500 rounded px-3 py-2 text-center text-sm min-w-[40px]">
			{card.display}
		</div>
	);
};
