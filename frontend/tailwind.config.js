module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['"Mukta"'],
      'mono': ['"Ubuntu Mono"']
    },
        backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#192F4F',
      'secondary': '#3C516F',
      'selected': '#3D5578',
      'appbar' : '#0E1621'
    })
  },
  plugins: [],
};
