import React from 'react';
import RNMarkdown from 'react-native-markdown-display';
import { useColorModeValue } from '../styles/theme';

export default function Markdown({ children, style, ...props }) {
  const baseTextColor = useColorModeValue('rgb(23 23 23)', 'rgb(254 254 255)');

  const componentStyle = {
    body: {
      color: baseTextColor,
    },
    ...style,
  };

  return (
    <RNMarkdown style={componentStyle} mergeStyle={true} {...props}>
      {children}
    </RNMarkdown>
  );
}
