
interface IButton {
    text: string;
    id: number;
    background?: boolean
}

export const Button = ({text, id, background}: IButton) => {
    return(
        <div className={background ? "bg-pink-900 text-gray-100 text-center rounded-md px-5 py-1 max-w-32":"border border-black text-center rounded-md px-5 py-1 max-w-32"}>
            <h2>{text}</h2>
        </div>
    )
}