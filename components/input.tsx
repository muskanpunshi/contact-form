import { cn } from "@/utils/function";
import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  placeholder: string;
  type?: string;
  name: string;
  className?: string;
}

const Input = ({ placeholder, type, name, className }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="relative">
      <>
        <input
          type={type ?? "text"}
          className={cn(
            `text-base bg-opacity-10 font-body bg-transparent  max-xl:text-[12px] max-sm:text-[14px]   text-black block w-full border-black mb-[12px] text-left border rounded-[5px] p-3 max-2xl:p-[9px]  focus:outline-none focus:shadow-none placeholder:text-black max-md:py-3 after:bg-transparent`,
            className
          )}
          placeholder={placeholder}
          {...register(name)}
        />
        {errors[name] && (
          <span className="w-full text-left text-red-500 mx-auto text-[10px]  block absolute -bottom-[14px]   left-1/2 transform -translate-x-1/2">
            {errors[name]?.message as string}
          </span>
        )}
      </>
    </div>
  );
};

export default Input;
