import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import GalleryV from "./components/GalleryV";
import OneRow from "./components/OneRow";

function App() {
	const [podaci, setPodaci] = useState([]);
	const [view, setView] = useState(true);
	const getData = async () => {
		const podaci = await axios.get(`http://localhost:8000/photos`);
		setPodaci(podaci.data);
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<div>
			<div className="slice">
				<button
					onClick={() => setView(!view)}
					className="viewTipka glowOnHoverView ripple"
				>
					{view && "Gallery view"}
					{!view && "Inline view"}
				</button>

				<button className="dodajTipka glowOnHoverAdd ripple">
					Add new image
				</button>
			</div>
			{view && podaci && <GalleryV podaci={podaci}></GalleryV>}
			{!view && podaci && <OneRow podaci={podaci}></OneRow>}
		</div>
	);
}

export default App;
