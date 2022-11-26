import { useState } from "react";
import * as React from "react";
import CardFlip from "./CardFlip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
    <div>
      {podaci.map((data) => (
        <div className="gridInlineFather">
          <div key={data.id} className="gridInlineChild1">
            <Box display="flex" flexDirection="column" alignItems="center">
              <img
                className="imageGallery"
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

          <div key={data.id} className="gridInlineChild2">
            <div className="containName">
              <h1 className="titleCards" style={{textTransform: 'uppercase'}}> {data.Name} </h1>
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
