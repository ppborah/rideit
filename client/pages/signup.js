import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import toast from "react-hot-toast";

const signup = () => {
  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  return (
    <div className="h-screen w-screen flex justify-center bg-blue-300">
      <Formik
        validationSchema={ValidationSchema}
        initialValues={{ name: "", username: "", email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            if (values.password.length < 8)
              return toast.error("password must be at least 8 characters");

            const response = await fetch(`http://localhost:5000/create-user`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                name: values.name,
                username: values.username,
                email: values.email,
                password: values.password,
              }),
            });
            const json = await response.json();
            if (json.sucess) {
             
              history.push("/");
            } else {
              alert(json.error);
            }
          } catch (e) {
            console.error(e);
            toast.error("some error occured");
          }
        }}
        validateOnMount={true}
      >
        {({ isSubmitting }) => (
          <Form className="m-5 flex flex-col justify-start items-center w-1/4 border-2 bg-white border-black rounded-xl">
            <h2 className="font-bold self-start my-3 ml-5 text-2xl">Sign Up</h2>
            <InputField
              name="name"
              label="Name"
              type="text"
              placeholder="Enter Your Name..."
            />
            <InputField
              name="username"
              label="Username"
              type="text"
              placeholder="Enter Your Username..."
            />
            <InputField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter Your Email..."
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter Your Password..."
            />
            <button
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl w-1/2"
            >
              Signup
            </button>
            <p className="my-2">
              already have an account?{" "}
              <Link href="/login">
                <a className="text-blue-500">Login</a>
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const InputField = (props) => {
  return (
    <div className="flex flex-col justify-start items-center w-30 h-28">
      <label htmlFor={props.name} className="self-start">
        {props.label}
      </label>
      <Field
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        className=" text-black w-full
      m-3 h-10 p-4 rounded-xl border-2 border-black outline-none"
      />
      <ErrorMessage
        name={props.name}
        component="div"
        className="text-red-500"
      />
    </div>
  );
};

export default signup;
