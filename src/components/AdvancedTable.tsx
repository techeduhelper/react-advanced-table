import React from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    ColumnDef,
    flexRender,
    Row,
    PaginationState
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

    // pagination: for future server-side support (optional)
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
    pageSize = 10
}: AdvancedTableProps<T>) {
    // initial column order from columns (use id or accessorKey)
    const defaultOrder = columns.map((c) => (c.id ?? (c as any).accessorKey ?? JSON.stringify(c.header)));
    const [columnOrder, setColumnOrder] = React.useState<string[]>(defaultOrder);

    const [globalFilter, setGlobalFilter] = React.useState("");
    const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize });

    const table = useReactTable({
        data,
        columns,
        state: {
            columnOrder,
            globalFilter,
            pagination
        } as any,
        onColumnOrderChange: setColumnOrder,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    React.useEffect(() => {
        onColumnOrderChange?.(columnOrder);
    }, [columnOrder, onColumnOrderChange]);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || !active) return;
        if (active.id !== over.id) {
            const oldIndex = columnOrder.indexOf(active.id);
            const newIndex = columnOrder.indexOf(over.id);
            const newOrder = arrayMove(columnOrder, oldIndex, newIndex);
            setColumnOrder(newOrder);
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

                        {/* Filters row */}
                        <tr>
                            {table.getHeaderGroups()[0].headers.map((header) => {
                                const canFilter = (header.column.getCanFilter && header.column.getCanFilter()) ?? false;
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

            {/* Simple pagination UI (client) */}
            <div style={{ padding: 8 }}>
                <button
                    onClick={() => table.previousPage?.()}
                    disabled={!table.getCanPreviousPage?.()}
                >
                    Prev
                </button>
                <span style={{ padding: "0 8px" }}>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount?.() ?? 1}
                </span>
                <button onClick={() => table.nextPage?.()} disabled={!table.getCanNextPage?.()}>
                    Next
                </button>
            </div>
        </div>
    );
}
