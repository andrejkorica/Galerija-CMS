import { useState } from "react";
import * as React from "react";
import CardFlip from "./CardFlip";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../App.css";

const OneRow = ({ podaci }) => {
	const [slika, setSlika] = useState([]);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			{podaci.map((data) => (
				<div className="gridInlineFather" key={data.id}>
					<div className="gridInlineChild1">
						<Box display="flex" flexDirection="column" alignItems="center">
							<img
								className="imageInline"
								onClick={() => {
									handleOpen();
									setSlika(data);
								}}
								src={data.src}
								alt="IMG DIDNT LOAD"
								style={{ marginBottom: "8px" }}
							/>
						</Box>
					</div>
					<div className="gridInlineChild2">
						<div className="containContainContain">
							<div className="containContain">
								<div className="contain">
									<p>
										{" "}
										{data.Name} by {data.Author}
									</p>
								</div>
							</div>
						</div>
						<div className="containContain">
							<div className="containDesc">
								<p> {data.Description}</p>
							</div>
						</div>
					</div>
				</div>
			))}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				disableAutoFocus={true}
			>
				<Box className="modalBody">
					<div className="alignCardFlip">
						<CardFlip podaci={slika} />
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default OneRow;
