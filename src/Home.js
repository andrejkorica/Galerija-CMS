import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./index.css";
import GalleryView from "./components/GalleryView";
import OneRow from "./components/OneRow";

const Home = () => {
	const [podaci, setPodaci] = useState([]);
	const [poredak, setPoredak] = useState(4);
	const [postavi, setPostavi] = useState(true);

	const [open, setOpen] = useState(false);

	const getData = async () => {
		const podaci = await axios.get(`http://localhost:8000/photos`);
		setPodaci(podaci.data);
	};

	useEffect(() => {
		getData();
	}, []);

	const modalStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "auto",
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	return (
		<div>
			<Stack direction="row" spacing={2} justifyContent="center">
				<Button
					variant="outlined"
					onClick={() => {
						setPoredak(4);
						setPostavi(true);
					}}
					sx={{ width: "8rem" }}
				>
					instagram
				</Button>
				<Button
					variant="outlined"
					sx={{ width: "8rem" }}
					onClick={() => {
						setPoredak(12);
						setPostavi(false);
					}}
					width="5"
				>
					Inline
				</Button>
			</Stack>
			{!postavi && <OneRow podaci={podaci} />}
			{postavi && <GalleryView podaci={podaci} />}
		</div>
	);
};
export default Home;
