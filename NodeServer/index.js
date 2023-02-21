import express from "express";
import cors from "cors";
import axios from "axios";

const port = 2000;
console.log(port);
const app = express();
app.use(express.json({ extended: false }));
app.use(express.json({limit: '100mb'}));
app.use(cors());

app.post("/postaj", async (req, res) => {
	const { ImageTitle, ImageAuthor, ImageDescription, ImageNum, ImageBase64, BeaconID } =
		req.body;
	try {
		console.log(
			ImageTitle,
			ImageAuthor,
			ImageDescription,
			ImageNum,
			ImageBase64,
			BeaconID
		);
		const rez = await axios.post(
			"https://intersoft.uno/crm/M1WebServiceCRM.svc/v1/GalleryInsert",
			{
				ImageTitle: ImageTitle,
				ImageAuthor: ImageAuthor,
				ImageDescription: ImageDescription,
				ImageNum: ImageNum,
				ImageBase64: ImageBase64,
				BeaconID: BeaconID,
			}
		);
		res.send(rez.data);

		console.log("rez", rez.data);
	} catch (error) {
		console.log(error);
	}
});

app.post("/apdejtaj", async (req, res) => {
	const { ImageTitle, ImageAuthor, ImageDescription, ImageNum, ImageBase64, BeaconID, ID } =
		req.body;
	try {
		console.log(
			// ImageTitle,
			// ImageAuthor,
			// ImageDescription,
			// ImageNum,
			 "BASE 64", ImageBase64,
			// BeaconID,
			// ID
		);
		let x
		if(ImageBase64 == null){
			x = {
				ImageTitle: ImageTitle,
				ImageAuthor: ImageAuthor,
				ImageDescription: ImageDescription,
				ImageNum: ImageNum,
				BeaconID: BeaconID,
				ID: ID

			}
			} else {
				x = {
					ImageTitle: ImageTitle,
					ImageAuthor: ImageAuthor,
					ImageDescription: ImageDescription,
					ImageNum: ImageNum,
					ImageBase64: ImageBase64,
					BeaconID: BeaconID,
					ID: ID
				}
			}
		
		const rez = await axios.post(
			"https://intersoft.uno/crm/M1WebServiceCRM.svc/v1/GalleryUpdate", x
		);
		res.send(rez.data);

		console.log("rez", rez.data);
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => console.log(`Slušam zahtjeve http://localhost:${port}`));
