import { Spin, SpinProps } from "antd";
import { FC } from "react";

const MainSpin: FC<SpinProps> = ({ fullscreen = true, ...props }) => {
  return <Spin fullscreen {...props}></Spin>;
};

export default MainSpin;
