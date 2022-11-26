import ReactCardFlip from "react-card-flip";
import { useState } from "react";

const CardFlip = ({ podaci }) => {
	const [isFlipped, setisFlipped] = useState(true);
	console.log(podaci);

	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
			<div className="front">
				<div className="image">
				<div className="positionFlip" >``
					
            <div className="contain">
              <p>Author: {podaci.Author}</p>
            </div>
            <div className="contain">
              <p>Naziv slike: {podaci.Name}</p>
            </div>
            <div className="contain">
              <p>Description: {podaci.Description}</p>
            </div>
          </div>
				</div>
			</div>
			<div className="back">
				<div className="noimage">
					<img
						style={{ height: "600px" }}
						alt="pic"
						onClick={() => setisFlipped(!isFlipped)}
						src={podaci.src}
					/>
				</div>
			</div>
		</ReactCardFlip>
	);
};

export default CardFlip;
