import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import GalleryV from "./components/GalleryV";

function App() {
	const [podaci, setPodaci] = useState([]);
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
				<button className="viewTipka glowOnHoverView ripple">
					Gallery view
				</button>

				<button className="dodajTipka glowOnHoverAdd ripple">
					Add new image
				</button>
			</div>
			{podaci && <GalleryV podaci={podaci}></GalleryV>}
		</div>
	);
}

export default App;
