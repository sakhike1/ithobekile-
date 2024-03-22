/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "ebony-clay": "#252641",
        logan: "#B2B3CF",
        commet: "#626381",
        "fountain-blue": "#49BBBD",
        scorpion: "#5B5B5B",
        "tahiti-gold": "#F48C06",
        denim: "#136CB5",
        minsk: "#2F327D",
        "robins-egg-blue": "#00CBB8",
        "storm-gray": "#696984",
        "piction-blue": "#29B9E7",
        "cornflower-blue": "#5B72EE",
      },
    },
  },
  /* FIXME: tailwind and material styles conflicting */
  // plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
