import type { ReactNode } from "react";

type Props = { columns: string[]; rows: ReactNode[][] };
export function DataTable({ columns, rows }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[13px]">
        <thead className="text-muted">
          <tr>
            {columns.map((c) => (
              <th key={c} className="py-1 pr-2 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line align-top">
              {r.map((cell, j) => (
                <td key={j} className="py-1 pr-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
