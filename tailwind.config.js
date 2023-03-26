/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}"
  ],
  theme: {
    extend: {
      colors: {
        "day-cloud-0": "#70b5ff",
        "day-cloud-25": "#6e9ed1",
        "day-cloud-50": "#617c99",
        "day-cloud-75": "#465360",

        "night-cloud-0": "#3357ce",
        "night-cloud-25": "#3a55af",
        "night-cloud-50": "#36477e",
        "night-cloud-75": "#2d3549"
      }
    }
  },
  plugins: [],
  safelist: [
    "bg-day-cloud-0",
    "bg-day-cloud-25",
    "bg-day-cloud-50",
    "bg-day-cloud-75",

    "bg-night-cloud-0",
    "bg-night-cloud-25",
    "bg-night-cloud-50",
    "bg-night-cloud-75"
  ]

};
