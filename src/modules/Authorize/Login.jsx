import "../theme/css/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../../components/Buttons/Buttons";
import { DTO } from "../../components/DTO";
import { TextAuthInput } from "../Authorize/AuthInput/TextAuthInput";
import { saveToken } from "../utils/utils";

export const Login = (props) => {
  const { setUser } = props;
  const { getValues, control } = useForm({});
  const navigate = useNavigate();

  const loginUser = async (item) => {
    console.log("Отправляю данные:", item);
    const response = await fetch("http://localhost:3005/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log("Статус ответа:", response.status);
    console.log("Content-Type:", response.headers.get("content-type"));
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Ошибка сервера:", errorData);
      throw new Error(errorData.message || "Ошибка авторизации");
    }
    return response.json();
  };

  const { mutate: handleLogin, isError } = useMutation({
    mutationFn: loginUser, // (item) => loginUser(item)
    onSuccess: (data) => {
      // setShowLogin(false);
      setUser(data.user);
      saveToken(data.token);
      navigate("/");
    },
  });

  return (
    <div className="signIn">
      <span className="signInText">Sign in</span>
      <DTO
        name="login"
        label="Login"
        control={control}
        component={TextAuthInput}
      />
      <DTO
        name="password"
        label="Password"
        control={control}
        component={TextAuthInput}
      />
      {isError ? (
        <div className="signIn-error">Неверный логин или пароль</div>
      ) : null}
      <div className="buttons">
        <Button label="Cancel" callback={() => navigate("/")} />
        <Button label="Sign in" callback={() => handleLogin(getValues())} />
      </div>
    </div>
  );
};

export default Login;
