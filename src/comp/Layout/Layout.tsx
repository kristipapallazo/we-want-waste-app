import { Button, Flex, Splitter } from "antd";
import SkipFilter from "../Filters/SkipFilters";
import SelectedSkipSection from "../SelectedSkipSection/SelectedSkipSection";
import SkipTable from "../Table/SkipTable";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";
import ProductGrid from "../ProductGrid/ProductGrid";
import { AgGridReact } from "ag-grid-react";
import { useRef } from "react";

export type GridRef = React.RefObject<AgGridReact<any> | null>;

const Layout = () => {
  const {
    layout,
    sizes: [left, right],
    setSizes,
    enabled,
    selectedSkip,
  } = useSkipPageCtx();
  const gridRef = useRef<AgGridReact>(null);

  return (
    <div style={{ height: "100%", width: "100%", flex: 1, overflow: "auto" }}>
      {/* <TopLabel /> */}
      {layout === "table" ? (
        <SkipTable ref={gridRef} />
      ) : (
        <Splitter
          onResize={setSizes}
          // layout="vertical"
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Splitter.Panel
            size={left}
            style={{ padding: 20 }}
            resizable={enabled}
            min="20%"
            max="80%"
          >
            <Flex
              vertical
              gap="middle"
              justify="space-between"
              style={{ height: "100%" }}
            >
              <SkipFilter />
            </Flex>
          </Splitter.Panel>
          <Splitter.Panel size={right} style={{ padding: 20 }}>
            <ProductGrid gridRef={gridRef} />
          </Splitter.Panel>
        </Splitter>
      )}

      {selectedSkip && <SelectedSkipSection gridRef={gridRef} />}
    </div>
  );
};

export default Layout;
