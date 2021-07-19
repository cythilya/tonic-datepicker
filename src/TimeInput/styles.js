import { useColorMode } from "@trendmicro/react-styled-ui";

const colorProps = {
  light: {
    color: "black:secondary"
  },
  dark: {
    color: "white:secondary"
  }
};

const useIconStyle = (props) => {
  const [colorMode] = useColorMode();
  return {
    color: colorProps[colorMode]
  };
};

const useTimeInputErrorStyle = (props) => {
  return {
    borderColor: "red:50",
    _focus: {
      borderColor: "red:50"
    },
    _hover: {
      borderColor: "red:50"
    }
  };
};

export { useIconStyle, useTimeInputErrorStyle };
