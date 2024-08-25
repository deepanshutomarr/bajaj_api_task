import React, { useState } from 'react';
import './App.css';

const API_URL = "https://bajaj-1un8hkl2c-deepanshu-tomars-projects.vercel.app/bfhl"; 
function App() {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const jsonData = JSON.parse(inputData);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert('Invalid JSON or Error in API call');
    }
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((option) => option !== value)
        : [...selectedOptions, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    
    const displayData = [];
    if (selectedOptions.includes('Numbers') && response.numbers) {
      displayData.push(`Numbers: ${response.numbers.join(',')}`);
    }
    if (selectedOptions.includes('Alphabets') && response.alphabets) {
      displayData.push(`Alphabets: ${response.alphabets.join(',')}`);
    }
    if (selectedOptions.includes('Highest Lowercase') && response.highest_lowercase_alphabet) {
      displayData.push(`Highest Lowercase: ${response.highest_lowercase_alphabet.join(',')}`);
    }
    return displayData.length > 0 ? displayData.join(' | ') : 'Select a filter to display data';
  };

  return (
    <div className="App">
      <h1>21BIT0383</h1>
      <textarea
        placeholder='Enter JSON data'
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <select multiple onChange={handleOptionChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest Lowercase">Highest Lowercase</option>
          </select>
          <div className="response">
            <p>Filtered Response:</p>
            {renderResponse()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
