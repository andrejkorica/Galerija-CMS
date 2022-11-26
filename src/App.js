import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import GalleryV from "./components/GalleryV";
import OneRow from "./components/OneRow";
import TocIcon from "@mui/icons-material/Toc";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import AddIcon from "@mui/icons-material/Add";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
						{view && <TocIcon fontSize="large" className="img1size" />}
						{!view && <ViewQuiltIcon className="img2size" fontSize="large" />}
					</button>
					<Popup
						trigger={
							<button className="dodajTipka glowOnHoverAdd ripple">
								<AddIcon fontSize="large" className="img1size" />
							</button>
						}
						modal
						nested
					>
						{(close) => (
							<div className="modal">
								<button className="close" onClick={close}>
									&times;
								</button>
								<div className="header">Insert new picture</div>
								<div className="content">
									{""}
									<form action="">
										<input
											type="text"
											name="ip"
											id="ip"
											placeholder="Name of picture.."
										/>
										<hr />
										<textarea
											name="poruka"
											id="poruka"
											rows="5"
											placeholder="Description of picture..."
										></textarea>

										<hr />
										<input
											type="number"
											name="num"
											id="num"
											placeholder="Num of picture.."
										/>
										<hr />
										<input
											type="text"
											name="author"
											id="author"
											placeholder="Name of author	.."
										/>
										<hr />
										<input
											type="text"
											name="beaconid"
											id="beaconid"
											placeholder="Beacon ID...."
										/>
										<hr />
									</form>
								</div>
								<div className="actions">
									<Popup
										trigger={<button className="button"> ? </button>}
										position="top center"
										nested
									>
										<span>Tu ce pisat kako i sta treba dodavati!</span>
									</Popup>
									<button
										className="button"
										onClick={() => {
											console.log("modal closed ");
											close();
										}}
									>
										close modal
									</button>
								</div>
							</div>
						)}
					</Popup>
				</div>
			</div>
			{view && podaci && <GalleryV podaci={podaci}></GalleryV>}
			{!view && podaci && <OneRow podaci={podaci}></OneRow>}
		</div>
	);
}

export default App;
