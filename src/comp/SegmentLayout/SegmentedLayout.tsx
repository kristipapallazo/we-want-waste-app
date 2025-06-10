import { Segmented } from "antd";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";
import { BsFillGrid3X3GapFill, BsTable } from "react-icons/bs";

const SegmentedLayout = () => {
  const { layout, setLayout } = useSkipPageCtx();
  return (
    <Segmented
      vertical
      options={[
        { value: "table", icon: <BsFillGrid3X3GapFill /> },
        { value: "Kanban", icon: <BsTable /> },
      ]}
      //   options={["table", "grid"]}
      value={layout}
      onChange={(value) => {
        setLayout(value as Layout);
      }}
    />
  );
};

export default SegmentedLayout;
