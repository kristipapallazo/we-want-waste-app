import { Breadcrumb } from "antd";
import { useState } from "react";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";

interface BreadcrumbItem {
  path: string;
  label: string;
}

const BreadcrumbSteps = () => {
  const [breadcrumbs] = useState<BreadcrumbItem[]>([
    { path: "postcode", label: "Postcode" },
    { path: "waste-type", label: "Waste Type" },
    { path: "select-skip", label: "Select Skip" },
    { path: "permit-check", label: "Permit Check" },
    { path: "choose-date", label: "Choose Date" },
    { path: "payment", label: "Payment" },
  ]);

  const { currentIndex, setCurrentIndex, selectedSkip } = useSkipPageCtx();

  const goToStep = (index: number) => {
    // Prevent navigation to steps after "Select Skip" if no skip is selected
    if (index > 2 && !selectedSkip) {
      return;
    }
    setCurrentIndex(index);
  };

  // Map breadcrumbs to items for the Breadcrumb component
  const breadcrumbItems = breadcrumbs.map((crumb, index) => ({
    key: crumb.path,
    title: (
      <span
        style={{
          cursor: index > 2 && !selectedSkip ? "not-allowed" : "pointer",
          color:
            index === currentIndex
              ? "black"
              : index > 2 && !selectedSkip
              ? "gray"
              : "blue",
          fontWeight: index === currentIndex ? "bold" : "normal",
        }}
        onClick={() => goToStep(index)}
      >
        {crumb.label}
      </span>
    ),
  }));

  return <Breadcrumb items={breadcrumbItems} />;
};

export default BreadcrumbSteps;
