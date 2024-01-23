const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

const filePath = './data/data.json';


const initialData = [];
fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));

app.post('/api/createText', (req, res) => {
    try {
        const data = req.body;

        let parsedData;
        try {
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            parsedData = JSON.parse(jsonData);
        } catch (readError) {
            console.error("Faylni o'qishda xatolik:", readError);
            parsedData = [];
        }

        parsedData.push(data);

        fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));

        res.status(200).json({ success: true, message: "Ma'lumot qabul qilindi" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server xatosi' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
