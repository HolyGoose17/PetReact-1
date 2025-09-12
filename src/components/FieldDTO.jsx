import { type } from "@testing-library/user-event/dist/type";
import { Controller } from "react-hook-form";

export const DTO = (props) => {
  const { component: Component, name, control } = props;
  return (
    <Controller
      type={type}
      name={name}
      control={control}
      render={({ field }) => <Component {...{ ...field, ...props }} />}
    />
  );
};
