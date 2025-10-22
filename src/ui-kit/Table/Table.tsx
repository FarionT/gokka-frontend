export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (row: T) => React.ReactNode;
}

// Define the props for the Table component.
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  usePagination?: boolean;
  totalItems?: number;
  rows?: number;
  page?: number;
  onNextPage?: () => void;
  onPrevPage?: () => void;
}

// --- Dynamic Table Component ---
const Table = <T extends object>({
  data,
  columns,
  usePagination = false,
  totalItems = 0,
  rows = 10,
  page = 1,
  onNextPage,
  onPrevPage,
}: TableProps<T>): React.ReactElement => {
  // Determine the data to display. If pagination is used, it's just the data slice.
  // Otherwise, it's the full data set.
  const displayedData = data;
  const totalPages = Math.ceil(totalItems / rows);
  const isLastPage = page >= totalPages;

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            {/* Dynamically create table headers from the columns prop. */}
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Map through the displayed data to create table rows. */}
          {displayedData.length > 0 ? (
            displayedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100 transition-colors duration-200">
                {/* Map through the columns to create cells for each row. */}
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {/* Render custom content if a 'render' function exists, otherwise display the default value. */}
                    {column.render ? column.render(row) : (row as any)[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls, only visible if usePagination is true. */}
      {usePagination && (
        <div className="flex justify-end items-center p-4 bg-gray-200 border-t border-gray-200">
          <span className="text-sm text-gray-700 mr-4">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={onPrevPage}
            disabled={page === 1}
            className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={onNextPage}
            disabled={isLastPage}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default Table;