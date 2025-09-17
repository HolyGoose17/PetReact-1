import "../theme/css/login.css";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Buttons/Buttons";
import { DTO } from "../../components/DTO";
import { TextInput } from "../../components/fields/TextInput/TextInput";
import { useMutation } from "@tanstack/react-query";
import { saveToken } from "../utils/utils";

export const AuthLogin = ({ setUser }) => {
  const { getValues, control } = useForm({});

  const registerUser = async (item) => {
    const response = await fetch(`http://localhost:3005/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка регистрации");
    }

    return response.json();
  };

  const {
    mutate: handleRegister,
    isError,
    error,
  } = useMutation({
    mutationFn: (item) => registerUser(item),
    onSuccess: (data) => {
      if (data.token && data.user) {
        setUser(data.user);
        saveToken(data.token);
        window.location.href = "/";
      }
    },
  });

  return (
    <div className="signIn">
      <span className="signInText">Sign up</span>
      <DTO name="login" label="Login" control={control} component={TextInput} />
      <DTO
        name="password"
        label="Password"
        control={control}
        component={TextInput}
        type="password"
      />
      {isError ? <div className="signIn-error">{error.message}</div> : null}
      <div className="buttons">
        <Button label="Cancel" callback={() => {}} />
        <Button label="Sign up" callback={() => handleRegister(getValues())} />
      </div>
    </div>
  );
};

export default AuthLogin;
