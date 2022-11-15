import { useState, useEffect } from "react";
import * as React from "react";
import CardFlip from "./CardFlip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../index.css";
const GalleryV = ({ podaci }) => {
	const [open, setOpen] = useState(false);
	const [slika, setSlika] = useState([]);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [brojac, setBrojac] = useState(0);
	const x = 5;
	const y = 10;
	useEffect(() => {
		setBrojac(Math.round(podaci.length / 5));
	}, [podaci]);
	const modalStyle = {
		position: "absolute",
		height: "80%",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "80%    ",
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};
	return (
		<div>
			{[...Array(brojac)].map((i, index) => (
				<div
					className={(index + 1) % 2 === 0 ? "containerflip" : "container"}
					key={String(index + 1)}
				>
					{podaci
						.slice(x * (index + 1) - 5, y * (index + 1) - (index + 1) * 5)
						.map((person) => (
							<div>
								<img
									onClick={() => {
										handleOpen();
										setSlika(person);
									}}
									src={person.src}
									alt=""
								/>
							</div>
						))}
				</div>
			))}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Naslov
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Whatever
					</Typography>
					<div display="flex" align="center">
						<CardFlip podaci={slika} />
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default GalleryV;
