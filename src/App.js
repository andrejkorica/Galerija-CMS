import "./App.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
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
	const [picName, setPicName] = useState('');
	const [desc, setDesc] = useState('');
	const [picNum, setPicNum] = useState();
	const [author, setAuthor] = useState('');
	const [beacon, setBeacon] = useState('');
	const [pic, setPic] = useState('');

	const inputFile = useRef(null) 
	const getData = async () => {
		const podaci = await axios.get(`http://localhost:8000/photos`);
		setPodaci(podaci.data);
	};
	const onInputClick = () => {
		// `current` points to the mounted file input element
	   inputFile.current.click();
	  };
	const handleSubmit = (event) => {
		// 👇️ prevent page refresh
		event.preventDefault();

		console.log("form submitted ✅");
		console.log("picName", picName);
		console.log("desc", desc);
		console.log("picnum", picNum);
		console.log("author", author);
		console.log("beacon", beacon);
		console.log("base64", pic.substring(0,20));
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
			setPic(base64);
		});
		changePreview(e.target.files[0]);
	};
	const changePreview = (s) => {
		const objectUrl = URL.createObjectURL(s);
		setPreview(objectUrl);
		console.log(preview);
	};

	const handleSubmission = () => {};

	const dragOver = (e) => {
		e.preventDefault();
	};
	const dragEnter = (e) => {
		e.preventDefault();
	};

	const dragLeave = (e) => {
		e.preventDefault();
	};
	const fileDrop = (e) => {
		e.preventDefault();
		console.log(e.dataTransfer.files[0]);
		setSelectedFile(e.dataTransfer.files[0]);
		setIsFilePicked(true);
		const file = e.dataTransfer.files[0];
		getBase64(file).then((base64) => {
			localStorage["fileBase64"] = base64;
			console.log("file stored", base64);
			setPic(base64)
		});
		changePreview(e.dataTransfer.files[0]);
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
									<form onSubmit={handleSubmit}>
										<input
											type="text"
											name="ip"
											id="ip"
											placeholder="Name of picture.."
											onChange={event => setPicName(event.target.value)}
										/>
										<hr />
										<textarea
											name="poruka"
											id="poruka"
											rows="5"
											placeholder="Description of picture..."
											onChange={event => setDesc(event.target.value)}
										></textarea>

										<hr />
										<input
											type="number"
											name="num"
											id="num"
											placeholder="Num of picture.."
											onChange={event => setPicNum(event.target.value)}
										/>
										<hr />
										<input
											type="text"
											name="author"
											id="author"
											placeholder="Name of author	.."
											onChange={event => setAuthor(event.target.value)}
										/>
										<hr />
										<input
											type="text"
											name="beaconid"
											id="beaconid"
											placeholder="Beacon ID...."
											onChange={event => setBeacon(event.target.value)}
										/>

										<hr />

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
										{!isFilePicked && (
											<div className="droparea">
												<div className="containerUpload">
													<div
														className="drop-container" onClick={onInputClick}
														onDragOver={dragOver}
														onDragEnter={dragEnter}
														onDragLeave={dragLeave}
														onDrop={fileDrop}
													>
														<div className="drop-message">
															<div className="upload-icon"></div>
															DRAG & DROP <br></br>
															OR CLICK IN THE AREA
															{!isFilePicked && (
											<input onChange={changeHandler} type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
										)}
														</div>
													</div>
												</div>
											</div>
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
