import React, { useCallback, useEffect, useState } from "react";
import coffeeThumb from "../assets/images/coffee-thumb.jpg";
import logoTitle from "../assets/images/logo_title.png";
import SwitchToggle from "@/components/switch";
import iconGoogle from "@icons/google.svg";
import StyledInputForm from "@/components/input_form";
import { EMAIL_REGEX, PASSWORD_REGEX, SERVER_URL } from "@/utils/constants";
import axios from "axios";
import Toast from "@/components/toast";
import Skeleton from "react-loading-skeleton";

function Login() {
  const [isChecked, setIsChecked] = useState(false);
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [loginStatus, setLoginStatus] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    document.title = "Login Page";
  });

  const handleToggleChange = useCallback((newChecked: boolean) => {
    setIsChecked(newChecked);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newErrors: string[] = [];
      if (!EMAIL_REGEX.test(loginData.login)) {
        newErrors.push("Invalid Email!");
      }
      if (!PASSWORD_REGEX.test(loginData.password)) {
        newErrors.push("Invalid Password!");
      }
      setErrors(newErrors);
      if (newErrors.length === 0) {
        const reqData = {
          email: loginData.login,
          password: loginData.password,
        };
        await axios
          .post(SERVER_URL + "/login", reqData)
          .then((res) => {
            console.log(res.data);
            setLoginStatus("success");
            setLoginMessage(res.data);
            const timer = setTimeout(() => {
              window.location.href = "/"; // Chuyển hướng đến path "/"
            }, 3000);
            clearTimeout(timer);
          })
          .catch((err) => {
            console.log(err);
            setLoginStatus("failure");
            if (err.response) {
              const { data } = err.response;
              setLoginStatus("failure");
              setLoginMessage(data.message);
            } else {
              if (err.code === "ERR_NETWORK") {
                setLoginStatus("failure");
                setLoginMessage(`NETWORK_ERROR Cannot connect to Server`);
                return;
              }
            }
          });
      } else {
        newErrors.forEach((error) => {
          console.log(error);
        });
      }
    },
    [loginData]
  );

  const handleInputChange = useCallback((name: string, value: string) => {
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  return (
    <>
      <div className="card_foreground relative">
        <div className="card_layout">
          <div>
            {(
              <img
                src={coffeeThumb}
                width={440}
                className="rounded-tl-[16px] rounded-bl-[16px] h-full"
              />
            ) || <Skeleton width={440} count={1} />}
          </div>
          <div className="card_form_layout">
            <div className="flex items-center">
              <img src={logoTitle} width={44} height={44} />
              <h2 className="font-bold text-[20px] font-playfair">
                Coffee Shop
              </h2>
            </div>
            <div className="mt-[1rem]">
              <h1 className="font-bold text-[28px] font-lobster">
                Nice to see you again
              </h1>
              <form className="card_form_field" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label htmlFor="loginBorder" className="card_label_form">
                    Login
                  </label>
                  <StyledInputForm
                    id="loginInput"
                    name="login"
                    type="text"
                    placeholder="Enter email"
                    onValueChange={(value) => handleInputChange("login", value)}
                    error={errors[0]}
                  />
                </div>
                <div className="flex flex-col mt-[1rem]">
                  <label htmlFor="passwordBorder" className="card_label_form">
                    Password
                  </label>
                  <StyledInputForm
                    id="passwordInput"
                    name="login"
                    type="password"
                    placeholder="Enter password"
                    onValueChange={(value) =>
                      handleInputChange("password", value)
                    }
                    error={errors[1]}
                  />
                </div>
                <div className="flex items-center mb-7">
                  <SwitchToggle
                    checked={isChecked}
                    onChange={handleToggleChange}
                  />
                  <span className="card_label_form">Remember me</span>
                </div>
                <button
                  type="submit"
                  className="btn btn_submit bg-blue-500 hover:bg-blue-600
                text-white"
                >
                  Sign in
                </button>
              </form>
              <hr
                className="border-b border-gray-300 opacity-50 
							my-7"
              />
              <button
                type="button"
                className="btn btn_submit py-[0.7rem]
							bg-zinc-900 text-white"
              >
                <img src={iconGoogle} width={20} height={20} />
                <span className="text-[14px] ml-3">Or sign in with Google</span>
              </button>
              <div className="card_footer_form mt-8">
                <span>Dont have an account?</span>
                <a
                  className="text-blue-400 ml-2
								hover:underline"
                  href="/signup"
                >
                  Sign up now
                </a>
              </div>
            </div>
          </div>
        </div>
        {loginStatus ? (
          loginStatus === "success" ? (
            <Toast message={`${loginMessage}`} success={true} />
          ) : (
            <Toast message={`${loginMessage}`} success={false} />
          )
        ) : null}
      </div>
    </>
  );
}

export default Login;
