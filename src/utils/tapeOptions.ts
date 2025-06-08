import tape01 from "../assets/Tape/tape-01.png";
import tape02 from "../assets/Tape/tape-02.png";
import tape03 from "../assets/Tape/tape-03.png";
import tape04 from "../assets/Tape/tape-04.png";
import tape05 from "../assets/Tape/tape-05.png";
import tape06 from "../assets/Tape/tape-06.png";
export type TapeTopOption = {
  src: string;
  rotation: string;
  top: string;
  left: string;
};

export type TapeBotOption = {
  src: string;
  rotation: string;
  bottom: string;
  right: string;
};
export const tapeBotOptions: TapeBotOption[] = [
  { src: tape01, rotation: "0deg", bottom: "-30px", right: "-27px" },
  { src: tape02, rotation: "-10deg", bottom: "-12px", right: "-35px" },
  { src: tape03, rotation: "-25deg", bottom: "-14px", right: "-25px" },
  { src: tape04, rotation: "-8deg", bottom: "-11px", right: "-22px" },
  { src: tape05, rotation: "-25deg", bottom: "-9px", right: "-19px" },
  { src: tape06, rotation: "-35deg", bottom: "-15px", right: "-28px" },
];
export const tapeTopOptions = [
  { src: tape01, rotation: "0deg", top: "-40px", left: "-35px" },
  { src: tape02, rotation: "-30deg", top: "-8px", left: "-25px" },
  { src: tape03, rotation: "-20deg", top: "-8px", left: "-25px" },
  { src: tape04, rotation: "-8deg", top: "-8px", left: "-25px" },
  { src: tape05, rotation: "-30deg", top: "-8px", left: "-25px" },
  { src: tape06, rotation: "-12deg", top: "-8px", left: "-25px" },
];
export function getDistinctTopAndBottomTape() {
  const topIndex = Math.floor(Math.random() * tapeTopOptions.length);
  let botIndex;
  do {
    botIndex = Math.floor(Math.random() * tapeBotOptions.length);
  } while (botIndex === topIndex); // only relevant if pools are same size and visually similar

  return {
    top: tapeTopOptions[topIndex],
    bottom: tapeBotOptions[botIndex],
  };
}
