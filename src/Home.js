import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import CardFlip from "./components/CardFlip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from '@mui/material/Grid';


const Home = () => {
  const [podaci, setPodaci] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const componentDidMount = async () => {
    const podaci = await axios.get(`http://localhost:8000/photos`);
    setPodaci(podaci.data);
  };

  useEffect(() => {
    componentDidMount();
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
      
      <Grid container spacing={2} gap="1" justifyContent="center">
      {podaci.map((person) => (
        <Grid item key={person.id}>
        <p>{person.Name}</p>
        <img
          onClick={handleOpen}
          src={person.src}
          alt="IMG DIDNT LOAD"
          
        />
     
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
            <CardFlip />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
