import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
} from "@tanstack/react-table";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
  useMemo,
} from "react";
import style from "../../styles/table/Table.module.css";

type Deliveries = {
  NomeDoCliente: String;
  Peso: Number;
  Endereço: {
    Logradouro: String;
    Número: String;
    Bairro: String;
    Complemento: String;
    Cidade: String;
    Estado: String;
    País: String;
    Geolocalização: {
      Latitude: [Number];
      Longitude: [Number];
    };
  };
};

function Table1({ data }: any) {
  const columns = useMemo<ColumnDef<Deliveries>[]>(
    () => [
      {
        header: "Nome",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorFn: (row) => row.NomeDoCliente,
      },
      {
        header: "Rua",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorFn: (row) => row.Endereço.Logradouro,
      },
      {
        header: "Cidade",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorFn: (row) => row.Endereço.Cidade,
      },
      {
        header: "País",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorFn: (row) => row.Endereço.País,
      },
      {
        header: "Peso",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorFn: (row) => row.Peso,
      },
      {
        header: "Lat",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorFn: (row) => row.Endereço.Geolocalização.Latitude,
      },
      {
        header: "Lng",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorFn: (row) => row.Endereço.Geolocalização.Longitude,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <>
      <div className={style.table_wrapper}>
        <table className={style.table}>
          <thead className={style.table_head}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanFilter() ? (
                            <div>
                              {/* <Filter column={header.column} table={table} /> */}
                            </div>
                          ) : null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className={style.table_body}>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table1;
