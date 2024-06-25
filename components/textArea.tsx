import React from "react";
import { useFormContext } from "react-hook-form";

const TextArea = ({
  name,
  rows,
  placeholder,
}: {
  name: string;
  rows?: number;
  placeholder?: string;
}) => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();
  return (
    <div className="relative">
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={`resize-none font-body  bg-transparent capitalize text-base  max-xl:text-[12px] max-sm:text-[14px]  text-black block w-full p-3 max-2xl:p-[9px] border-black mb-5 max-xl:mb-3 text-left border rounded-[5px]   focus:outline-none focus:shadow-none placeholder:text-black  
              `}
        {...register(name)}
      ></textarea>
      {errors[name] && (
        <span className="text-red-500 mx-auto w-fit text-left  text-[10px] pt-1 block absolute -bottom-[15px] left-1/2 transform -translate-x-1/2">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default TextArea;
