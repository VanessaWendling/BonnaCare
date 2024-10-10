import React, { ChangeEvent, useState } from "react";

interface IFileUpload {
  base64Image: string | undefined;
  setBase64Image: (base64: string) => void;
}

export const FileUploadPDF = ({ base64Image, setBase64Image }: IFileUpload) => {
  const [fileName, setFileName] = useState<string>("");
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Pega o primeiro arquivo selecionado
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const base64String = reader.result.toString();
          setBase64Image(base64String);
          setFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Por favor, selecione um arquivo PDF.");
    }
  };

  return (
    <div className="flex w-[60%]">
      {/* Input real, escondido */}
      <input
        id="fileInput"
        className="hidden"
        type="file"
        name="image"
        onChange={handleFileChange}
      />
      {/* Botão estilizado */}
      <button
        type="button"
        onClick={() => document.getElementById("fileInput")?.click()}
        className="bg-pink-900 text-gray-100 text-center rounded-lg px-5 py-1 cursor-pointer w-48 hover:bg-pink-800"
      >
        {fileName ? `${fileName.length > 10 ? fileName.substring(0,10).concat("..."): fileName}` : "Upload File"}
      </button>
    </div>
  );
};
