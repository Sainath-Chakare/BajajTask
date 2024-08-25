import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const customStyles = {
   container: (provided) => ({
       ...provided,
       backgroundColor: '#000', // Black background for container
   }),
   control: (provided) => ({
       ...provided,
       backgroundColor: '#000', // Black background for control
       border: '1px solid #444', // Slightly lighter border
       color: '#fff', // White font color for text
   }),
   singleValue: (provided) => ({
       ...provided,
       color: '#fff', // White color for selected value
   }),
   placeholder: (provided) => ({
       ...provided,
       color: '#aaa', // Light gray for placeholder
   }),
   menu: (provided) => ({
       ...provided,
       backgroundColor: '#000', // Black background for dropdown menu
       color: '#fff', // White font color for menu items
   }),
   option: (provided, state) => ({
       ...provided,
       backgroundColor: state.isSelected ? '#333' : '#000', // Black background for options, slightly lighter for selected
       color: '#fff', // White font color for options
       ':active': {
           backgroundColor: '#333', // Background color for active (hover) state
           color: '#fff', // White font color for active state
       }
   }),
   multiValue: (provided) => ({
       ...provided,
       backgroundColor: '#000', // Black background for multi-value tags
       color: '#fff', // White font color for tags
   }),
   multiValueLabel: (provided) => ({
       ...provided,
       color: '#fff', // White color for multi-value labels
   }),
   multiValueRemove: (provided) => ({
       ...provided,
       color: '#fff', // White color for remove button
       ':hover': {
           backgroundColor: '#333', // Background color for remove button on hover
           color: '#fff', // White color for text on hover
       }
   }),
};

const JsonInputForm = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
    ];

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Sanitize the input to ensure standard quotation marks are used
            const sanitizedJsonInput = jsonInput.replace(/[“”‘’]/g, '"');

            // Attempt to parse the sanitized input
            const json = JSON.parse(sanitizedJsonInput);

            // Debugging: Log the JSON object before sending it
            console.log("Parsed JSON:", json);

            // Send the JSON data to the backend
            // const response = await axios.post("http://localhost:8080/bfhl", json);
            const response = await axios.post("https://bajajapi-hshe.onrender.com/bfhl", json);

            // Debugging: Log the response data
            console.log("Response Data:", response.data);

            setResponseData(response.data);
        } catch (error) {
            console.error("Error:", error);
            if (error.response) {
                // The request was made and the server responded with a status code outside of the 2xx range
                console.error("Server Response Error:", error.response.data);
                alert(`API Error: ${error.response.data.message}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No Response Error:", error.request);
                alert("API request was made but no response was received.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error Message:", error.message);
                alert('Invalid JSON format or API request failed.');
            }
        }
    };

    const handleSelectChange = (selected) => {
        setSelectedOptions(selected);
    };

    const renderFilteredResponse = () => {
        if (!responseData) return null;

        let filteredData = [];
        selectedOptions.forEach(option => {
            if (responseData[option.value]) {
                filteredData.push(`${option.label}: ${responseData[option.value].join(', ')}`);
            }
        });

        return filteredData.length > 0 ? filteredData.join(' | ') : 'No data selected.';
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>API Input</label>
                <input
                    type="text"
                    value={jsonInput}
                    onChange={handleInputChange}
                    placeholder='{"data": ["A", "C", "z"]}'
                />
                <button type="submit">Submit</button>
            </form>
            {responseData && (
                <div>
                    <label>Multi Filter</label>
                    <Select
                        isMulti
                        options={options}
                        onChange={handleSelectChange}
                        styles={customStyles}
                    />
                    <div>Filtered Response</div>
                    <p>{renderFilteredResponse()}</p>
                </div>
            )}
        </div>
    );
};

export default JsonInputForm;
