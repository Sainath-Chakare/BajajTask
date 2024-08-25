// import React, { useState } from 'react';
// import axios from 'axios';
// import Select from 'react-select';

// const JsonInputForm = () => {
//     const [jsonInput, setJsonInput] = useState('');
//     const [responseData, setResponseData] = useState(null);
//     const [selectedOptions, setSelectedOptions] = useState([]);

//     const options = [
//         { value: 'alphabets', label: 'Alphabets' },
//         { value: 'numbers', label: 'Numbers' },
//         { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
//     ];

//     const handleInputChange = (e) => {
//         setJsonInput(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const json = JSON.parse(jsonInput);
//             const response = await axios.post("http://localhost:8080/bfhl", json);
//             setResponseData(response.data);
//         } catch (error) {
//             alert('Invalid JSON format or API request failed.');
//             console.error(error);
//         }
//     };

//     const handleSelectChange = (selected) => {
//         setSelectedOptions(selected);
//     };

//     const renderFilteredResponse = () => {
//         if (!responseData) return null;

//         let filteredData = [];
//         selectedOptions.forEach(option => {
//             if (responseData[option.value]) {
//                 filteredData.push(`${option.label}: ${responseData[option.value].join(', ')}`);
//             }
//         });

//         return filteredData.length > 0 ? filteredData.join(' | ') : 'No data selected.';
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label>API Input</label>
//                 <input
//                     type="text"
//                     value={jsonInput}
//                     onChange={handleInputChange}
//                     placeholder='{"data": ["A", "C", "z"]}'
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//             {responseData && (
//                 <div>
//                     <label>Multi Filter</label>
//                     <Select
//                         isMulti
//                         options={options}
//                         onChange={handleSelectChange}
//                     />
//                     <div>Filtered Response</div>
//                     <p>{renderFilteredResponse()}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default JsonInputForm;

import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

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
            const response = await axios.post("http://localhost:8080/bfhl", json);

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
                    />
                    <div>Filtered Response</div>
                    <p>{renderFilteredResponse()}</p>
                </div>
            )}
        </div>
    );
};

export default JsonInputForm;
