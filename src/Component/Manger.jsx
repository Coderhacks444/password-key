import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID
import { EyeIcon, EyeSlashIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

const API_URL = 'http://localhost:3000'; // Update with correct endpoint

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [newEntry, setNewEntry] = useState({ website: '', username: '', password: '' });
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch passwords from API
  const fetchPasswords = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Failed to fetch passwords from API:', error);
      return [];
    }
  };

  // Load passwords from API or localStorage
  const getPasswords = async () => {
    try {
      const apiPasswords = await fetchPasswords();
      if (apiPasswords) {
        const passwordsWithIds = apiPasswords.map((entry) =>
          entry.id ? entry : { ...entry, id: uuidv4() }
        );
        setPasswords(passwordsWithIds);
        localStorage.setItem("passwords", JSON.stringify(passwordsWithIds));
      }
    } catch (error) {
      console.error("Failed to fetch passwords from API:", error);
      const storedPasswords = localStorage.getItem("passwords");
      if (storedPasswords) {
        const parsedPasswords = JSON.parse(storedPasswords);
        setPasswords(parsedPasswords);
      }
    }
  };
  
  useEffect(() => {
    getPasswords();
  }, []);
  

  // Save passwords to API & localStorage
  const savePasswords = async (updatedPasswords) => {
    setPasswords(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));

    try {
      await fetch(API_URL, {
        method: 'POST', // Adjust based on backend
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPasswords),
      });
    } catch (error) {
      console.error('Error saving passwords to API:', error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  // Save or Edit Password
  const saveOrEditPassword = () => {
    if (editingId) {
      const updatedPasswords = passwords.map((entry) =>
        entry.id === editingId ? { ...entry, ...newEntry } : entry
      );
      savePasswords(updatedPasswords);
      setEditingId(null);
    } else {
      if (newEntry.website && newEntry.username && newEntry.password) {
        const newPassword = { ...newEntry, id: uuidv4() };
        savePasswords([...passwords, newPassword]);
      }
    }
    setNewEntry({ website: '', username: '', password: '' });
  };

  // Edit a password
  const editPassword = (id) => {
    const passwordToEdit = passwords.find((entry) => entry.id === id);
    if (passwordToEdit) {
      setNewEntry(passwordToEdit);
      setEditingId(id);
    }
  };

  // Delete a password
  const deletePassword = (id) => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      const updatedPasswords = passwords.filter((entry) => entry.id !== id);
      savePasswords(updatedPasswords);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          <span className="text-green-700">&lt; Password</span>
          <span className="text-amber-400"> Manager &gt;</span>
        </h1>
        <h2 className="text-orange-300">
          Your own <span className="text-lime-500">&lt; passwords &gt;</span> manager
        </h2>

        {/* Add/Edit Password Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700">Website</label>
            <input
              type="text"
              name="website"
              value={newEntry.website}
              onChange={handleChange}
              placeholder="e.g., example.com"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={newEntry.username}
              onChange={handleChange}
              placeholder="e.g., john_doe"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={newEntry.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button
            onClick={saveOrEditPassword}
            className={`${editingId ? 'bg-green-500' : 'bg-yellow-500'} text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition`}
          >
            {editingId ? 'Save Changes' : 'Save Password'}
          </button>
        </div>

        {/* Password List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Stored Passwords</h2>
          {passwords.length > 0 ? (
            <ul className="space-y-4">
              {passwords.map((entry) => (
                <li key={entry.id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-gray-800 font-medium">Website: {entry.website}</p>
                    <p className="text-gray-600">Username: {entry.username}</p>
                    <p className="text-gray-600">Password: {entry.password}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button onClick={() => editPassword(entry.id)} className="text-blue-500 hover:text-blue-700">
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => deletePassword(entry.id)} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No passwords saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
