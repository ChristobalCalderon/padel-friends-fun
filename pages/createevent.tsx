import Head from "next/head";
import formImage from "../public/form.png";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { motion as m } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      country: "United Kingdom",
      terms: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be 20 characters or less.")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      terms: Yup.array().required("Terms of service must be checked"),
    }),

    onSubmit: (values) => {
      console.log("form submitted");
      console.log(values);
      router.push({ pathname: "/success", query: values });
    },
  });

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute w-full"
    >
      <div className="  h-screen items-center flex justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white flex rounded-lg w-1/2 font-latoRegular"
        >
          <div className="flex-1 text-gray-700  p-20">
            <h1 className="text-3xl pb-2 font-latoBold">Let get started</h1>
            <p className="text-lg  text-gray-500">
              Join our E-learning platform today and unlock over 500+ courses
              and digital assets ready to download.
            </p>
            <div className="mt-6 ">
              {/* Name input field */}
              <div className="pb-4">
                <label
                  htmlFor="name"
                  className={`block font-latoBold text-sm pb-2 ${
                    formik.touched.name && formik.errors.name
                      ? "text-red-400"
                      : ""
                  } `}
                >
                  {formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : "Name"}
                </label>
                <p className="text-sm font-latoBold text-red-400 "></p>
                <input
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500 "
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
              </div>
              {/* Email input field */}
              <div className="pb-4">
                <label
                  htmlFor="email"
                  className={`block font-latoBold text-sm pb-2 ${
                    formik.touched.email && formik.errors.email
                      ? "text-red-400"
                      : ""
                  }`}
                >
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : "Email"}
                </label>

                <p></p>
                <input
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
              </div>
              {/* Country input field */}
              <div className="pb-4">
                <label
                  htmlFor="country"
                  className="block font-latoBold text-sm pb-2"
                >
                  Country
                </label>
                <select
                  className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500"
                  name="country"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                </select>
              </div>
              {/* Terms of service*/}
              <div className="pb-4">
                <label
                  htmlFor="terms"
                  className={`block font-latoBold text-sm pb-2 ${
                    formik.touched.terms && formik.errors.terms
                      ? "text-red-400"
                      : ""
                  }`}
                >
                  {formik.touched.terms && formik.errors.terms
                    ? formik.errors.terms
                    : "Terms of service"}
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="terms"
                    value="checked"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="h-5 w-5 text-teal-500 border-2  background-gray-500 focus:border-teal-500 focus:ring-teal-500"
                  />
                  <p className="text-sm font-latoBold text-gray-500">
                    I agree to the Terms and Service that my data will be taken
                    and sold.
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full"
              >
                Start learning today!
              </button>
            </div>
          </div>
          {/* <div className="relative flex-1">
            <Image
              className=" object-cover rounded-lg"
              fill
              priority
              src={formImage}
              alt="form-learn"
            />
          </div> */}
        </form>
      </div>
    </m.div>
  );
}
