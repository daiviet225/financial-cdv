import { useEffect, useState } from "react";
import axios from "axios";
import { userDataStoreAction } from "../store/userDataStore";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import MonthBalanceCard from "../components/MonthBalanceCard";
import WalletCard from "../components/WalletCard";
import ExpenseBox from "../components/expense/ExpenseBox";
import ToBuyBox from "../components/toBuy/TobuyBox";
import SideBar from "../components/SideBar";
import ChartCard from "../components/ChartCard";

const Main = () => {
  const [failed, setFailed] = useState(false);
  const dispatch = useAppDispatch();

  const localEmail = localStorage?.getItem("email");
  const emailRemove = localEmail?.split("@")[0];

  const userData = useAppSelector((state) => state.userData.data);

  useEffect(() => {
    const test = () => {
      axios
        .get(
          `https://react-test-7684d-default-rtdb.asia-southeast1.firebasedatabase.app/userData/${emailRemove}.json`
        )
        .then((res) => {
          const { data } = res;
          const key = Object.keys(data).toString();
          dispatch(userDataStoreAction.setFireBaseLocation(key));
          dispatch(userDataStoreAction.setUserData(data[key]));
        })
        .catch((error) => {
          setFailed(true);
          console.log(error);
        });
    };
    test();
  }, [dispatch, emailRemove]);

  return (
    <SideBar>
      {failed ? (
        <p className="text-center">Error Loading Data </p>
      ) : (
        <div className="flex p-5 gap-4 h-full">
          <div className="w-1/2 flex flex-col gap-4">
            <div className="flex gap-4 space-4">
              <WalletCard />
              <MonthBalanceCard MonthData={userData.thisMonth} label="This" />
              <MonthBalanceCard MonthData={userData.lastMonth} label="Last" />
            </div>
            <ChartCard />
          </div>
          <div className="w-1/2">
            <div className="flex gap-4 h-full">
              <ExpenseBox />
              <ToBuyBox />
            </div>
          </div>
        </div>
      )}
    </SideBar>
  );
};

export default Main;
