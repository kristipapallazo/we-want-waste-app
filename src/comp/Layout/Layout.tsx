import { Button, Flex, Splitter, Switch } from "antd";
import SkipFilter from "../Filters/SkipFilters";
import SelectedSkipSection from "../SelectedSkipSection/SelectedSkipSection";
import SkipTable from "../Table/SkipTable";
// import TopLabel from "../TopLabel/TopLabel";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";
import ProductGrid from "../ProductGrid/ProductGrid";

const Layout = () => {
  const {
    layout,
    sizes: [left, right],
    setSizes,
    enabled,
    setEnabled,
    onResetSplitter,
    selectedSkip,
  } = useSkipPageCtx();

  return (
    <div style={{ height: "100%", width: "100%", flex: 1, overflow: "auto" }}>
      {/* <TopLabel /> */}
      {layout === "table" ? (
        <SkipTable />
      ) : (
        <Splitter
          onResize={setSizes}
          // layout="vertical"
          style={{
            /* height: 200 ,*/ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Splitter.Panel
            size={left}
            style={{ padding: 20 }}
            resizable={enabled}
            min="20%"
            max="80%"
          >
            <Flex vertical gap="middle" justify="space-between">
              <Switch
                value={enabled}
                onChange={() => setEnabled(!enabled)}
                checkedChildren="Enabled"
                unCheckedChildren="Disabled"
              />
              <Button onClick={onResetSplitter}>Reset</Button>
              <SkipFilter />
            </Flex>
          </Splitter.Panel>
          <Splitter.Panel size={right} style={{ padding: 20 }}>
            <ProductGrid />
          </Splitter.Panel>
        </Splitter>
      )}

      {selectedSkip && <SelectedSkipSection />}
    </div>
  );
};

export default Layout;
