import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import LoopIcon from "@mui/icons-material/Loop";
import "../App.css";
import { Create } from "@mui/icons-material";
import Forma from "./Forma";
const CardFlip = ({ podaci }) => {
	const [isFlipped, setisFlipped] = useState(true);
	const [hcomponent, setHcomponent] = useState(false);
	console.log(podaci);
	const revalue = (e) => {
		setHcomponent(false);
	};

	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
			<div className="positionFlip">
				<div className="containContainContain">
					<div className="containNA">
						<div className="naslovBijeliModalLeft">title:</div>
						<div className="containFlip">{podaci.ImageTitle}</div>
					</div>
					<div className="containNA">
						<div className="naslovBijeliModalRight">Author:</div>
						<div className="containFlipLeft">{podaci.ImageAuthor}</div>
					</div>
				</div>
				<div className="naslovBijeliModalDesc">Description:</div>
				<div className="containLarge">{podaci.ImageDescription}</div>
				{/* <button className="buttonFlip" onClick={() => setisFlipped(!isFlipped)}>
          <LoopIcon fontSize="large" className="img1size" />
        </button> */}
			</div>

			<div className="back">
				{/* <button className="buttonFlip" onClick={() => setisFlipped(!isFlipped)}>
          <LoopIcon fontSize="large" className="img1size" />
        </button> */}
				<img
					className="alignSlikaModal"
					style={{ height: "600px" }}
					alt="pic"
					src={podaci.ImgPath}
				/>
				<button
					className="editButton"
					style={{
						margin: "0",
						marginTop: "8px",
						marginBottom: "-40px",
						margin: "0 auto",
						jutifyContent: "center",
						alignItems: "center",
						display: "block",
					}}
					onClick={() => {
						setHcomponent(true);
					}}
				>
					<Create fontSize="xs" />
					&nbsp;EDIT
				</button>
				{hcomponent && <Forma data={podaci} callback={revalue}></Forma>}
			</div>
		</ReactCardFlip>
	);
};

export default CardFlip;
