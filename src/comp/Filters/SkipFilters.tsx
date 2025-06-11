import { useCallback, useEffect, useState } from "react";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";
import {
  Input,
  Select,
  Slider,
  Form,
  Row,
  Col,
  Button,
  Switch,
  Divider,
  Typography,
} from "antd";

import {
  FilterOutlined,
  ReloadOutlined,
  NumberOutlined,
  PoundOutlined,
  EnvironmentOutlined,
  CarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Title } = Typography;

const SkipFilter = () => {
  const {
    filteredSkips,
    onResetFilters,
    filters: gFilters,
    setFilters: onHandleFiltersUpdate,
    enabled,
    onEnableSplitter,
    onResetSplitter,
  } = useSkipPageCtx();

  const [filters, setFilters] = useState(gFilters);

  useEffect(() => {
    setFilters(gFilters);
  }, [gFilters]);

  interface Filters {
    size?: string;
    price?: [number, number];
    postcode?: string;
    allowed_on_road?: boolean;
    allowes_heavy_waste?: boolean;
  }

  const handleChange = (
    changed: keyof Filters,
    value: Filters[keyof Filters]
  ) => {
    setFilters((prev) => ({ ...prev, [changed]: value }));
  };

  const applyFilters = useCallback(() => {
    onHandleFiltersUpdate(filters);
  }, [filters]);

  return (
    <div
      // bordered={false}
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        padding: "20px",
        background: "#ffffff",
        flex: 1,
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "16px", flexShrink: 0 }}
      >
        <Title level={4} style={{ margin: "0 auto 10px", textAlign: "center" }}>
          <FilterOutlined /> Filter Skips
        </Title>
        <div
          style={{
            width: "100%",
            margin: "0 auto 10px",
            display: "grid",
            gridTemplateColumns: "auto auto",
            gap: "10px",
          }}
        >
          <Button
            type={enabled ? "primary" : "default"}
            onClick={onEnableSplitter}
          >
            {enabled ? "Enabled" : "Disabled"} Splitter
          </Button>
          <Button onClick={onResetSplitter}>Reset Splitter</Button>
        </div>
        <Button
          icon={<ReloadOutlined />}
          onClick={onResetFilters}
          size="middle"
          type="primary"
          style={{ width: "100%" }}
        >
          Reset Filters
        </Button>
      </Row>

      <Form layout="vertical" onFinish={applyFilters} style={{ flex: 1 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              label={
                <span>
                  <NumberOutlined /> Size
                </span>
              }
            >
              <Select
                allowClear
                value={filters.size}
                onChange={(val) => handleChange("size", String(val))}
                placeholder="Select size"
              >
                {[...new Set(filteredSkips.map((s) => s.size))].map((size) => (
                  <Option key={size} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              label={
                <span>
                  <PoundOutlined /> Price Range
                </span>
              }
            >
              <Slider
                range
                min={0}
                max={1000}
                value={filters.price as [number, number]}
                onChange={(val: number[]) =>
                  handleChange("price", val as [number, number])
                }
                tooltip={{ open: true }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              label={
                <span>
                  <EnvironmentOutlined /> Postcode
                </span>
              }
            >
              <Input
                placeholder="Enter postcode"
                value={filters.postcode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("postcode", e.target.value)
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ margin: "16px 0" }} />{" "}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              label={
                <span>
                  <CarOutlined /> Allowed on Road
                </span>
              }
            >
              <Switch
                checked={filters.allowed_on_road}
                onChange={(checked) => handleChange("allowed_on_road", checked)}
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              label={
                <span>
                  <DeleteOutlined /> Heavy Waste
                </span>
              }
            >
              <Switch
                checked={filters.allowes_heavy_waste}
                onChange={(checked) =>
                  handleChange("allowes_heavy_waste", checked)
                }
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Apply Filters
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SkipFilter;
