import ReactCardFlip from "react-card-flip";
import { useState } from "react";

const CardFlip = ({ podaci }) => {
	const [isFlipped, setisFlipped] = useState(true);
	console.log(podaci);

	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
			<div className="front">
				<div className="image">
					<p>Author: {podaci.Author}</p>
					<p>Naziv slike: {podaci.Name}</p>
					<p>Description: {podaci.Description}</p>
				</div>
			</div>
			<div className="back">
				<div className="noimage">
					<img
						style={{ width: 300, height: "auto" }}
						alt="dog"
						onClick={() => setisFlipped(!isFlipped)}
						src={podaci.src}
					/>
				</div>
			</div>
		</ReactCardFlip>
	);
};

export default CardFlip;
