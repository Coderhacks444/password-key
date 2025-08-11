import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import { EyeIcon, EyeSlashIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [newEntry, setNewEntry] = useState({ website: "", username: "", password: "" });
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState({});
  const [error, setError] = useState("");

  // ✅ Load passwords from localStorage on component mount
  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setPasswords(JSON.parse(storedPasswords));
    }
  }, []);

  // ✅ Update localStorage whenever passwords change
  useEffect(() => {
    if (passwords.length > 0) {
      localStorage.setItem("passwords", JSON.stringify(passwords));
    }
  }, [passwords]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  // ✅ Save or edit a password entry
  const saveOrEditPassword = () => {
    if (!newEntry.website || !newEntry.username || !newEntry.password) {
      setError("All fields are required.");
      return;
    }
    setError("");

    let updatedPasswords;
    if (editingId) {
      // Edit existing entry
      updatedPasswords = passwords.map((entry) =>
        entry.id === editingId ? { ...entry, ...newEntry } : entry
      );
      setEditingId(null);
    } else {
      // Add new entry with unique ID
      const newPassword = { ...newEntry, id: uuidv4() };
      updatedPasswords = [...passwords, newPassword];
    }

    setPasswords(updatedPasswords);
    setNewEntry({ website: "", username: "", password: "" });
  };

  // ✅ Edit a password entry
  const editPassword = (id) => {
    const passwordToEdit = passwords.find((entry) => entry.id === id);
    if (passwordToEdit) {
      setNewEntry(passwordToEdit);
      setEditingId(id);
    }
  };

  // ✅ Delete a password entry
  const deletePassword = (id) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      const updatedPasswords = passwords.filter((entry) => entry.id !== id);
      setPasswords(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    }
  };

  // ✅ Toggle password visibility
  const togglePasswordVisibility = (id) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          <span className="text-blue-600">Password</span> <span className="text-orange-400">Manager</span>
        </h1>

        {/* Add/Edit Password Form */}
        <div className="space-y-4 mb-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <label className="block text-gray-700">Website</label>
            <input
              type="text"
              name="website"
              value={newEntry.website}
              onChange={handleChange}
              placeholder="e.g., example.com"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword.form ? "text" : "password"}
                name="password"
                value={newEntry.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => ({ ...prev, form: !prev.form }))}
                className="absolute right-3 top-2 text-gray-600 hover:text-gray-800"
              >
                {showPassword.form ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-2"> {/* Centering the button */}
  <button
    onClick={saveOrEditPassword}
    className={`${
      editingId ? "bg-green-500" : "bg-blue-500"
    } text-white px-3 py-1 text-xs rounded-md shadow hover:bg-yellow-400 transition w-32`}
  >
    {editingId ? "Save Changes" : "Save Password"}
  </button>
</div>
          </div>

        {/* Password List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4"><span className="text-orange-300">Stored</span> <span className="text-emerald-300">Passwords</span></h2>
          {passwords.length > 0 ? (
            <ul className="space-y-4">
              {passwords.map((entry) => (
                <li
                  key={entry.id}
                  className="flex justify-between items-center p-4 bg-sky-200 border border-teal-300 rounded-lg"
                >
                  <div>
                    <p className="text-gray-800 font-medium">Website: {entry.website}</p>
                    <p className="text-gray-600">Username: {entry.username}</p>
                    <p className="text-gray-600">
                      Password: {showPassword[entry.id] ? entry.password : "••••••••"}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => editPassword(entry.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deletePassword(entry.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => togglePasswordVisibility(entry.id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {showPassword[entry.id] ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">No passwords saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
