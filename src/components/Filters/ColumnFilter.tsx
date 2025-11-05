import React from "react";
import { TextFilter } from "./TextFilter";

export const ColumnFilter = ({ column }: { column: any }) => {
    const firstValue = column.getFacetedUniqueValues?.()?.values?.next?.() ? "" : "";
    return (
        <div style={{ paddingTop: 6 }}>
            <TextFilter
                value={column.getFilterValue() ?? ""}
                onChange={(val) => column.setFilterValue(val || undefined)}
            />
        </div>
    );
};
