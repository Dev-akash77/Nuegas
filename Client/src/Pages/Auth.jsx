import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import { loginApi, signupApi } from "../Api/GlobalApi";
import { toast } from "react-toastify";
import Element_Loader from "../UI/Element_Loader";
import CheckSecurity from "../Security/CheckSecurity";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { isLogin, fromData, setFromData, setIsLogin } = useGlobalContext();
  const [loading, setloading] = useState(false);
  const { data, isLoading,refetch } = CheckSecurity();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!data?.success) {
        navigate("/auth");
      }
    }
  }, [data, isLoading, navigate]);

  // ! handle authentication
  const handleAuthentication = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      //  ! call api for signup
      if (!isLogin) {
        const data = await signupApi(fromData);

        if (data?.success) {
          toast.success(data?.message);
          setFromData({
            name: "",
            email: "",
            password: "",
          });
          refetch();
        }
      } else {
        const data = await loginApi(fromData);
        if (data?.success) {
          toast.success(data?.message);
          setFromData({
            name: "",
            email: "",
            password: "",
          });
          refetch();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  // ! changing from data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ! handle login or not
  const handleisLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="h-screen w-screen md:flex md:items-center bg-white md:justify-center">
      {/* only mobile device */}
      <div className="md:hidden block bg-default pt-5 rounded-b-[50%] pb-16 px-5 text-white">
        <h2 className="cc md:text-2xl text-[2.5rem] font-semibold">
          {isLogin ? `Login Account` : `Create Account`}
        </h2>
        <p className="cc mt-3 md:text-sm text-md">
          {isLogin
            ? `Please log in to book appointment`
            : `Please sign up to book appointment`}
        </p>
      </div>

      <div className="md:w-[24rem] w-full md:border border-[#dddd] rounded-xl auth_main px-[1.5rem] md:px-[2rem] md:py-[1.5rem]">
        <div className="md:block hidden">
          <h2 className="text-highlightText md:text-2xl text-2xl font-medium">
            {isLogin ? `Login` : `Create Account`}
          </h2>
          <p className="mt-3 md:text-sm text-md">
            {isLogin
              ? `Please log in to complete task`
              : `Please sign up to complete task`}
          </p>
        </div>
        {/* ! here is all form data */}
        <form
          className="flex flex-col text-sm md:gap-[.5rem] gap-[1.6rem] md:mt-3 mt-[3rem]"
          onSubmit={(e) => {
            handleAuthentication(e);
          }}
        >
          {!isLogin && (
            <div className="flex flex-col md:gap-2 gap-1">
              <label
                htmlFor="name"
                className="capitalize md:text-base text-[1.2rem]"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="@name"
                value={fromData.name}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                required
                className="md:border md:focus:border-2 md:border-[#dddd] border-b w-full p-2 outline-none md:rounded-md"
              />
            </div>
          )}
          <div className="flex flex-col md:gap-2 gap-1">
            <label
              htmlFor="email"
              className="capitalize md:text-base text-[1.2rem]"
            >
              Email
            </label>
            <input
              placeholder="@email"
              type="email"
              name="email"
              value={fromData.email}
              onChange={(e) => {
                handleInputChange(e);
              }}
              required
              className="md:border md:focus:border-2 md:border-[#dddd] border-b w-full p-2 outline-none md:rounded-md"
            />
          </div>
          <div className="flex flex-col md:gap-2 gap-1">
            <label
              htmlFor="password"
              className="capitalize md:text-base text-[1.2rem]"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="@password"
              name="password"
              value={fromData.password}
              onChange={(e) => {
                handleInputChange(e);
              }}
              required
              className="md:border md:focus:border-2 md:border-[#dddd] border-b w-full p-2 outline-none md:rounded-md"
            />
          </div>
          <button
            type="submit"
            className="cc md:mt-[.5rem] bg-default text-white px-3 rounded-md  h-[2.8rem]  md:text-base text-xl cursor-pointer relative"
          >
            {loading ? (
              <Element_Loader />
            ) : isLogin ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        {/* ! here is all form data */}
        {!isLogin ? (
          <p className="mt-4 md:text-sm text-lg">
            Already have an account?{" "}
            <span
              onClick={handleisLogin}
              className="text-default border-b border-b-blue cursor-pointer"
            >{`Login here`}</span>
          </p>
        ) : (
          <p className="mt-4 md:text-sm text-lg">
            Create an new account?{" "}
            <span
              onClick={handleisLogin}
              className="text-default border-b border-b-blue cursor-pointer"
            >{`Click here`}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
