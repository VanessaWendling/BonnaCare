interface IPhoto {
  photo: string;
}

export const Photo = ({ photo }: IPhoto) => {
  return (
    <div className={`rounded-2xl h-40 w-full overflow-hidden`}>
      <img
        src={photo}
        alt="Base64 representation"
        className="w-full h-full object-cover"
      />
    </div>
  );
};
