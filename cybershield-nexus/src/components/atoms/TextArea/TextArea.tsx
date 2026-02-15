import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown"; // L'import magique
import "./TextArea.scss";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
	rich?: boolean; // Active la toolbar
	preview?: boolean; // Active l'onglet de prévisualisation
}

const TextArea = ({
	label,
	error,
	rich = false,
	preview = false,
	...props
}: TextAreaProps) => {
	const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
	const [content, setContent] = useState(
		props.value || props.defaultValue || "",
	);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Synchroniser le contenu pour la preview
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
		if (props.onChange) props.onChange(e);
	};

	const insertFormat = (startTag: string, endTag: string) => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const text = textarea.value;
		const before = text.substring(0, start);
		const selection = text.substring(start, end);
		const after = text.substring(end);

		const newText = `${before}${startTag}${selection}${endTag}${after}`;

        // Mise à jour du textarea
		const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
			window.HTMLTextAreaElement.prototype,
			"value",
		)?.set;
		nativeInputValueSetter?.call(textarea, newText);
		textarea.dispatchEvent(new Event("input", { bubbles: true }));

		setContent(newText);
		textarea.focus();
	};

	return (
		<div className="nexus-textarea-group">
			<div className="label-row">
				{label && <label className="nexus-label">{label}</label>}

				{/* Onglets Écriture / Aperçu */}
				{preview && (
					<div className="nexus-tabs">
						<button
							type="button"
							className={activeTab === "write" ? "active" : ""}
							onClick={() => setActiveTab("write")}>
							Écriture
						</button>
						<button
							type="button"
							className={activeTab === "preview" ? "active" : ""}
							onClick={() => setActiveTab("preview")}>
							Aperçu
						</button>
					</div>
				)}
			</div>

			<div className={`textarea-wrapper ${error ? "error" : ""}`}>
				{/* Barre d'outils (visible seulement en mode écriture) */}
				{rich && activeTab === "write" && (
					<div className="nexus-toolbar">
						<button
							type="button"
							onClick={() => insertFormat("**", "**")}
							title="Gras">
							B
						</button>
						<button
							type="button"
							onClick={() => insertFormat("*", "*")}
							title="Italique">
							I
						</button>
						<button
							type="button"
							onClick={() => insertFormat("`", "`")}
							title="Code">
							{"<>"}
						</button>
						<span className="separator">|</span>
						<button
							type="button"
							onClick={() => insertFormat("- ", "")}
							title="Liste">
							• List
						</button>
						<button
							type="button"
							onClick={() => insertFormat("### ", "")}
							title="Titre H3">
							H3
						</button>
					</div>
				)}

				{/* Zone d'écriture */}
				{activeTab === "write" ? (
					<textarea
						ref={textareaRef}
						className={`nexus-textarea ${rich ? "has-toolbar" : ""}`}
						value={content}
						onChange={handleChange}
						{...props}
					/>
				) : (
					/* Zone de prévisualisation (Markdown Rendu) */
					<div className="nexus-markdown-preview">
						{content ? (
							<ReactMarkdown>{String(content)}</ReactMarkdown>
						) : (
							<span className="empty-preview">
								Rien à prévisualiser...
							</span>
						)}
					</div>
				)}
			</div>

			{error && <span className="error-message">{error}</span>}
		</div>
	);
};

export default TextArea;
