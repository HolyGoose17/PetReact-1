import "../AuthInput/AuthInput.css";

export const TextAuthInput = (props) => {
  const { placeholder = "", label = "", name } = props;

  return (
    <div className="input-wrapper">
      {label ? <span className="input-title">{label}:</span> : null}
      <input
        className="input-login-field"
        placeholder={placeholder}
        name={name}
        {...props}
      />
    </div>
  );
};
