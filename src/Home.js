import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
	const [podaci, setPodaci] = useState([]);

	const componentDidMount = async () => {
		const podaci = await axios.get(`http://localhost:8000/photos`);
		setPodaci(podaci.data);
	};
	useEffect(() => {
		componentDidMount();
	}, []);
	return (
		<ul>
			{podaci.map((person) => (
				<li key={person.id}>{person.src}</li>
			))}
		</ul>
	);
};

export default Home;
