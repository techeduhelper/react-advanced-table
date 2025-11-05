# React Advanced Table

A highly customizable and performant table component for React applications.

## Features

- Sorting, filtering, and pagination
- Draggable column reordering
- Custom cell rendering
- Column filtering
- Client-side pagination
- Responsive design
- Built on @tanstack/react-table and @dnd-kit
- TypeScript support

## Installation

```bash
npm install @techeduhelper/react-advanced-table @tanstack/react-table @dnd-kit/core @dnd-kit/sortable
```

## Usage

```tsx
import { AdvancedTable } from '@techeduhelper/react-advanced-table';
import { ColumnDef } from '@tanstack/react-table';

type Person = {
    name: string;
    age: number;
};

const columns: ColumnDef<Person>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Age', accessorKey: 'age' }
];

const data = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 }
];



function App() {
    return (
        <AdvancedTable
            columns={columns}
            data={data}
            pageSize={10}
            onColumnOrderChange={(newOrder) => console.log(newOrder)}
        />
    );
}
```

## Props

- `data`: Array of row data
- `columns`: Array of column definitions
- `pageSize`: Number of rows per page (default: 10)
- `className`: Container class name
- `tableClassName`: Table class name
- `headerClassName`: Header class name
- `rowClassName`: Row class name
- `cellClassName`: Cell class name
- `onColumnOrderChange`: Callback for column order changes

## Documentation

See the [docs](./docs) for detailed usage and API reference.

## License

MIT