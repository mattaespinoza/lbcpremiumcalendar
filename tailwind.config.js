module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Roboto", "Helvetica", "Arial", sans-serif'],
    },

    extend: {
      textShadow: {
        litecalendarblue: "-6px 0px 0px #1E72BD",
        calendarblue: "-6px 0px 0px #16488B",
      },
      colors: {
        calendarblue: "#16488B",
        litecalendarblue: "#1E72BD",
        red: "#FF0000",
        eventbggray: "#F4F7F9",
        yellow: "#FFFF00",
      },
      fontSize: {
        34: "34px",
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        Lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-textshadow")],
}


