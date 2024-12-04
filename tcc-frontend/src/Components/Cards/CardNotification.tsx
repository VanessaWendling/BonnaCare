import { Dispatch, InputHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { Button } from "../Button";
import { IFeedback } from "../../Types/Types";

interface ICardNotification extends InputHTMLAttributes<HTMLInputElement> {
  state: IFeedback;
  setState: Dispatch<IFeedback>;
  Icon: IconType;
}

export const CardNotification = ({
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
      <div className="w-[400px] h-[300px] bg-purple-300 p-6 flex flex-col rounded-md relative justify-center items-center gap-8">
        <Icon size={60} />
        <h2 className="text-center">{state.message}</h2>
        <Button text="Fechar" onClick={() => {setState({feedback: !state.feedback}); state.action &&  state.action()}} />
      </div>
    </div>
  );
};
