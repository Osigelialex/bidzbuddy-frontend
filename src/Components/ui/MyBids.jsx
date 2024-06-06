import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import MyBidsTable from "../atom/MyBidsList";
import Skeleton from "@mui/material/Skeleton";
import Switch from "@mui/material/Switch";
import { GrTrophy } from "react-icons/gr";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const MyBids = () => {
  const [userBids, setUserBids] = useState([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const skeletons = Array(6).fill(null);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#00e400",
      },
    },
  });

  const handleChecked = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/bids?winningBids=${checked}`);
        setUserBids(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [checked]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col gap-3">
          {skeletons.map((_, index) => (
            <div>
              <Skeleton
                key={index}
                variant="rectangular"
                width={300}
                height={100}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-full max-w-full overflow-auto md:col-span-9">
          <div className="flex items-center justify-between bg-white p-3">
            <h1 className="font-saira text-xl">My Bids</h1>
            <div className="flex items-center gap-2">
              <GrTrophy size={20} className="text-[#00e400]" />
              <span className="font-saira text-lg">Show Winning</span>
              <ThemeProvider theme={theme}>
                <Switch
                  checked={checked}
                  onChange={handleChecked}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </ThemeProvider>
            </div>
          </div>
          <MyBidsTable mybids={userBids} />
        </div>
      )}
    </>
  );
};

export default MyBids;
