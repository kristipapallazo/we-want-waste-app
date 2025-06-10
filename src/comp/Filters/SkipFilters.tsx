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
  Card,
  Switch,
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

const SkipFilter = () => {
  const {
    filteredSkips,
    onResetFilters,
    filters: gFilters,
    setFilters: onHandleFiltersUpdate,
  } = useSkipPageCtx();

  const [filters, setFilters] = useState(gFilters);

  useEffect(() => {
    /* Todo: check if you need this approach */
    setFilters(gFilters);
  }, [gFilters]);

  // Handle filter changes
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

  // Apply filters
  const applyFilters = useCallback(() => {
    onHandleFiltersUpdate(filters);
  }, [filters]);

  return (
    <Card
      title={
        <span>
          <FilterOutlined /> Filter Skips
        </span>
      }
      bordered={false}
      style={{ marginBottom: 24, boxShadow: "0 2px 8px #f0f1f2" }}
      extra={
        <Button icon={<ReloadOutlined />} onClick={onResetFilters} size="small">
          Reset
        </Button>
      }
    >
      <Form layout="vertical" onFinish={applyFilters}>
        <Row gutter={[16, 8]}>
          <Col xs={24} sm={12} md={6}>
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
          <Col xs={24} sm={12} md={8}>
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
                onChange={(val: [number, number]) => handleChange("price", val)}
                tooltip={{ open: true }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
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
          <Col xs={24} sm={12} md={4}>
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
          <Col xs={24} sm={12} md={4}>
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
          <Col
            xs={24}
            sm={24}
            md={4}
            style={{ display: "flex", alignItems: "end" }}
          >
            <Button type="primary" htmlType="submit" block>
              Apply
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SkipFilter;
