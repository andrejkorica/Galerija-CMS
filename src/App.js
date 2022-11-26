import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import GalleryV from "./components/GalleryV";
import OneRow from "./components/OneRow";
import TocIcon from '@mui/icons-material/Toc';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import AddIcon from '@mui/icons-material/Add';

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
				<div className="alignTipka2">
				<button
					onClick={() => setView(!view)}
					className="viewTipka glowOnHoverView ripple"
				>
					{view && <TocIcon fontSize="large" className="img1size"  />}
					{!view && <ViewQuiltIcon className="img2size" fontSize="large"  />}
				</button>

				<button className="dodajTipka glowOnHoverAdd ripple">
				<AddIcon fontSize="large" className="img1size"  />
				</button>
				</div>
			</div>
			{view && podaci && <GalleryV podaci={podaci}></GalleryV>}
			{!view && podaci && <OneRow podaci={podaci}></OneRow>}
		</div>
	);
}

export default App;
