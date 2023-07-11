import React, { useState, useCallback, useEffect } from "react";
import coffeeThumbSignup from "@images/coffee-thumb-signup.jpg";
import StyledInputForm from "@/components/input_form";
import logoTitle from "../assets/images/logo_title.png";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/utils/constants";

function Signup() {
  const [signupData, setSignupData] = useState({
    email: "",
    name: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    document.title = "Signup Page";
  });

  const handleInputChange = useCallback((name: string, value: string) => {
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newErrors: string[] = [];
      if (!EMAIL_REGEX.test(signupData.email)) {
        newErrors.push("Email không hợp lệ");
      }
      if (signupData.name.length < 2) {
        newErrors.push("Tên phải có ít nhất 2 kí tự");
      }
      if (!PASSWORD_REGEX.test(signupData.password)) {
        newErrors.push("Mật khẩu không hợp lệ");
      }
      if (signupData.password !== signupData.confirm) {
        newErrors.push("Mật khẩu không khớp");
      }
      setErrors(newErrors);
      if (newErrors.length === 0) {
        console.log("Form singup submitted: ", signupData);
      } else {
        newErrors.forEach((error) => {
          console.log(error);
        });
      }
    },
    [signupData]
  );

  return (
    <>
      <div className="card_foreground">
        <div className="card_layout">
          <div className="card_form_layout w-[34rem]">
            <div className="flex items-center">
              <img src={logoTitle} width={44} height={44} />
              <h2 className="font-bold text-[20px] font-playfair">
                Coffee Shop
              </h2>
            </div>
            <div className="mt-[1rem]">
              <h1 className="font-bold text-[28px] font-lobster">
                New to FCoffee?
              </h1>
              <form className="card_form_field" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label htmlFor="emailInput" className="card_label_form">
                    Email
                  </label>
                  <StyledInputForm
                    id="emailInput"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    onValueChange={(value) => handleInputChange("email", value)}
                    error={errors[0]}
                  />
                </div>
                <div className="flex flex-col mt-[0.8rem]">
                  <label htmlFor="nameInput" className="card_label_form">
                    Name
                  </label>
                  <StyledInputForm
                    id="nameInput"
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    onValueChange={(value) => handleInputChange("name", value)}
                    error={errors[1]}
                  />
                </div>
                <div className="flex flex-col mt-[0.8rem]">
                  <label htmlFor="passwordInput" className="card_label_form">
                    Password
                  </label>
                  <StyledInputForm
                    id="passwordInput"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    onValueChange={(value) =>
                      handleInputChange("password", value)
                    }
                    error={errors[2]}
                  />
                </div>
                <div className="flex flex-col mt-[0.8rem]">
                  <label htmlFor="confirmInput" className="card_label_form">
                    Confirm password
                  </label>
                  <StyledInputForm
                    id="confirmInput"
                    name="confirm"
                    type="password"
                    placeholder="Re-type password"
                    onValueChange={(value) =>
                      handleInputChange("confirm", value)
                    }
                    error={errors[3]}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn_submit bg-blue-500 hover:bg-blue-600
                text-white mt-[2rem]"
                >
                  Sign up
                </button>
              </form>
              <hr
                className="border-b border-gray-300 opacity-50 
							my-7"
              />
              <div className="card_footer_form mt-8">
                <span>Already have an account?</span>
                <a
                  className="text-blue-400 ml-2
								hover:underline"
                  href="/login"
                >
                  Login now
                </a>
              </div>
            </div>
          </div>
          <img
            src={coffeeThumbSignup}
            width={470}
            className="rounded-tr-[16px] rounded-br-[16px]"
          />
        </div>
      </div>
    </>
  );
}

export default Signup;
