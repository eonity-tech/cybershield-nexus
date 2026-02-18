import React from "react";
import "./Table.scss";

interface Column<T> {
	header: string;
	key: keyof T | string;
	render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
	columns: Column<T>[];
	data: T[];
	className?: string;
	emptyMessage?: string;
}

const Table = <T,>({
	columns,
	data,
	className = "",
	emptyMessage = "Aucune donnée",
}: TableProps<T>) => {
	if (data.length === 0) {
		return <div className="table-empty">{emptyMessage}</div>;
	}

	return (
		<div className={`nexus-table-container ${className}`}>
			<table className="nexus-table">
				<thead>
					<tr>
						{columns.map((col, index) => (
							<th key={index}>{col.header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((item, rowIndex) => (
						<tr key={rowIndex}>
							{columns.map((col, colIndex) => (
								<td key={colIndex}>
									{col.render
										? col.render(item)
										: (item[
												col.key as keyof T
											] as React.ReactNode)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
