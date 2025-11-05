import React from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    ColumnDef,
    flexRender,
    Row,
    PaginationState,
} from "@tanstack/react-table";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableColumnHeader } from "./SortableColumnHeader";
import { ColumnFilter } from "./Filters/ColumnFilter";
import "../styles.css";

export type AdvancedTableProps<T extends object> = {
    data: T[];
    columns: ColumnDef<T, any>[];
    className?: string;
    tableClassName?: string;
    headerClassName?: string;
    rowClassName?: string;
    cellClassName?: string;
    onColumnOrderChange?: (newOrder: string[]) => void;
    pageSize?: number;
};

export function AdvancedTable<T extends object>({
    data,
    columns,
    className = "",
    tableClassName = "",
    headerClassName = "",
    rowClassName = "",
    cellClassName = "",
    onColumnOrderChange,
    pageSize = 10,
}: AdvancedTableProps<T>) {
    const defaultOrder = columns.map((c) => c.id ?? (c as any).accessorKey ?? JSON.stringify(c.header));
    const [columnOrder, setColumnOrder] = React.useState<string[]>(defaultOrder);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize });

    const sensors = useSensors(useSensor(PointerSensor));

    const table = useReactTable({
        data,
        columns,
        state: { columnOrder, globalFilter, pagination } as any,
        onColumnOrderChange: setColumnOrder,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // ✅ pagination fix
    });

    React.useEffect(() => {
        table.setPageSize(pageSize);
    }, [pageSize]);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || !active) return;
        if (active.id !== over.id) {
            const oldIndex = columnOrder.indexOf(active.id);
            const newIndex = columnOrder.indexOf(over.id);
            const newOrder = arrayMove(columnOrder, oldIndex, newIndex);
            setColumnOrder(newOrder);
            onColumnOrderChange?.(newOrder);
        }
    };

    return (
        <div className={`rat-container ${className}`}>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <table className={`rat-table ${tableClassName}`} role="table">
                    <thead className={headerClassName}>
                        <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                            {table.getHeaderGroups().map((hg) => (
                                <tr key={hg.id}>
                                    {hg.headers.map((header) => (
                                        <SortableColumnHeader key={header.id} header={header} />
                                    ))}
                                </tr>
                            ))}
                        </SortableContext>
                        {/* Filters Row */}
                        <tr>
                            {table.getHeaderGroups()[0].headers.map((header) => {
                                const canFilter = header.column.getCanFilter?.() ?? false;
                                return (
                                    <th key={header.id} className="rat-th">
                                        {canFilter ? <ColumnFilter column={header.column} /> : null}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row: Row<any>) => (
                            <tr key={row.id} className={`rat-row ${rowClassName}`}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className={`rat-td ${cellClassName}`}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DndContext>

            {/* ✅ Beautiful Pagination */}
            <div className="rat-pagination">
                <div>
                    <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                        ⏮ First
                    </button>
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        ◀ Prev
                    </button>
                    <span className="px-3">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next ▶
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        ⏭ Last
                    </button>
                </div>

                <div>
                    <label className="mr-2">Rows per page:</label>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
