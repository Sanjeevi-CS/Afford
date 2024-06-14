import express from 'express';
import axios from 'axios';
const app = express();

const WINDOW_SIZE = 10;
const THIRD_PARTY_API = "http://20.244.56.144/test/number";
const QUALIFIED_IDS = { 'p': 'prime', 'f': 'fibonacci', 'e': 'even', 'r': 'random' };

let numbersStore = [];

const fetchNumbers = async (numberType) => {
    try {
        const response = await axios.get(`${THIRD_PARTY_API}/${numberType}`, { timeout: 500 });
        return response.data.numbers || [];
    } catch (error) {
        console.error(`Error fetching numbers: ${error.message}`);
        return [];
    }
};

app.get('/numbers/:numberid', async (req, res) => {
    const numberid = req.params.numberid;
    if (!QUALIFIED_IDS[numberid]) {
        return res.status(400).json({ error: "Invalid number ID" });
    }

    const numberType = QUALIFIED_IDS[numberid];
    const newNumbers = await fetchNumbers(numberType);
    const uniqueNewNumbers = newNumbers.filter(num => !numbersStore.includes(num));

    const prevState = [...numbersStore];
    numbersStore = [...numbersStore, ...uniqueNewNumbers].slice(-WINDOW_SIZE);

    const avg = numbersStore.length ? (numbersStore.reduce((acc, val) => acc + val, 0) / numbersStore.length).toFixed(2) : 0;

    res.json({
        windowPrevState: prevState,
        windowCurrState: numbersStore,
        numbers: uniqueNewNumbers,
        avg: avg
    });
});

const PORT = 9876;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
