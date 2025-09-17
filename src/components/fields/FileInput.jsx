// import "../fields/TextInput/TextInput.css";

export const FileInput = (props) => {
  const { placeholder = "", label = "", name } = props;

  return (
    <div className="input-add">
      {label ? <span className="input-title">{label}</span> : null}
      <input
        type="file"
        className="input-field"
        placeholder={placeholder}
        name={name}
        {...props}
      />
    </div>
  );
};
