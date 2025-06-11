import { Flex } from "antd";
import BreadcrumbSteps from "../BreadcrumbSteps/BreadcrumbSteps";
import SegmentedLayout from "../SegmentLayout/SegmentedLayout";

const boxStyle: React.CSSProperties = {
  width: "100%",
  height: 120,
  borderRadius: 6,
  // border: "1px solid #40a9ff",
};
const TopLabel = () => {
  return (
    <Flex style={boxStyle} justify="space-between" align="center">
      <BreadcrumbSteps />
      <SegmentedLayout />
    </Flex>
  );
};

export default TopLabel;
