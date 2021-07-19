import { css, Global } from "@emotion/react";
import {
  Box,
  useColorStyle,
  useColorMode,
  useTheme,
  Flex,
  ToggleSwitch
} from "@trendmicro/react-styled-ui";

import Calendar from "./Calendar";
import TimeInput from "./TimeInput/TimeInput";

export default function App() {
  const [colorMode, setColorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const { fontSizes, lineHeights } = useTheme();
  const backgroundColor = colorStyle.background.primary;
  const color = colorStyle.text.primary;

  const changeTheme = () => {
    const nextColorMode = colorMode === "light" ? "dark" : "light";
    setColorMode(nextColorMode);
  };

  return (
    <>
      <Global
        styles={css`
          body {
            font-size: ${fontSizes.sm};
            line-height: ${lineHeights.sm};
          }
        `}
      />
      <Flex
        align="center"
        justify="flex-end"
        p="6x"
        backgroundColor={backgroundColor}
      >
        <ToggleSwitch
          pr="1x"
          id="theme-switch"
          checked={colorMode === "dark"}
          onChange={changeTheme}
        />
        <label htmlFor="theme-switch">{colorMode}</label>
      </Flex>
      <Box
        backgroundColor={backgroundColor}
        color={color}
        fontSize="sm"
        lineHeight="sm"
        height="100vh"
        p="6x"
      >
        <h1>Time Input</h1>
        <Calendar />
        <TimeInput
          mt="3x"
          onChange={(value, isValid) => console.log(value, isValid)}
        />
      </Box>
    </>
  );
}
