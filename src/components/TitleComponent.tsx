import React from 'react';
import { fontFamilies } from '../constants/fontFamilies';
import TextComponent from './TextComponent';
import { globalStyles } from '../styles/globalStyles';
import { StyleProp, TextStyle } from 'react-native';
import { colors } from '../constants/colors';

interface Props {
  text: string;
  font?: string;
  size?: number;
  styles?: StyleProp<TextStyle>;
  color?: string;
  height?: number;
}

const TitleComponent = (props: Props) => {
  const {text, font, size, color, styles, height} = props;

  return (
    <TextComponent
      size={size ?? 20}
      font={font ?? fontFamilies.semibold}
      color={color}
      text={text}
      styles={[
        globalStyles.text,
        {
          fontFamily: font ?? fontFamilies.bold,
          fontSize: size ?? 16,
          lineHeight: height ? height : size ? size + 4 : 20,
          color: color ? color : colors.text,
          flex: 0,
        },
        styles,
      ]}
    />
  );
};

export default TitleComponent;
