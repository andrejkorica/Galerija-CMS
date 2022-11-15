import { useState, useEffect } from "react";
const GalleryV = ({ podaci }) => {
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
								<img src={person.src} alt="" />
							</div>
						))}
				</div>
			))}
		</div>
	);
};

export default GalleryV;
