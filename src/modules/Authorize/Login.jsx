import "../theme/css/login.css";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Buttons/Buttons";
import { DTO } from "../../components/FieldDTO";
import { TextInput } from "../../components/fields/TextInput/TextInput";
import { useMutation } from "@tanstack/react-query";
import { saveToken } from "../utils/utils";

export const Login = (props) => {
  const { setShowLogin, setUser } = props;
  const { getValues, control } = useForm({});

  const loginUser = async (item) => {
    const response = await fetch(`http://localhost:3005/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка авторизации");
    }

    return response.json();
  };

  const {
    data: user,
    mutate: handleLogin,
    isError,
  } = useMutation({
    mutationFn: (item) => loginUser(item),
    onSuccess: (data) => {
      if (data) {
        setShowLogin(false);
        setUser(data?.user);
        saveToken(data.token);
        return;
      }
    },
  });

  return (
    <div className="login">
      <span>Вход</span>
      <DTO name="login" label="Логин" control={control} component={TextInput} />
      <DTO
        name="password"
        label="Пароль"
        control={control}
        component={TextInput}
      />
      {isError ? (
        <div className="login-error">Неверный логин или пароль</div>
      ) : null}
      <Button label="Войти" callback={() => handleLogin(getValues())} />
    </div>
  );
};

export default Login;
