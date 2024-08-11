import React, { useState, useEffect } from 'react';
import './minor.css';
/**
 * App component that handles CRUD operations
 */
function App() {
  /**
   * State variables for data, name, age, and id
   */
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState('');

  /**
   * Effect hook to retrieve data from local storage on mount
   */
  useEffect(() => {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  /**
   * Handle form submission to create new data
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { name, age, id: Date.now() };
    setData([...data, newData]);
    localStorage.setItem('data', JSON.stringify([...data, newData]));
    setName('');
    setAge('');
  };

  /**
   * Handle update of existing data
   */
  const handleUpdate = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, name, age };
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem('data', JSON.stringify(updatedData));
  };

  /**
   * Handle deletion of data
   */
  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
    localStorage.setItem('data', JSON.stringify(filteredData));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">CRUD App</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">Create</button>
      </form>
      <ul className="data-list">
        {data.map((item) => (
          <li key={item.id} className="data-item">
            <span className="data-name">{item.name}</span>
            <span className="data-age">{item.age}</span>
            <button onClick={() => handleUpdate(item.id)} className="data-button update-button">Update</button>
            <button onClick={() => handleDelete(item.id)} className="data-button delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;