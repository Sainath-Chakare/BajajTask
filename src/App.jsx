import './App.css'
import React from 'react';
import JsonInputForm from './JsonInputForm';

function App() {
  React.useEffect(() => {
      document.title = "21BCE5291"; // Replace with your roll number
  }, []);

  return (
      <div className="App">
          <header className="App-header">
              <h1>API Input Form</h1>
              <JsonInputForm />
          </header>
      </div>
  );
}

export default App
