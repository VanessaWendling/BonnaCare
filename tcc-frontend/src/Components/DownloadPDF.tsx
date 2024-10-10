
interface IDownloadPDF {
  base64String: string;
  fileName: string;
}

export const DownloadPDF= ({ base64String, fileName }: IDownloadPDF) => {

  
  const base64ToPDF = (base64String: string, fileName: string) => {
    const base64WithoutPrefix = base64String.split(',')[1];

    const byteCharacters = atob(base64WithoutPrefix);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={() => base64ToPDF(base64String, fileName)}
      className="bg-pink-900 text-gray-100 text-center rounded-md px-5 py-2 cursor-pointer hover:bg-pink-800">
      Download PDF
    </button>
  );
};

