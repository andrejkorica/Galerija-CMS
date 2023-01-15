import { useState } from "react";
import * as React from "react";
import CardFlip from "./CardFlip";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "../App.css";
import { Create } from "@mui/icons-material";
import Popup from "reactjs-popup";
import Forma from "./Forma";

const OneRow = ({ podaci }) => {
	const [slika, setSlika] = useState([]);
	const [data1, setData1] = useState([]);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [hcomponent, setHcomponent] = useState(false);
	const revalue = (e) => {
		setHcomponent(false);
	};
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
								<div className="naslovBijeli"> Art name: </div>
								<div className="contain">
									<p> {data.Name}</p>
								</div>
							</div>
							<div className="containContai">
								<div className="naslovbutton">
									<button
										className="editButton"
										onClick={() => {
											setHcomponent(true);
											setData1(data);
											console.log(data);
										}}
									>
										<Create fontSize="xs" />
										&nbsp;EDIT
									</button>
								</div>
							</div>
							<div className="containContain">
								<div className="naslovBijeli2"> Author: </div>
								<div className="contain2">
									<p> {data.Author}</p>
								</div>
							</div>
						</div>
						<div className="containContain">
							<div className="naslovBijeliDesc">Description: </div>
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
			{hcomponent && <Forma data={data1} callback={revalue}></Forma>}
		</div>
	);
};

export default OneRow;
