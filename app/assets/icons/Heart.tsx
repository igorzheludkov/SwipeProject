import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const HeartIcon = (props: {size: number; color: string}) => (
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
      d="M9 11.286 10.8 13 15 9m-3-2.409-.154-.164c-1.978-2.096-5.249-1.85-6.927.522-1.489 2.106-1.132 5.085.806 6.729L12 19l6.275-5.322c1.938-1.645 2.295-4.623.806-6.729-1.678-2.372-4.949-2.618-6.927-.522L12 6.591Z"
    />
  </Svg>
);
export default HeartIcon;
