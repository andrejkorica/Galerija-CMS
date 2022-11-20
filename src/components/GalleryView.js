import { useState } from "react";
import * as React from "react";
import CardFlip from "./CardFlip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import "../index.css";

const GalleryView = ({ podaci }) => {


	const [open, setOpen] = useState(false);
	const [slika, setSlika] = useState([]);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
			<Grid container spacing={1}>
				{podaci.map((image) => (
					<Grid key={image.id} lg={2} md={2} alignItems="stretch" item>
						<Box display="flex" flexDirection="column" alignItems="center">
							<p>{image.Name}</p>

							<img
								className="imageGallery"
								onClick={() => {
									handleOpen();
									setSlika(image);
								}}
								src={image.src}
								alt="IMG DIDNT LOAD"
							/>
						</Box>
					</Grid>
				))}
			</Grid>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
					<div display="flex" align="center">
						<CardFlip podaci={slika} />
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default GalleryView;
