import React from 'react';
import { useHistory } from 'react-router-dom';
import { DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';

function Project() {
  const history = useHistory();
  const rows = [
    {
      id: 'a',
      name: 'Lava Lamps',
      author: 'Brad',
      version: '1.0',
      status: 'Disabled',
    },
    {
      id: 'b',
      name: 'Portal management',
      author: 'John',
      version: '2.0',
      status: 'Starting',
    },
    {
      id: 'c',
      name: 'Monitoring',
      author: 'Jane',
      version: '3.0',
      status: 'Active',
    },
  ];
  const headers = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'author',
      header: 'Author',
    },
    {
      key: 'version',
      header: 'Version',
    },
    {
      key: 'status',
      header: 'Status',
    },
  ];

  function handleGotoDetail() {
    history.push(`/project/1`);
  }

  return (
    <>
      <h1 className="mb-10">Project</h1>
      <DataTable rows={rows} headers={headers}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id} onClick={handleGotoDetail}>
                      {cell.value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </>
  );
}

export default Project;
