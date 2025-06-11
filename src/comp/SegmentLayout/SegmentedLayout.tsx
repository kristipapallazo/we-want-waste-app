import { Segmented } from "antd";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";
import { BsFillGrid3X3GapFill, BsTable } from "react-icons/bs";

const SegmentedLayout = () => {
  const { layout, setLayout } = useSkipPageCtx();
  return (
    <Segmented
      // vertical
      options={[
        { value: "grid", icon: <BsFillGrid3X3GapFill /> },
        { value: "table", icon: <BsTable /> },
      ]}
      value={layout}
      onChange={(value) => {
        setLayout(value as Layout);
      }}
    />
  );
};

export default SegmentedLayout;
