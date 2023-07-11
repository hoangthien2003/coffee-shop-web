import React, { useCallback, useEffect, useState } from "react";
import coffeeThumb from "../assets/images/coffee-thumb.jpg";
import logoTitle from "../assets/images/logo_title.png";
import SwitchToggle from "@/components/switch";
import iconGoogle from "@icons/google.svg";
function Login() {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    document.title = "Login Page";
  }, [document.title]);

  const handleToggleChange = useCallback((newChecked: boolean) => {
    setIsChecked(newChecked);
  }, []);

  return (
    <>
      <div className="card_foreground">
        <div className="card_layout">
          <img
            src={coffeeThumb}
            width={440}
            className="rounded-tl-[16px] rounded-bl-[16px]"
          />
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
              <form className="card_form_field">
                <div className="flex flex-col">
                  <label htmlFor="loginBorder" className="card_label_form">
                    Login
                  </label>
                  <label id="loginBorder" className="card_input_border">
                    <input
                      name="login"
                      className="card_input_field"
                      placeholder="Email or phone number"
                    />
                  </label>
                </div>
                <div className="flex flex-col mt-[1.5rem]">
                  <label htmlFor="passwordBorder" className="card_label_form">
                    Password
                  </label>
                  <label id="passwordBorder" className="card_input_border">
                    <input
                      name="password"
                      type="password"
                      className="card_input_field"
                      placeholder="Enter password"
                    />
                  </label>
                </div>
                <div className="flex items-center mt-4 mb-7">
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
                  href="#"
                >
                  Sign up now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
