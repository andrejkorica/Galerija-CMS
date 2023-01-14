import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import LoopIcon from "@mui/icons-material/Loop";

const CardFlip = ({ podaci }) => {
  const [isFlipped, setisFlipped] = useState(true);
  console.log(podaci);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="positionFlip">
        <div className="containContainContain">
          <div className="containNA">
            <div className="naslovBijeliModalLeft">title:</div>
            <div className="containFlip">{podaci.Name}</div>
          </div>
          <div className="containNA">
            <div className="naslovBijeliModalRight">Author:</div>
            <div className="containFlipLeft">{podaci.Author}</div>
          </div>
        </div>
        <div className="naslovBijeliModalDesc">Description:</div>
        <div className="containLarge">{podaci.Description}</div>
        <button className="buttonFlip" onClick={() => setisFlipped(!isFlipped)}>
          <LoopIcon fontSize="large" className="img1size" />
        </button>
      </div>

      <div className="back">
        <button className="buttonFlip" onClick={() => setisFlipped(!isFlipped)}>
          <LoopIcon fontSize="large" className="img1size" />
        </button>
        <img
          className="alignSlikaModal"
          style={{ height: "600px" }}
          alt="pic"
          src={podaci.src}
        />
      </div>
    </ReactCardFlip>
  );
};

export default CardFlip;
