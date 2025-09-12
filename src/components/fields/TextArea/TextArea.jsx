import "./TextArea.css";

export const TextArea = (props) => {
  const { placeholder = "", label = "", name } = props;
  return (
    <div className="text-area-wrapper">
      {label ? <span className="text-area-title">{label}</span> : null}
      <textarea
        className="text-area-field"
        placeholder={placeholder}
        name={name}
        {...props}
      />
    </div>
  );
};
