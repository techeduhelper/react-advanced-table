import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, Header } from "@tanstack/react-table";

export const SortableColumnHeader = ({ header }: { header: Header<any, any> }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: header.column.id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <th
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="rat-th"
            role="columnheader"
        >
            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        </th>
    );
};
