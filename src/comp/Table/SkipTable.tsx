import { forwardRef, useMemo } from "react";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ColGroupDef,
  AllCommunityModule,
  ModuleRegistry,
} from "ag-grid-community";
import dayjs from "dayjs";
import { Tag } from "antd";

ModuleRegistry.registerModules([AllCommunityModule]);

type ColumnDefs = (ColDef<Skip> | ColGroupDef<Skip>)[] | null;

const SkipTable = forwardRef<AgGridReact, {}>((props, ref) => {
  const { filteredSkips, setSelectedSkip } = useSkipPageCtx();

  const columnDefs = useMemo<ColumnDefs>(() => {
    if (filteredSkips.length === 0) return [];

    const checkboxColumn = {
      headerCheckboxSelection: false,
      checkboxSelection: true,
      headerName: "",
      width: 50,
      maxWidth: 50,
      resizable: false,
      cellStyle: { textAlign: "center" },
    };

    const dataColumns = Object.keys(filteredSkips[0])
      .filter((key) => key !== "id")
      .map((key) => {
        if (key === "size") {
          return {
            field: key as keyof Skip,
            headerName: "NAME",
            cellRenderer: (params: any) => `${params.value} Yard Skip`,
            cellStyle: { textAlign: "center" },
          };
        }

        if (
          key === "price_before_vat" ||
          key === "total_price" ||
          key === "transport_cost" ||
          key === "per_tonne_cost"
        ) {
          return {
            field: key as keyof Skip,
            headerName: key.replace(/_/g, " ").toUpperCase(),
            cellRenderer: (params: any) =>
              params.value ? `$${params.value.toFixed(2)}` : "",
            cellStyle: { textAlign: "center" },
          };
        }

        if (key === "vat") {
          return {
            field: key as keyof Skip,
            headerName: "VAT (%)",
            cellRenderer: (params: any) => `${params.value.toFixed(2)}%`,
            cellStyle: { textAlign: "center" },
          };
        }

        if (
          key === "allowed_on_road" ||
          key === "forbidden" ||
          key === "allows_heavy_waste"
        ) {
          return {
            field: key as keyof Skip,
            headerName: key.replace(/_/g, " ").toUpperCase(),
            cellRenderer: (params: any) => (
              <Tag color={params.value ? "green" : "red"}>
                {params.value ? "Yes" : "No"}
              </Tag>
            ),
            cellStyle: { textAlign: "center" },
          };
        }

        if (key === "created_at" || key.includes("date")) {
          return {
            field: key as keyof Skip,
            headerName: key.replace(/_/g, " ").toUpperCase(),
            cellRenderer: (params: any) => {
              const rawDate = params.value;
              return rawDate ? dayjs(rawDate).format("YYYY-MM-DD") : "";
            },
            cellStyle: { textAlign: "center" },
          };
        }

        return {
          field: key as keyof Skip,
          headerName: key.replace(/_/g, " ").toUpperCase(),
          cellStyle: { textAlign: "center" },
        };
      });

    const totalPriceColumn = {
      field: "total_price_after_vat" as keyof Skip,
      headerName: "TOTAL PRICE (AFTER VAT)",
      cellRenderer: (params: any) => {
        const priceBeforeVat = params.data?.price_before_vat || 0;
        const vat = params.data?.vat || 0;
        const totalPriceAfterVat =
          priceBeforeVat + (priceBeforeVat * vat) / 100;
        return `$${totalPriceAfterVat.toFixed(2)}`;
      },
      cellStyle: { textAlign: "center" },
    };

    const vatIndex = dataColumns.findIndex((col) => col.field === "vat");
    const updatedColumns = [...dataColumns];
    if (vatIndex !== -1) {
      updatedColumns.splice(vatIndex + 1, 0, totalPriceColumn);
    } else {
      updatedColumns.push(totalPriceColumn);
    }

    return [checkboxColumn, ...updatedColumns];
  }, [filteredSkips]);

  const rowData = useMemo(() => filteredSkips, [filteredSkips]);

  const defaultColDef = useMemo(
    () => ({
      editable: true,
      flex: 1,
      minWidth: 150,
      cellStyle: { textAlign: "center" },
    }),
    []
  );

  const onSelectionChanged = (event: any) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node: any) => node.data);
    setSelectedSkip(selectedData[0] || null);
  };

  return (
    <div style={{ height: "100%", width: "100%", padding: 20 }}>
      <AgGridReact
        ref={ref}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="single"
        onSelectionChanged={onSelectionChanged}
      />
    </div>
  );
});

export default SkipTable;
