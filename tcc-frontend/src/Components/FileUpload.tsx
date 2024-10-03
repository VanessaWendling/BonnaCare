import React, { ChangeEvent, Dispatch, useState } from "react";

interface IFileUpload {
  base64Image: string | undefined;
  setBase64Image: Dispatch<string>;
}

export function FileUpload({ base64Image, setBase64Image }: IFileUpload) {
  const [fileName, setFileName] = useState<string>("");

  // Função para redimensionar a imagem e converter para base64
  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Defina as dimensões máximas
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          // Calcule as novas dimensões
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          // Redimensionar a imagem
          canvas.width = width;
          canvas.height = height;
          ctx!.drawImage(img, 0, 0, width, height);

          // Converter para Base64
          const resizedDataUrl = canvas.toDataURL('image/png');
          resolve(resizedDataUrl);
        };
        img.src = event.target!.result as string; // Cast para string
      };
      reader.readAsDataURL(file); // Converte a imagem para base64
    });
  };

  // Função para lidar com o upload da imagem
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0]; // Pegando o primeiro arquivo

    if (file) {
      const resizedImage = await resizeImage(file); // Redimensiona e obtém a imagem em base64
      setBase64Image(resizedImage); // Atualiza o estado com a string base64
      setFileName(file.name);
    }
  };

  return (
    <div>
      {/* Input real, escondido */}
      <input
        id="fileInput"
        className="hidden"
        type="file"
        name="image"
        onChange={handleImageUpload}
      />

      {/* Botão estilizado */}
      <button
        type="button"
        onClick={() => document.getElementById("fileInput")?.click()}
        className="bg-pink-900 text-gray-100 text-center rounded-lg px-5 py-1 cursor-pointer w-48"
      >
        {fileName ? `${fileName}` : "Upload Image"}
      </button>
    </div>
  );
}
