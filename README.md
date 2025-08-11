# Password Manager

Welcome to **Password Manager**!  
A secure, user-friendly application for storing and managing your passwords safely.

![App Icon](public/logo.png)

## Features

- **Add, Edit, Delete Passwords:** Easily manage your credentials for different sites and services.
- **Strong Encryption:** Your passwords are stored securely using modern encryption standards.
- **Search & Filter:** Quickly find the passwords you need.
- **User Authentication:** Sign up and sign in to access your personal vault.
- **Cross-Platform:** Built with React and Vite for a fast, responsive experience.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Coderhacks444/password-manger.git
   cd password-manger
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Usage

- **Add a Password:** Click the "Add" button and fill in the details.
- **Edit a Password:** Select a password and click "Edit."
- **Delete a Password:** Click the "Delete" icon next to a password entry.
- **Search:** Use the search bar to filter your saved passwords.

## Security

- All passwords are encrypted before being saved.
- Only authenticated users can access their vault.
- Never share your master password with anyone.

## Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/) for code quality

## Adding an Icon

1. Place your icon image (e.g., `logo.png` or `favicon.ico`) in the `public/` directory.
2. Reference the icon in your `public/index.html`:
   ```html
   <link rel="icon" type="image/png" href="/logo.png" />
   ```
3. The icon will now appear in the browser tab and can be used in the app as needed.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Note:** This is a personal project. Always use unique, strong passwords for each account and consider additional security practices for sensitive data.
