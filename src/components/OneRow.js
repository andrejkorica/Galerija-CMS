import { useState } from "react";
import * as React from "react";
import CardFlip from "./CardFlip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import "../App.css";

const OneRow = ({ podaci }) => {
	const [slika, setSlika] = useState([]);
	const [open, setOpen] = useState(false);
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
		<div style={{margin: "8px"} }>
			{podaci.map((data) => (		

				<Grid container spacing={1} justifyContent={"center"}>
					<Grid key={data.id + 1} lg={4} md={6} item  >
						<Box display="flex" flexDirection="column" alignItems="center" >
							
							<img
								className="imageGallery"
								onClick={() => {
									handleOpen();
									setSlika(data);
								}}
								src={data.src}
								alt="IMG DIDNT LOAD"
								style={{marginBottom: '8px'}}
							/>
						
						</Box>
					</Grid>
					
					<Grid key={data.id} lg={4} md={6} item  >
					<div  className="gradiantContainer">
						<div className="containName">
						{data.Name}
						</div>
						Author:
						<div className="contain">
						<p> {data.Author}</p>
						</div>
						Naziv slike:
						<div className="contain">
						<p> {data.Name}</p>
						</div>
						Description:
						<div className="contain">
							
						<p> {data.Description}</p>
						</div>
						</div>
					</Grid>
					
				</Grid>
				
			))}
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

export default OneRow;
