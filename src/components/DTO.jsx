import { Controller } from "react-hook-form";

export const DTO = ({ name, control, component: Component, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Component {...field} {...rest} />}
    />
  );
};
