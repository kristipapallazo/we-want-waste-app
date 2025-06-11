import { Button, Card, Typography, Space } from "antd";
// import { useNavigate } from "react-router-dom";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";

const { Title, Text } = Typography;

import { GridRef } from "../Layout/Layout";

interface SelectedSkipSectionProps {
  gridRef: GridRef;
}

const SelectedSkipSection = ({ gridRef }: SelectedSkipSectionProps) => {
  const { selectedSkip, setSelectedSkip, setCurrentIndex } = useSkipPageCtx();
  // const navigate = useNavigate();

  const onDeselect = () => {
    setSelectedSkip(null);
    if (gridRef?.current) {
      gridRef.current.api.deselectAll();
    }
  };

  const onNext = () => {
    if (selectedSkip) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };
  if (!selectedSkip) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "var(--main-blue)",
        opacity: 0.97,
        padding: "20px",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card
        // bordered={false}
        style={{
          background: "#ffffff",
          // margin: "0 auto",
          // maxWidth: "800px",
        }}
      >
        <Space
          direction="vertical"
          size="middle"
          style={{ width: "100%", textAlign: "center" }}
        >
          <Title level={4}>Selected Skip</Title>
          <Text>
            <strong>Name:</strong> {selectedSkip?.size || "N/A"} Yard Skip
          </Text>
          <Text>
            <strong>Price Before VAT:</strong> $
            {selectedSkip?.price_before_vat?.toFixed(2) || "N/A"}
          </Text>
          <Text>
            <strong>VAT:</strong> {selectedSkip?.vat?.toFixed(2) || "N/A"}%
          </Text>
          <Text>
            <strong>Total Price (After VAT):</strong> $
            {selectedSkip?.price_before_vat && selectedSkip?.vat
              ? (
                  selectedSkip.price_before_vat +
                  (selectedSkip.price_before_vat * selectedSkip.vat) / 100
                ).toFixed(2)
              : "N/A"}
          </Text>
          <footer style={{ textAlign: "center", marginTop: "16px" }}>
            <Space>
              <Button onClick={onDeselect} type="default">
                Deselect
              </Button>
              <Button onClick={onNext} type="primary">
                Next
              </Button>
            </Space>
          </footer>
        </Space>
      </Card>
    </div>
  );
};

export default SelectedSkipSection;
