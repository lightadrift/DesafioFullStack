import axios from "axios";
import { URL } from "../../utils/API_URLS";
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
import { useState, useEffect, useMemo } from "react";
import style from "../../styles/table/Table.module.css";

type Deliveries = {
  NomeDoCliente: string;
  Peso: number;
  Endereço: {
    Logradouro: string;
    Número: string;
    Bairro: string;
    Complemento: string;
    Cidade: string;
    Estado: string;
    País: string;
    Geolocalização: {
      Latitude: string;
      Longitude: string;
    };
  };
  _id: string;
};
type ClientProps = {
  data: any;
  setRerender: (active: boolean) => void;
};


function Table1({ data, setRerender }: ClientProps) {
  console.log(data)
  async function DeleteOne(id: string) {
    const type = "DeleteOne";
    const data = await axios.delete(URL, {
      data: {
        type,
        id
      },
    });
    if (data.status === 200) {
      setRerender(true);
    }
  }
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
        accessorFn: (row) =>
          String(row.Endereço.Geolocalização.Latitude).substring(0, 9),
      },
      {
        header: "Lng",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorFn: (row) =>
          String(row.Endereço.Geolocalização.Longitude).substring(0, 9),
      },
      {
        header: "Delete",
        cell: (row) => (
          <div>
            <button onClick={() => DeleteOne(row.row.original._id)}>
              Deletar
            </button>
          </div>
        ),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className={style.container}>
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
        <div className={style.pagination_buttons}>
          <div
            style={{
              gap: "0.2rem",
              display: "flex ",
            }}
          >
            <button
              className={style.button}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className={style.button}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className={style.button}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className={style.button}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
          </div>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default Table1;
