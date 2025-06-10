import { useEffect, useState } from "react";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";
import { AgGridReact } from "ag-grid-react";

import {
  ColDef,
  ColGroupDef,
  AllCommunityModule,
  ModuleRegistry,
  //   themeBalham,
  //   themeQuartz,
  // ClientSideRowModelModule,
  // ColumnApiModule,
  // ModuleRegistry,
  // ValidationModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

type ColumnDefs = (ColDef<Skip> | ColGroupDef<Skip>)[] | null;

const SkipTable = () => {
  const [rowData, setRowData] = useState<Skips>([]);
  const [columnDefs, setColumnDefs] = useState<ColumnDefs>([]);

  const { filteredSkips } = useSkipPageCtx();

  useEffect(() => {
    const col: ColumnDefs =
      filteredSkips.length > 0
        ? Object.keys(filteredSkips[0]).flatMap((k) =>
            k === "id" ? [] : { field: k as keyof Skip }
          )
        : [];

    setRowData(filteredSkips);
    setColumnDefs(col);
  }, [filteredSkips]);

  const defaultColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
  };

  return (
    <div style={{ height: "200px", width: "100%", padding: 20 }}>
      <AgGridReact
        // theme={themeBalham}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default SkipTable;
