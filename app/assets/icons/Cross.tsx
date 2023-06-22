import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CrossIcon = (props: {size: number; color: string}) => (
  <Svg
    width={props.size}
    height={props.size}
    fill={props.color}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 5 5 19M5 5l14 14"
    />
  </Svg>
);
export default CrossIcon;
