import axios from "axios";
import "dotenv/config";
import express from "express";
const router = express.Router();

const getType = async(req, res) =>{
    try {
        const { id } = req.params
        const link = `${process.env.EXTERNAL_LINK}${id}`;
        console.log(link);
        const { data } = await axios.get(`${process.env.EXTERNAL_LINK}${id}`)
        console.log(data);
        res.status(201).json(data)
    } catch (error) {
        res
			.status(400)
			.send(
				`Server Error - we had a problem fetching type information: ${error}`
			);
    }
}

router.route("/:id").get(getType);

export default router;