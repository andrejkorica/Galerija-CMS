import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import LoopIcon from "@mui/icons-material/Loop";

const CardFlip = ({ podaci }) => {
	const [isFlipped, setisFlipped] = useState(true);
	console.log(podaci);

	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
			<div className="front">
				<div className="image">
					<div className="positionFlip">
						<div className="containContainContain">
							<div className="containContain">
								<div className="naslovBijeli">title:</div>
								<div className="containFlip">{podaci.Name}</div>
							</div>
							<div className="containContain">
								<div className="naslovBijeli">Author:</div>
								<div className="containFlip">{podaci.Author}</div>
							</div>
						</div>

						<div className="containContain">
							<div className="naslovBijeli">Description:</div>
							<div className="containLarge">{podaci.Description}</div>
						</div>
						<button
							className="buttonFlip2"
							onClick={() => setisFlipped(!isFlipped)}
						>
							<LoopIcon fontSize="large" className="img1size" />
						</button>
					</div>
				</div>
			</div>
			<div className="back">
				<div className="noimage">
					<img
						className="alignSlikaModal"
						style={{ height: "600px" }}
						alt="pic"
						src={podaci.src}
					/>
					<button
						className="buttonFlip"
						onClick={() => setisFlipped(!isFlipped)}
					>
						<LoopIcon fontSize="large" className="img1size" />
					</button>
				</div>
			</div>
		</ReactCardFlip>
	);
};

export default CardFlip;
