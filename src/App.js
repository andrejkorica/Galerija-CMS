import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
	const [podaci, setPodaci] = useState([]);
	const [brojac, setBrojac] = useState(0);
	const [x, setX] = useState(5);
	const [y, setY] = useState(10);
	const getData = async () => {
		const podaci = await axios.get(`http://localhost:8000/photos`);
		setPodaci(podaci.data);
		console.log(podaci.data.length);
	};
	const setXY = () => {
		console.log("setxy");
		setX(x + 5);
		if (brojac > 1) setY(y + 5);
	};
	const getVal = (i) => {
		console.log("i", i);
		return true;
	};
	const getLastDigit = (i) => {
		var lenI = String(i).length;
		return Number(String(i).charAt(lenI - 1));
	};
	useEffect(() => {
		if (podaci) setBrojac(Math.round(podaci.length / 5));
		console.log(brojac, "br");
	}, [podaci]);

	useEffect(() => {
		getData();
	}, []);
	return (
		<div>
			<div className="slice">
				<button className="viewTipka glowOnHoverView ripple">
					Gallery view
				</button>

				<button className="dodajTipka glowOnHoverAdd ripple">
					Add new image
				</button>
			</div>

			{[...Array(brojac)].map((i, index) => (
				<div
					className={(index + 1) % 2 === 0 ? "containerflip" : "container"}
					key={String(index + 1)}
				>
					{podaci
						.slice(x * (index + 1) - 5, y * (index + 1) - (index + 1) * 5)
						.map((person) => (
							<div>
								<img src={person.src} alt="" />
							</div>
						))}
				</div>
			))}
		</div>
	);
}

export default App;
