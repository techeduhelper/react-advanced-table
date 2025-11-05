# AdvancedTable Component Documentation

# React Advanced Table

A feature-rich React table component with TypeScript support, offering sorting, filtering, pagination, and draggable columns.

## Installation

```bash
npm install @techeduhelper/react-advanced-table
# or
yarn add @techeduhelper/react-advanced-table
```

## Basic Usage

```tsx
import { AdvancedTable } from '@techeduhelper/react-advanced-table';

// Define your data
const data = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Jane', age: 25, city: 'London' },
];

// Define your columns
const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'age', header: 'Age' },
    { accessorKey: 'city', header: 'City' },
];

// Use the component with all available props
function MyComponent() {
    return (
        <AdvancedTable 
            data={data} 
            columns={columns}
            enableSorting={true}
            enableFiltering={true}
            enablePagination={true}
            enableDragAndDrop={true}
            pageSize={10}
            showPageSizeOptions={true}
            pageSizeOptions={[5, 10, 20, 50]}
            enableRowSelection={true}
            enableColumnResizing={true}
            density="comfortable"
            showColumnToggle={true}
            showGlobalFilter={true}
        />
    );
}
```
