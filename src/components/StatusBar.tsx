import React from 'react';

interface StatusBarProps {
	status: string;
	winner: 'player' | 'dealer' | 'draw' | null;
}

export const StatusBar: React.FC<StatusBarProps> = ({ status, winner }) => {
	return (
		<div className="text-center mb-4">
			<p className="text-lg">Status: <span className="font-semibold">{status}</span></p>
			{winner && (
				<p className="text-xl font-bold mt-2">
					🏆 Winner: <span className="uppercase">{winner}</span>
				</p>
			)}
		</div>
	);
};
