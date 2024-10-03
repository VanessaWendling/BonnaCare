import { Dispatch, InputHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { Button } from "../Button";

interface ICardNotification extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  state: boolean;
  setState: Dispatch<boolean>;
  Icon: IconType;
}

export const CardNotification = ({
  text,
  state,
  setState,
  Icon
}: ICardNotification) => {
  return (
    <div
      className={
        state
          ? "fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-10 duration-300"
          : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
      }
    >
      <div className="w-[400px] h-[300px] bg-amber-200 p-6 flex flex-col rounded-md relative justify-center items-center gap-8">
        <Icon size={60} />
        <h2>{text}</h2>
        <Button text="Fechar" onClick={() => setState(!state)} />
      </div>
    </div>
  );
};
