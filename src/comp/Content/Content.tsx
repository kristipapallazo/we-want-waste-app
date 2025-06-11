import { FC, lazy, Suspense } from "react";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";
import MainSpin from "../../UI/AntD/MainSpin/MainSpin";

const AllSkips = lazy(() => import("../AllSkips/AllSkips"));

const OutOfScope: FC<{ name: string }> = ({ name }) => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ color: "red" }}>Out of task scope</div>
      <div>{`${name} Content`}</div>
    </div>
  );
};

const StepContent = () => {
  const { currentIndex } = useSkipPageCtx();

  return (
    <Suspense fallback={<MainSpin />}>
      {(() => {
        switch (currentIndex) {
          case 0:
            return <OutOfScope name="Postcode" />;
          case 1:
            return <OutOfScope name="Waste Type" />;
          case 2:
            return <AllSkips />;
          case 3:
            return <OutOfScope name="Permit Check" />;
          case 4:
            return <OutOfScope name="Choose Date" />;
          case 5:
            return <OutOfScope name="Payment" />;
          default:
            return <OutOfScope name="Invalid" />;
        }
      })()}
    </Suspense>
  );
};

export default StepContent;
