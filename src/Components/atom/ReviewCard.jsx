import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import getTimeDifference from '../../utils/getTimeDifference';
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ username, timestamp, stars, content }) => {

  return (
    <div className="border hover:ring-purple-500 hover:ring-2 rounded-md p-5 bg-white mb-5">
      <div className="flex justify-between items-center align-middle">
        <div className='flex gap-3 items-center align-middle mb-5'>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>{username[0].toUpperCase()}</Avatar>
          <div>
            <h2>{username}</h2>
            <p className="text-gray-500">{getTimeDifference(timestamp)}</p>
          </div>
        </div>
        <div className='flex items-center align-middle gap-2'>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              size={25}
              fill={stars > index ? "yellow" : ""}
            />
          ))}
        </div>
      </div>
      <p className="mt-3 text-gray-500">{content}</p>
    </div>
  );
}

export default ReviewCard;