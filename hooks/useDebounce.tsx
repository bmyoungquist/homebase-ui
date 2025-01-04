import { useEffect, useState } from 'react';

export function useDebounce<T>(initialValue: T, delay: number) {
	const [actualValue, setActualValue] = useState(initialValue);
	const [debounceValue, setDebounceValue] = useState(initialValue);

	useEffect(() => {
		const debounceId = setTimeout(
			() => setDebounceValue(actualValue),
			delay
		);
		return () => clearTimeout(debounceId);
	}, [actualValue, delay]);

	return [debounceValue, setActualValue] as const;
}
