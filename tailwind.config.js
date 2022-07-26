module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        brick: "url('./src/components/images/bricks.png')",
        world: "url('./src/components/images/world.jpg')",
        ChessGround: "url('./src/components/images/ChessGround.png')",
        horizon: "url('./src/components/images/horizon.jpg')",
        trees: "url('./src/components/images/trees.jpg')",
        street: "url('./src/components/images/street.jpg')",
      },
    },
  },
  plugins: [],
};
