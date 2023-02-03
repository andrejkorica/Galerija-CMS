import express from "express";
import cors from "cors";
import axios from "axios";

const port = 2000;
console.log(port);
const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

app.post("/postaj", async (req, res) => {
	const { ImageTitle, ImageAuthor, ImageDescription, ImageNum, ImageBase64 } =
		req.body;
	try {
		console.log(
			ImageTitle,
			ImageAuthor,
			ImageDescription,
			ImageNum,
			ImageBase64
		);
		const rez = await axios.post(
			"https://intersoft.uno/crm/M1WebServiceCRM.svc/v1/GalleryInsert",
			{
				ImageTitle: ImageTitle,
				ImageAuthor: ImageAuthor,
				ImageDescription: ImageDescription,
				ImageNum: ImageNum,
				ImageBase64: ImageBase64,
			}
		);
		res.send(rez.data);

		console.log("rez", rez.data);
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => console.log(`Slušam zahtjeve http://localhost:${port}`));
