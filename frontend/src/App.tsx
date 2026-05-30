import { useFetch } from "./hooks/useFetch";

function App() {
	const [data, error, loading] = useFetch<{ title: string }>();

	if (loading) {
		return (
			<div className="w-full h-screen flex items-center justify-center bg-slate-700">
				<h1 className="text-7xl font-serif">Loading...</h1>
			</div>
		);
	}

	if (error) {
		return (
			<div className="w-full h-screen flex items-center justify-center bg-slate-700">
				<h1 className="text-7xl font-serif">Error: {(error as Error).message}</h1>
			</div>
		);
	}

	return (
		<div className="w-full h-screen flex items-center justify-center bg-slate-700">
			<h1 className="text-7xl font-serif">{data?.title ?? "No data"}</h1>
		</div>
	);
}

export default App;
