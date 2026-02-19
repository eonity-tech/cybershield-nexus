import { FaSearch, FaTimes } from "react-icons/fa";
import TextInput from "../../atoms/TextInput/TextInput";
import "./SearchBar.scss";

interface SearchBarProps {
	value: string;
	onChange: (val: string) => void;
	placeholder?: string;
}

const SearchBar = ({
	value,
	onChange,
	placeholder = "Rechercher (IP, Host, Statut)...",
}: SearchBarProps) => {
	return (
		<div className="nexus-search-bar">
			<TextInput
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				iconPrefix={<FaSearch />}
				iconSuffix={
					value ? (
						<button
							type="button"
							className="clear-btn"
							onClick={() => onChange("")}
							title="Effacer la recherche">
							<FaTimes />
						</button>
					) : null
				}
			/>
		</div>
	);
};

export default SearchBar;
