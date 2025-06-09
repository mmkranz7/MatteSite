// utils/tornPaperOptions.ts
export type TornPaper = {
  src: string;
  rotation: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
};

const tornPaperSources = [
  "/assets/torn-paper1.png",
  "/assets/torn-paper2.png",
  "/assets/torn-paper3.png",
  // add your torn paper images here
];

export function getRandomTornPaper(): TornPaper {
  const src =
    tornPaperSources[Math.floor(Math.random() * tornPaperSources.length)];
  const rotation = `${Math.floor(Math.random() * 40 - 20)}deg`; // -20 to +20 degrees rotation

  // Optionally randomize positioning inside container
  return {
    src,
    rotation,
    top: "0",
    left: "0",
  };
}
