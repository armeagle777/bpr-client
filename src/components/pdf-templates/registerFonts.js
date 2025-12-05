import { Font } from "@react-pdf/renderer";

import Arial from "../../assets/Fonts/GHEAGrpalatReg.otf";
import BoldArial from "../../assets/Fonts/GHEAGpalatBld.otf";

let fontsRegistered = false;

const registerPdfFonts = () => {
  if (fontsRegistered) {
    return;
  }

  Font.register({
    family: "Arial",
    fontStyle: "normal",
    fontWeight: "normal",
    fonts: [
      {
        src: Arial,
      },
      {
        src: BoldArial,
        fontWeight: "bold",
      },
    ],
  });

  fontsRegistered = true;
};

export default registerPdfFonts;
