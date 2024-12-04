import { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { getCepDetail } from "../../Service/apiViaCep-endpoints";
import { createNewAccount } from "../../Service/keeper-endpoints";
import { IAddress, IFeedback } from "../../Types/Types";
import { FileUpload } from "../FileUpload";
import { Input } from "../Input";

interface ICardRegister {
  joinUs: boolean;
  setJoinUs: Dispatch<boolean>;
  setRegisterSuccess: Dispatch<IFeedback>;
}

export const CardRegister = ({
  joinUs,
  setJoinUs,
  setRegisterSuccess,
}: ICardRegister) => {
  const [changePage, setChangePage] = useState<number>(1);
  const [photo, setPhoto] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [locale, setLocale] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatePassword()) {
      const address: IAddress = {
        city: city,
        locale: locale,
        neighborhood: neighborhood,
        number: number,
        postalCode: cep,
        street: street,
      };
      const status = await createNewAccount({
        name,
        photo,
        email,
        password,
        phone,
        address,
      });
      if (status == 201) {
        setJoinUs(false);
        setRegisterSuccess({feedback: true, message: "Perfil cadastrado com sucesso!"});
      }
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (password !== confirmPassword) {
      setError("As senhas não são iguais");
      return false;
    }
    if (password != undefined && !passwordRegex.test(password)) {
      setError(
        "A senha deve ter pelo menos 8 caracteres contendo letras e números"
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleCepBlur = async () => {
    if (cep != undefined)
      getCepDetail(cep).then((res) => {
        setLocale(res.uf);
        setCity(res.localidade);
        setNeighborhood(res.bairro);
        setStreet(res.logradouro);
      });
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 12) input = input.slice(0, 12);

    if (input.length > 6) {
      input = `(${input.slice(0, 3)}) ${input.slice(3, 4)} ${input.slice(
        4,
        8
      )}-${input.slice(8)}`;
    } else if (input.length > 3) {
      input = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    } else if (input.length > 0) {
      input = `(${input}`;
    }

    setPhone(input);
  };

  const handleCEPChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
  
    if (input.length > 8) input = input.slice(0, 8);
  
    if (input.length > 5) {
      input = `${input.slice(0, 5)}-${input.slice(5, 8)}`;
    } else if (input.length > 0) {
      input = `${input.slice(0, 5)}`;
    }
  
    setCep(input);
  };

  return (
    <>
      <div
        className={
          joinUs
            ? "fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <div className="max-w-[800px] md:w-[800px] bg-purple-300 p-6 flex flex-col m-auto rounded-md relative items-center">
          <div className="flex flex-row justify-between w-full">
            <AiOutlineClose
              size={28}
              className="cursor-pointer"
              onClick={() => setJoinUs(false)}
            />
            <div className="flex flex-row">
              {changePage > 1 ? (
                <AiOutlineLeft
                  className="cursor-pointer"
                  onClick={() => setChangePage(changePage - 1)}
                  size={28}
                />
              ) : (
                ""
              )}
              {changePage < 3 ? (
                <AiOutlineRight
                  className="cursor-pointer"
                  onClick={() => setChangePage(changePage + 1)}
                  size={28}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <>
            {changePage === 1 ? (
              <h1 className="px-4 text-3xl sm:text-3xl md:text-5xl lg:6xl font-bold w-[500px] flex-wrap text-center pt-4">
                Estamos felizes em ter
                <span className="text-pink-900"> você </span>aqui!
              </h1>
            ) : (
              ""
            )}
            {changePage === 2 ? (
              <h1 className="px-4 text-3xl sm:text-3xl md:text-5xl lg:6xl font-bold pt-4">
                Informações de Endereço
              </h1>
            ) : (
              ""
            )}
            {changePage === 3 ? (
              <h1 className="px-4 text-3xl sm:text-3xl md:text-5xl lg:6xl font-bold flex-wrap text-center w-[500px] pt-4">
                Escolha
                <span className="text-pink-900"> sua</span> senha
              </h1>
            ) : (
              ""
            )}
          </>
          <form
            className="flex flex-col gap-4 p-4 items-center m-4"
            onSubmit={handleSubmit}
          >
            {changePage === 1 ? (
              <>
                <div className="flex flex-row gap-8 items-center">
                  <div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">Nome</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 rounded-2xl"
                        type="text"
                        placeholder="Nome Completo"
                      />
                    </div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">E-mail</label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 rounded-2xl"
                        type="email"
                        placeholder="user@mail.com"
                      />
                    </div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">Telefone</label>
                      <Input
                        value={phone}
                        onChange={handlePhoneChange}
                        className="p-2 rounded-2xl"
                        type="text"
                        placeholder="(xx) x xxxx-xxxx"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Foto</label>
                    <FileUpload base64Image={photo} setBase64Image={setPhoto} />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {changePage === 2 ? (
              <>
                <div className="flex flex-row gap-8">
                  <div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">CEP</label>
                      <Input
                        value={cep}
                        onChange={handleCEPChange}
                        onBlur={handleCepBlur}
                        className="p-2 rounded-2xl"
                        type="text"
                        placeholder="xxxxx-xxx"
                      />
                    </div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">Cidade</label>
                      <Input
                        value={city}
                        disabled={city != ""}
                        className={`p-2 rounded-2xl ${city != "" && "bg-slate-200"}`}
                        type="text"
                        placeholder="Rio de Janeiro"
                        />
                    </div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">UF</label>
                      <Input
                        value={locale}
                        disabled={locale != ""}
                        className={`p-2 rounded-2xl ${locale != "" && "bg-slate-200"}`}
                        type="text"
                        placeholder="RJ"
                        />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">Rua</label>
                      <Input
                        value={street}
                        disabled={street != ""}
                        className={`p-2 rounded-2xl ${street != "" && "bg-slate-200"}`}
                        type="text"
                        placeholder="Mosela"
                        />
                    </div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">Bairro</label>
                      <Input
                        value={neighborhood}
                        disabled={neighborhood != ""}
                        className={`p-2 rounded-2xl ${neighborhood != "" && "bg-slate-200"}`}
                        type="text"
                        placeholder="Mosela"
                        />
                    </div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">Número</label>
                      <Input
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className={`p-2 rounded-2xl`}
                        type="text"
                        placeholder="A202"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {changePage === 3 ? (
              <>
                <div className="flex flex-col">
                  <label className="font-semibold">Senha</label>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 rounded-2xl"
                    type="password"
                    placeholder="********"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Confirmar a senha</label>
                  <Input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-2 rounded-2xl"
                    type="password"
                    placeholder="********"
                  />
                </div>
                <h3 className="w-[500px] text-center flex-wrap text-red-700">
                  {error}
                </h3>
                <button
                  type="submit"
                  className="border border-black rounded-xl px-5 py-1 max-w-32"
                >
                  Salvar
                </button>
              </>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </>
  );
};
