# React Advanced Table

A highly customizable and performant table component for React applications.

## Features

- Sorting, filtering, and pagination
- Custom cell rendering
- Row selection and actions
- Virtualized rendering for large datasets
- Responsive design

## Installation

```bash
npm install react-advanced-table
```

## Usage

```jsx
import AdvancedTable from 'react-advanced-table';

const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Age', accessor: 'age' },
    // Add more columns as needed
];

const data = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    // Add more data as needed
];

function App() {
    return <AdvancedTable columns={columns} data={data} />;
}
```

## Documentation

See the [docs](./docs) for detailed usage and API reference.

## License

MIT