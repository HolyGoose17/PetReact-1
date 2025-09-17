import "./TextInput.css";

export const TextInput = (props) => {
  const { placeholder = "", label = "", name } = props;
  return (
    <div className="input-add">
      {label ? <span className="input-title">{label}: </span> : null}
      <input
        className="input-field"
        placeholder={placeholder}
        name={name}
        {...props}
      />
    </div>
  );
};
