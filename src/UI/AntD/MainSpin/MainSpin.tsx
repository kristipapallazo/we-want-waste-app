import { Spin, SpinProps } from "antd";
import { FC /* ReactNode */ } from "react";

// interface Props {
//   children: ReactNode;s
// }
const MainSpin: FC<SpinProps> = ({ fullscreen = true, ...props }) => {
  return (
    <Spin fullscreen {...props}>
      {/* {children} */}
    </Spin>
  );
};

export default MainSpin;
