import { useEffect, useState } from "react";

export function useFetch<T>() {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | unknown | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setLoading(true);
		try {
			fetch("/api/")
				.then((response) => response.json())
				.then((data) => {
					setData(data);
					setLoading(false);
				})
				.catch((error) => {
					setError(error);
					setLoading(false);
				});
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	}, []);

	return [data, error, loading] as const;
}
