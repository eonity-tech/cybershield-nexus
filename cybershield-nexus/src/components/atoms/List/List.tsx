import React from "react";
import "./List.scss";

interface ListProps<T> {
	items: T[];
	renderItem: (item: T) => React.ReactNode;
	emptyMessage?: string;
	className?: string;
}

const List = <T,>({
	items,
	renderItem,
	emptyMessage = "Aucune donnée disponible",
	className = "",
}: ListProps<T>) => {
	if (items.length === 0) {
		return <p className="list-empty">{emptyMessage}</p>;
	}

	return (
		<ul className={`nexus-list ${className}`}>
			{items.map((item, index) => (
				<li key={index} className="nexus-list-item">
					{renderItem(item)}
				</li>
			))}
		</ul>
	);
};

export default List;
