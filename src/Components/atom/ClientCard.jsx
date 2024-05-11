import Avatar from "@mui/material/Avatar";

const ClientCard = ({ text, name, position }) => {
  return (
    <>
      <div className="container relative mx-auto mt-10 flex min-h-72 flex-col justify-between overflow-hidden rounded-md border bg-white p-5 shadow-sm">
        <div>
          <Avatar
            sx={{ width: 40, height: 40 }}
            className="absolute top-0 mb-3"
            alt="Remy Sharp"
            src="/avatar.jpg"
          />
        </div>

        <p className="text-gray-500">{text}</p>


        <div className="flex items-center justify-between align-middle">
          <div className="flex flex-col justify-start">
            <p className="font-bold">{name}</p>
            <p>{position}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientCard;
