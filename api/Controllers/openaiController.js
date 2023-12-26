import axios from 'axios'
export const summerizeCode = async (req,res) => {
    // console.log(req.body);
    try {
        const response = await axios.post('http://localhost:5001/summerizeCode',req.body);
        return res.status(200).json(response.data);
    }catch(err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
export const summerizeStatement = async (req,res) => {
    // console.log(req.body);
    try {
        const response = await axios.post('http://localhost:5001/summerizeStatement',req.body);
        return res.status(200).json(response.data);
    }catch(err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}