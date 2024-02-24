"use client";
import { HiAtSymbol } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import google from "@/public/google-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validateRegisterForm } from "@/app/_lib/utils";
import { signIn } from "next-auth/react";

type valuesType = {
  email: string;
  username?: string;
  password: string;
  passwordC?: string;
};

export default function RegisterForm() {

  const onRegSubmit = async (values: valuesType, setFieldError: any) => {
    const data = {
      email: values.email,
      password: values.password,
      name: values.username,
    };

    const handleGoogleSignUp = async () => {
      // TODO signUp()
    };

    const user = await fetch(`/api/auth/register/`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (user.ok) {
      signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: process.env.BASE_URL,
      });
      console.log("user registered", user);
      // setRedirectH(true);
    } else {
        console.log("inside else ",user)
        const data = await user.json();
        const errorMessage = data.message;

        setFieldError("email", errorMessage )
  
      // const errorMessage =
      //   user?.status === 403 ? "Already registered" : "Server Error";
      // setFieldError("email", errorMessage);
      console.log("error registering", user, errorMessage);
    }
  };

  return (
    <section className="flex flex-col gap-10 lg:w-1/2 mx-auto my-6 rounded-md p-5 bg-slate-900">
      <div className="title">
        <h1 className="text-center font-bold text-gray-200 text-4xl">
          Sign Up
        </h1>
      </div>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          passwordC: "",
        }}
        validate={validateRegisterForm}
        onSubmit={(values, { setFieldError }) =>
          onRegSubmit(values, setFieldError)
        }
      >
        <Form className="w-full lg:w-1/2 flex flex-col mx-auto gap-4 text-gray-800">
          <div className="flex flex-row items-center border rounded-xl relative py-4 px-6 bg-slate-50">
            <Field
              type="email"
              className="outline-none w-full bg-transparent"
              name="email"
              placeholder="Email"
            />
            <span>
              <MdEmail className="fill-gray-400" />
            </span>
          </div>

          <ErrorMessage
            className="text-rose-600 text-sm px-2"
            name="email"
            component="div"
          />

          <div className="flex flex-row items-center border rounded-xl relative py-4 px-6 bg-slate-50">
            <Field
              className="outline-none w-full bg-transparent"
              type="text"
              name="username"
              placeholder="Username (optional)"
            />
            <span>
              <HiAtSymbol className="fill-gray-400" />
            </span>
          </div>
          <ErrorMessage className="text-sm px-2 text-rose-600" name="username" component="div" />

          <div className="flex flex-row items-center border rounded-xl relative w-full py-4 px-6 bg-slate-50">
            <Field
              className="outline-none w-full bg-transparent"
              placeholder="Password"
              type="password"
              name="password"
            />
            <span>
              <RiLockPasswordLine className="fill-gray-400" />
            </span>
          </div>

          <ErrorMessage className="text-sm px-2 text-rose-600" name="password" component="div" />

          <div className="flex flex-row items-center border rounded-xl relative w-full py-4 px-6 bg-slate-50">
            <Field
              placeholder="Re-enter Password"
              className="outline-none w-full bg-transparent"
              type="password"
              name="passwordC"
            />
            <span>
              <RiLockPasswordLine className="fill-gray-400" />
            </span>
          </div>
          <ErrorMessage className="text-sm px-2 text-rose-600" name="passwordConfirmation" component="div" />

          <button
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-lg text-gray-50 transition duration-300 ease-in-out hover:from-gray-900 hover:to-gray-600"
            type="submit"
          >
            Submit
          </button>
          {/* 
          <p className="text-sm text-gray-500 text-center">or</p>
           //TODO
          <button
            // onClick={handleGoogleSignIn}
            className="flex flex-row justify-around border w-full rounded-md py-3 text-lg transition duration-300 ease-in-out hover:from-gray-900 hover:to-gray-600"
            type="button"
          >
            Sign up with Google{" "}
            <Image alt="Google Login" src={google} height={24} width={24} />
          </button> */}
        </Form>
      </Formik>

      <p className="text-center text-gray-400">
        Already have an account ? <span> </span>
        <Link href="/profile/login" className="text-blue-700">
          Login here.
        </Link>
      </p>
    </section>
  );
}
