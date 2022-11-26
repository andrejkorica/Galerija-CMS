import { useState, useEffect } from "react";
import * as React from "react";
import CardFlip from "./CardFlip";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import "../App.css";

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
		disableAutoFocus={true}
      >
        <Box className="modalBody">
          <h1 className="naslovAlign">NASLOV</h1>
          <div display="flex" align="center">
            <CardFlip podaci={slika} />
          </div>

        </Box>
      </Modal>
    </div>
  );
};

export default GalleryV;
