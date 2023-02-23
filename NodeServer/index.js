import express from "express";
import cors from "cors";
import axios from "axios";
const bodyParser = require("body-parser");

const port = 2000;
console.log(port);
const app = express();
app.use(express.json({ limit: "1mb" }));

// parse URL-encoded request bodies
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.post("/postaj", async (req, res) => {
	const {
		ImageTitle,
		ImageAuthor,
		ImageDescription,
		ImageNum,
		ImageBase64,
		BeaconID,
	} = req.body;
	try {
		console.log(ImageTitle, ImageAuthor, ImageDescription, ImageNum, BeaconID);
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

app.post("/delete", async (req, res) => {
	const { ID } = req.body;
	try {
		console.log(ID);
		const rez = await axios.post(
			"https://intersoft.uno/crm/M1WebServiceCRM.svc/v1/GalleryDelete",
			{
				ID: ID,
			}
		);
		res.send(rez.data);

		console.log("rez", rez.data);
	} catch (error) {
		console.log(error);
	}
});

app.post("/apdejtaj", async (req, res) => {
	const {
		ImageTitle,
		ImageAuthor,
		ImageDescription,
		ImageNum,
		BeaconID,
		ID,
		ImageBase64,
	} = req.body;
	try {
		let x;
		if (ImageBase64 == "") {
			x = {
				ImageTitle: ImageTitle,
				ImageAuthor: ImageAuthor,
				ImageDescription: ImageDescription,
				ImageNum: ImageNum,
				BeaconID: BeaconID,
				ID: ID,
			};
		} else {
			x = {
				ImageTitle: ImageTitle,
				ImageAuthor: ImageAuthor,
				ImageDescription: ImageDescription,
				ImageNum: ImageNum,
				ImageBase64: ImageBase64,
				BeaconID: BeaconID,
				ID: ID,
			};
		}

		const rez = await axios.post(
			"https://intersoft.uno/crm/M1WebServiceCRM.svc/v1/GalleryUpdate",
			x
		);
		res.send(rez.data);

		console.log("rez", rez.data);
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => console.log(`Slušam zahtjeve http://localhost:${port}`));
