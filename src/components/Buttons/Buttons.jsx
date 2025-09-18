import classNames from "classnames";
import "../Buttons/Button.css";

export function Button(props) {
  const {
    label = "Сохранить",
    variant = "default",
    callback = () => {},
  } = props;

  return (
    <div
      className={classNames("custom-button", {
        secondary: variant === "secondary",
        add: variant === "add",
      })}
      onClick={() => callback()}
    >
      {label}
    </div>
  );
}
