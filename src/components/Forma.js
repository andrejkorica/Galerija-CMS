import * as React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageCompression from "browser-image-compression";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import "../App.css";

const Forma = ({ data, callback }) => {
	const [slika, setSlika] = useState([]);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleOpenAdd = () => setOpenAdd(true);
	const handleCloseAdd = () => {
		setOpenAdd(false);
		sendBackData();
	};
	const sendBackData = () => {
		callback(false);
	};

	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(true);
	const [preview, setPreview] = useState();
	const [picName, setPicName] = useState("");
	const [desc, setDesc] = useState("");
	const [picNum, setPicNum] = useState();
	const [author, setAuthor] = useState("");
	const [beacon, setBeacon] = useState("");
	const [pic, setPic] = useState("");

	const [picName1, setPicName1] = useState("");
	const [desc1, setDesc1] = useState("");
	const [picNum1, setPicNum1] = useState();
	const [author1, setAuthor1] = useState("");
	const [beacon1, setBeacon1] = useState("");
	const [pic1, setPic1] = useState("");
	const [openAdd, setOpenAdd] = React.useState(true);
	const inputFile = useRef(null);

	const onInputClick = () => {
		// `current` points to the mounted file input element
		inputFile.current.click();
	};

	async function resizeImageFn(event) {
		const imageFile = event.dataTransfer.files[0];
		console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
		console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

		const options = {
			maxSizeMB: 0.35,
			maxWidthOrHeight: 1200,
			useWebWorker: true,
		};
		try {
			const compressedFile = await imageCompression(imageFile, options);
			console.log(
				"compressedFile instanceof Blob",
				compressedFile instanceof Blob
			); // true
			console.log(
				`compressedFile size ${compressedFile.size / 1024 / 1024} MB`
			); // smaller than maxSizeMB
			console.log(compressedFile);
			setSelectedFile(compressedFile);
			setIsFilePicked(true);
			const file = compressedFile;
			getBase64(file).then((base64) => {
				localStorage["fileBase64"] = base64;
				setPic(base64);
				console.log(base64);
			});
			changePreview(file); // write your own logic
		} catch (error) {
			console.log(error);
		}
	}
	async function resizeImageFnT(event) {
		const imageFile = event.target.files[0];
		console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
		console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

		const options = {
			maxSizeMB: 0.35,
			maxWidthOrHeight: 1200,
			useWebWorker: true,
		};
		try {
			const compressedFile = await imageCompression(imageFile, options);
			console.log(
				"compressedFile instanceof Blob",
				compressedFile instanceof Blob
			); // true
			console.log(
				`compressedFile size ${compressedFile.size / 1024 / 1024} MB`
			); // smaller than maxSizeMB
			console.log(compressedFile);
			setSelectedFile(compressedFile);
			setIsFilePicked(true);
			const file = compressedFile;
			getBase64(file).then((base64) => {
				localStorage["fileBase64"] = base64;
				setPic(base64);
				console.log(base64);
			});
			changePreview(file); // write your own logic
		} catch (error) {
			console.log(error);
		}
	}
	const handleSubmit = (event) => {
		// 👇️ prevent page refresh
		event.preventDefault();

		console.log("form submitted ✅");
		console.log("picName", picName);
		console.log("desc", desc);
		console.log("picnum", picNum);
		console.log("author", author);
		console.log("beacon", beacon);
		console.log("base64", pic.substring(0, 20));
		setPicName("");
		setDesc("");
		setPicNum(null);
		setAuthor("");
		setBeacon("");
		setIsFilePicked(false);
		localStorage.clear();
		setPic("");
		handleCloseAdd();
		notify();
	};
	const notify = () => {
		toast.success("🦄 Image submitted sucessfuly", {
			position: "top-center",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
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

	const changePreview = (s) => {
		const objectUrl = URL.createObjectURL(s);
		setPreview(objectUrl);
		console.log(preview);
	};

	const dragOver = (e) => {
		e.preventDefault();
	};
	const dragEnter = (e) => {
		e.preventDefault();
	};

	const dragLeave = (e) => {
		e.preventDefault();
	};
	const checkSize = (e) => {
		console.log(e.target.files[0].size);
		// 5MB
		if (e.target.files[0].size > 5242880) return false;
		else return true;
	};
	const checkSizeD = (e) => {
		console.log(e.dataTransfer.files[0].size);
		// 5MB
		if (e.dataTransfer.files[0].size > 5242880) return false;
		else return true;
	};
	const changeHandler = (e) => {
		if (checkSize(e)) {
			resizeImageFnT(e);
		} else {
			console.log("toast");
			toast.error("Image size is too big", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};
	const fileDrop = (e) => {
		e.preventDefault();
		if (checkSizeD(e)) resizeImageFn(e);
		else {
			console.log("toast");
			toast.error("Image size is too big", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};
	useEffect(() => {
		console.log(data);
		setPreview(data.src);
		setPicName(data.Name);
		setDesc(data.Description);
		setPicNum(data.Num);
		setAuthor(data.Author);
		setBeacon(data.BeaconID);
		setPic(data.src);

		setPicName1(data.Name);
		setDesc1(data.Description);
		setPicNum1(data.Num);
		setAuthor1(data.Author);
		setBeacon1(data.BeaconID);
		setPic1(data.src);
	}, []);

	return (
		<div>
			<Modal
				open={openAdd}
				onClose={handleCloseAdd}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className="modalAddBody"
				style={{ overflow: "scroll" }}
			>
				<Box className="modalAdd">
					<div className="content">
						{""}
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								name="ip"
								id="ip"
								className="textBoxModal"
								defaultValue={data.Name}
								placeholder="Name of picture..."
								onChange={(event) => {
									setPicName(event.target.value);
								}}
							/>
							<hr />
							<textarea
								name="poruka"
								id="poruka"
								rows="5"
								className="textBoxModal"
								defaultValue={data.Description}
								placeholder="Description of picture..."
								onChange={(event) => setDesc(event.target.value)}
							></textarea>

							<hr />
							<input
								type="number"
								name="num"
								id="num"
								defaultValue={data.Num}
								className="textBoxModal"
								placeholder="Num of picture..."
								onChange={(event) => setPicNum(event.target.value)}
							/>
							<hr />
							<input
								type="text"
								name="author"
								id="author"
								className="textBoxModal"
								defaultValue={data.Author}
								placeholder="Name of author..."
								onChange={(event) => setAuthor(event.target.value)}
							/>
							<hr />
							<input
								type="text"
								name="beaconid"
								id="beaconid"
								className="textBoxModal"
								defaultValue={data.BeaconID}
								placeholder="Beacon ID...."
								onChange={(event) => setBeacon(event.target.value)}
							/>

							<hr />

							{isFilePicked && preview ? (
								<div className="prew">
									<h2 style={{ textAlign: "center" }}>Preview of</h2>
									<img className="previewImage" src={preview} alt="preview" />
									<Button
										className="removebtn"
										onClick={() => {
											setIsFilePicked(false);
											localStorage.clear();
											setPic("");
										}}
										variant="outlined"
										color="error"
									>
										Remove picture
									</Button>
								</div>
							) : (
								<p>Drag & drop a file or click inside the file box</p>
							)}
							{!isFilePicked && (
								<div className="droparea">
									<div className="containerUpload">
										<div
											className="drop-container"
											onClick={onInputClick}
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
													<input
														onChange={changeHandler}
														type="file"
														id="file"
														ref={inputFile}
														style={{ display: "none" }}
													/>
												)}
											</div>
										</div>
									</div>
								</div>
							)}

							<div>
								{(picName !== picName1 ||
									desc !== desc1 ||
									picNum !== picNum1 ||
									author !== author1 ||
									beacon !== beacon1 ||
									(pic !== pic1 && pic !== "")) && (
									<Button
										style={{ marginTop: "10px" }}
										className="removebtn"
										type="submit"
										variant="contained"
										color="success"
									>
										SUBMIT CHANGES
									</Button>
								)}
							</div>
							<br />
						</form>
					</div>
					<div className="actions"></div>
				</Box>
			</Modal>
		</div>
	);
};
export default Forma;
