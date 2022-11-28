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
import React from "react";

function App() {
	const [podaci, setPodaci] = useState([]);
	const [view, setView] = useState(true);
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [preview, setPreview] = useState();

	const getData = async () => {
		const podaci = await axios.get(`http://localhost:8000/photos`);
		setPodaci(podaci.data);
	};
	const handleSubmit = (event) => {
		// 👇️ prevent page refresh
		event.preventDefault();

		console.log("form submitted ✅");
	};

	const getBase64 = (file) => {
		return new Promise((resolve, reject) => {
			console.log("getbase64");
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
			reader.readAsDataURL(file);
		});
	};

	const changeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
		setIsFilePicked(true);
		const file = e.target.files[0];
		getBase64(file).then((base64) => {
			localStorage["fileBase64"] = base64;
			console.log("file stored", base64);
		});
		changePreview(e.target.files[0]);
	};
	const changePreview = (s) => {
		const objectUrl = URL.createObjectURL(s);
		setPreview(objectUrl);
		console.log(preview);
	};

	const handleSubmission = () => {};

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
									<form onSubmit={handleSubmit}>
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

										<input type="file" name="file" onChange={changeHandler} />
										{isFilePicked && preview ? (
											<div className="prew">
												<p>Filename: {selectedFile.name}</p>
												<p>Filetype: {selectedFile.type}</p>
												<p>Size in bytes: {selectedFile.size}</p>
												<p>
													lastModifiedDate:{" "}
													{selectedFile.lastModifiedDate.toLocaleDateString()}
												</p>
												<img src={preview} alt="preview" />
											</div>
										) : (
											<p>Select a file to show details</p>
										)}
										<div>
											<button onClick={handleSubmission}>Submit</button>
										</div>
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
