module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Correct pattern to avoid matching node_modules
    './public/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};