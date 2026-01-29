import { Gomoku } from "./Gomoku";

export default {
  title: "Games/Gomoku",
  component: Gomoku,
  argTypes: {
    boardSize: {
      control: { type: "range", min: 5, max: 19, step: 1 },
      name: "Board Size (NxN)",
    },
    blackStoneColor: {
      control: "color",
      name: "Black Stone Color",
    },
    whiteStoneColor: {
      control: "color",
      name: "White Stone Color",
    },
    boardColor: {
      control: "color",
      name: "Board Background",
    },
  },
};

export const InteractiveGame = {
  args: {
    boardSize: 15,
    blackStoneColor: "#1a1a1a",
    whiteStoneColor: "#f0f0f0",
    boardColor: "#d4a373",
  },
};

export const SmallBlitz = {
  args: {
    boardSize: 8,
    blackStoneColor: "#01080e",
    whiteStoneColor: "#efe9e8",
    boardColor: "#a0d4e0",
  },
};
