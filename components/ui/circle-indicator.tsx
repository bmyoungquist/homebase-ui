'use client';

import { Circle } from 'lucide-react';

export default function CircleIndicator({
	state,
}: {
	state: boolean | undefined;
}) {
	return (
		<Circle
			className={`size-3 ${state === undefined
					? 'stroke-muted-foreground fill-none'
					: state === true
						? 'stroke-green-600 fill-green-600'
						: 'stroke-red-600 fill-red-600'
				}`}
		/>
	);
}
