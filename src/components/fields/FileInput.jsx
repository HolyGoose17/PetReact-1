export const FileInput = ({
  placeholder = "",
  label = "",
  name,
  onChange,
  accept,
}) => {
  return (
    <div className="input-wrapper">
      {label ? <span className="input-title">{label}</span> : null}
      <input
        type="file"
        className="input-field"
        placeholder={placeholder}
        name={name}
        accept={accept}
        onChange={onChange}
      />
    </div>
  );
};
