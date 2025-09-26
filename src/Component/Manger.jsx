import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EyeIcon, EyeSlashIcon, PencilSquareIcon, TrashIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || 'default-key-' + Date.now();

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [newEntry, setNewEntry] = useState({ website: '', username: '', password: '' });
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});

  // Encryption functions
  const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY + masterPassword).toString();
  };

  const decrypt = (encryptedText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY + masterPassword);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return '';
    }
  };

  // Load encrypted passwords
  const getPasswords = () => {
    const storedPasswords = localStorage.getItem("encrypted_passwords");
    if (storedPasswords && isUnlocked) {
      try {
        const decryptedData = decrypt(storedPasswords);
        const parsedPasswords = JSON.parse(decryptedData || '[]');
        setPasswords(parsedPasswords);
      } catch {
        setPasswords([]);
      }
    }
  };
  
  useEffect(() => {
    if (isUnlocked) {
      getPasswords();
    }
  }, [isUnlocked]);

  // Save encrypted passwords
  const savePasswords = (updatedPasswords) => {
    setPasswords(updatedPasswords);
    const encryptedData = encrypt(JSON.stringify(updatedPasswords));
    localStorage.setItem('encrypted_passwords', encryptedData);
  };

  // Master password verification
  const unlockVault = () => {
    if (masterPassword.length < 6) {
      alert('Master password must be at least 6 characters');
      return;
    }
    setIsUnlocked(true);
  };

  const lockVault = () => {
    setIsUnlocked(false);
    setMasterPassword('');
    setPasswords([]);
    setShowPasswords({});
  };

  // Input validation
  const validateInput = (entry) => {
    if (!entry.website || !entry.username || !entry.password) {
      alert('All fields are required');
      return false;
    }
    if (entry.password.length < 4) {
      alert('Password must be at least 4 characters');
      return false;
    }
    return true;
  };

  // Handle input changes
  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = (id) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Save or Edit Password
  const saveOrEditPassword = () => {
    if (!validateInput(newEntry)) return;
    
    if (editingId) {
      const updatedPasswords = passwords.map((entry) =>
        entry.id === editingId ? { ...entry, ...newEntry, updatedAt: new Date().toISOString() } : entry
      );
      savePasswords(updatedPasswords);
      setEditingId(null);
    } else {
      const newPassword = { 
        ...newEntry, 
        id: uuidv4(), 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      savePasswords([...passwords, newPassword]);
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

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <ShieldCheckIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Secure Password Vault</h1>
            <p className="text-gray-600">Enter your master password to unlock</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && unlockVault()}
            />
            <button
              onClick={unlockVault}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Unlock Vault
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              <span className="text-green-700">&lt; Password</span>
              <span className="text-amber-400"> Manager &gt;</span>
            </h1>
            <h2 className="text-orange-300">
              Your own <span className="text-lime-500">&lt; passwords &gt;</span> manager
            </h2>
          </div>
          <button
            onClick={lockVault}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Lock Vault
          </button>
        </div>

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
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">Website: {entry.website}</p>
                    <p className="text-gray-600">Username: {entry.username}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-600">
                        Password: {showPasswords[entry.id] ? entry.password : '••••••••'}
                      </p>
                      <button
                        onClick={() => togglePasswordVisibility(entry.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords[entry.id] ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">Created: {new Date(entry.createdAt).toLocaleDateString()}</p>
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