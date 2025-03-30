import React from 'react';
import { CardDTO } from "@/core/application/dto/GameState.dto";
import { motion } from "framer-motion";

const suitSymbols: Record<string, string> = {
	Hearts: '♥',
	Diamonds: '♦',
	Clubs: '♣',
	Spades: '♠',
	Hidden: '🂠',
};

const suitColors: Record<string, string> = {
	Hearts: 'text-red-500',
	Diamonds: 'text-red-500',
	Clubs: 'text-black',
	Spades: 'text-black',
	Hidden: 'text-gray-400',
};

export const CardView: React.FC<{ card: CardDTO }> = ({ card }) => {
	const symbol = suitSymbols[card.suit] || '?';
	const color = suitColors[card.suit] || 'text-black';

	const isHidden = card.display === '🂠';

	return (
		<motion.div
			data-testid="card"
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 300 }}
		>
			<div className="relative w-[60px] h-[90px] bg-white border border-gray-400 rounded-lg shadow-sm overflow-hidden">
				{isHidden ? (
					<div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
						<div className="text-white text-xl font-bold">🙈</div>
					</div>
				) : (
					<div className="flex flex-col justify-between px-2 py-1 w-full h-full">
						<div className={`text-sm font-semibold ${color}`}>{card.value}</div>
						<div className={`text-xl font-bold text-center ${color}`}>{symbol}</div>
						<div className={`text-sm font-semibold text-right ${color}`}>{card.value}</div>
					</div>
				)}
			</div>
		</motion.div>
	);
};
