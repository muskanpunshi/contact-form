"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Input from "./input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ContactInput, ContactUsSchema } from "@/utils/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TextArea from "./textArea";
import { sendEmail } from "@/utils/sendEmail";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ContactInput>({
    resolver: zodResolver(ContactUsSchema),
    mode: "onBlur"
  });
  const { handleSubmit, reset } = methods;
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit: SubmitHandler<ContactInput> = async (values, e) => {
    e?.preventDefault();
    setIsLoading(true);
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    executeRecaptcha("contact").then(async (gReCaptchaToken: string) => {
      const response = await sendEmail({
        ...values,
        gReCaptchaToken
      });
      if (response) {
        toast.success("Your message has been sent successfully !", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark"
        });
        setIsLoading(false);
        reset();
      } else {
        toast.error("Error", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark"
        });
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto p-5">
      <div className="absolute inset-0  bg-gray-300 ">
        <iframe
          width="100%"
          height="100%"
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28970.65905073287!2d67.01966255!3d24.8183044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33dbbdc1875bf%3A0x6a6572ab3a66fed8!2sClifton%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh!5e0!3m2!1sen!2s!4v1719307874255!5m2!1sen!2s"
          className="grayscale contrast-[1.2] opacity-[0.2]"
        ></iframe>
      </div>
      <div className="flex gap-10 max-lg:flex-col">
        <div className="bg-black p-10 text-white w-full z-0">
          <p className="mt-4 text-sm leading-7 font-regular uppercase">
            Contact
          </p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
            Get In <span className="text-red-600">Touch</span>
          </h3>
          <p className="mt-4 leading-7 text-gray-200">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>

          <div className="flex items-center mt-5">
            <span className="text-sm">
              House #D-40, Street #12, Lorem ipsum.
            </span>
          </div>
          <div className="flex items-center mt-5">
            <span className="text-sm">+92 919 99 90 00</span>
          </div>
          <div className="flex items-center mt-5">
            <span className="text-sm">24/7</span>
          </div>
        </div>
        <div className="w-full my-5 ">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              <Input type="text" placeholder="Your Name" name="name" />

              <Input
                type="email"
                placeholder="Your Email"
                name="email"
                className="!w-full"
              />

              <Input
                type="number"
                placeholder="Your Phone"
                name="phone"
                className="!w-full"
              />

              <TextArea name="question" rows={5} placeholder="Your Question" />

              <div className="flex justify-center">
                <button
                  className="relative  rounded-md flex h-[40px] max-xl:h-[38px] max-xl:w-32 w-40 items-center justify-center  bg-black text-white   "
                  disabled={isLoading}
                  type="submit"
                >
                  <span className="relative z-10 flex">
                    {isLoading ? (
                      <svg
                        className="text-gray-300 animate-spin mr-3 absolute -left-8 bottom-[1px]"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                      >
                        <path
                          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#1D1D1D]"
                        ></path>
                      </svg>
                    ) : (
                      ""
                    )}
                    Submit
                  </span>
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
