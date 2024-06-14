import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [numberId, setNumberId] = useState('p');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchNumbers = async () => {
        try {
            const response = await axios.get(`http://localhost:9876/numbers/${numberId}`);
            setData(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch data');
            setData(null);
        }
    };

    return (
        <div className="App">
            <h1>Average Calculator</h1>
            <div>
                <select value={numberId} onChange={(e) => setNumberId(e.target.value)}>
                    <option value="p">Prime</option>
                    <option value="f">Fibonacci</option>
                    <option value="e">Even</option>
                    <option value="r">Random</option>
                </select>
                <button onClick={fetchNumbers}>Fetch Numbers</button>
            </div>
            {error && <div>{error}</div>}
            {data && (
                <div>
                    <h2>Window Previous State: {JSON.stringify(data.windowPrevState)}</h2>
                    <h2>Window Current State: {JSON.stringify(data.windowCurrState)}</h2>
                    <h2>New Numbers: {JSON.stringify(data.numbers)}</h2>
                    <h2>Average: {data.avg}</h2>
                </div>
            )}
        </div>
    );
}

export default App;
