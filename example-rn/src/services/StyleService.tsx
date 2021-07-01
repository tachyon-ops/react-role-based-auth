import { createContext } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

const PRIMARY_COLOR = 'black';
const SECONDARY_COLOR = 'darkgrey';
const BACKGROUND_COLOR = 'white';

type ColorsType = 'black' | 'white' | 'darkgrey';
type FontsType = 'WalsheimBold' | 'WalsheimLight';

type TypographyType = {
  title: ViewStyle | TextStyle;
  paragraph: ViewStyle | TextStyle;
  button: ViewStyle | TextStyle;
};
type StyleContextType = {
  font: {
    primary: {
      bold: FontsType;
      regular: FontsType;
      light: FontsType;
    };
  };
  color: {
    primary: ColorsType;
    secondary: ColorsType;
    background: ColorsType;
  };
  typography: TypographyType;
};

export const StyleContextValue: StyleContextType = {
  font: {
    primary: {
      bold: 'WalsheimBold',
      regular: 'WalsheimLight',
      light: 'WalsheimLight',
    },
  },
  color: {
    primary: PRIMARY_COLOR,
    secondary: SECONDARY_COLOR,
    background: BACKGROUND_COLOR,
  },
  typography: {
    title: {
      fontFamily: 'WalsheimBold',
      fontSize: 30,
      color: PRIMARY_COLOR,
      textAlign: 'center',
    },
    paragraph: {
      fontFamily: 'WalsheimLight',
      fontSize: 20,
      color: SECONDARY_COLOR,
    },
    button: {
      fontFamily: 'WalsheimLight',
      fontSize: 30,
      color: BACKGROUND_COLOR,
    },
  },
};

export const StyleContext = createContext(StyleContextValue);
