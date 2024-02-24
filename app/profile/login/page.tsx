"use client";

import { RiLockPasswordLine } from "react-icons/ri";
import google from "@/public/google-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MdEmail } from "react-icons/md";
import { validateLoginForm } from "@/app/_lib/utils";
import { signIn } from "next-auth/react";

type ValuesTypeLoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const onLoginSubmit = async (values: ValuesTypeLoginForm,setFieldError: any) => {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl:process.env.BASE_URL,
      redirect: true
    });

    if(res?.status !== 200) {
      console.log("inside if ",res)
      const errorMessage = res?.error;
      setFieldError("password", errorMessage )
    }
  };

  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: process.env.BASE_URL });
  };

  return (
    <section className="flex flex-col lg:w-1/2 gap-10 mx-auto my-6 rounded-md p-5 bg-slate-900 items-center">
      <div className="title">
        <h1 className="text-center font-bold text-4xl">
          Sign In
        </h1>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validateLoginForm}
        onSubmit={(values, { setFieldError }) => {
          onLoginSubmit(values,setFieldError);
        }}
      >

{({ isSubmitting }) => (
        <Form className="lg:w-1/2 w-full flex flex-col mx-auto gap-4 text-gray-800">
          <div className="w-full flex flex-row items-center border rounded-xl relative py-4 px-6 bg-slate-50">
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
          <ErrorMessage className="text-sm px-2 text-rose-600" name="email" component="div" />

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

          <button
          disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-lg text-gray-50 transition duration-300 ease-in-out hover:from-gray-900 hover:to-gray-600"
            type="submit"
          >
            {isSubmitting ? "Signing In" : "Sign In"}
            
          </button>


          <p className="text-sm text-gray-200 text-center">or</p>
          <button
            onClick={handleGoogleSignIn}
            className="flex flex-row justify-around border w-full rounded-md py-3 text-lg transition duration-300 ease-in-out hover:bg-gray-700 text-gray-100"
            type="button"
          >
            Sign in with Google{" "}
            <Image alt="Google Login" src={google} height={24} width={24} />
          </button>
        </Form>)}
      </Formik>

      <p className="text-center text-gray-400">
        Don&apos;t have an account ? <span> </span>
        <Link href="/profile/register" className="text-blue-700">
          Register here.
        </Link>
      </p>
    </section>
  );
}
