import { useEffect, useState } from "react";
import axios from "axios";
import { userDataStoreAction } from "../store/userDataStore";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import MonthBalanceCard from "../components/monthBalanceCard/MonthBalanceCard";
import WalletCard from "../components/walletcard/WalletCard";
import ExpenseBox from "../components/expense/ExpenseBox";
import ToBuyBox from "../components/toBuy/TobuyBox";
import SideBar from "../components/SideBar";
import ChartCard from "../components/ChartCard";

const Main = () => {
  const [failed, setFailed] = useState(false);
  const [doneTakeData, setDoneTakeData] = useState(false);
  const dispatch = useAppDispatch();

  const localEmail = localStorage?.getItem("email");
  const emailRemove = localEmail?.split("@")[0];
  const userData = useAppSelector((state) => state.userData.data);

  useEffect(() => {
    const test = () => {
      setDoneTakeData(false);
      axios
        .get(
          `https://react-test-7684d-default-rtdb.asia-southeast1.firebasedatabase.app/userData/${emailRemove}.json`
        )
        .then((res) => {
          const { data } = res;

          const key = Object.keys(data).toString();
          dispatch(userDataStoreAction.setFireBaseLocation(key));
          dispatch(userDataStoreAction.setUserData(data[key]));
          setDoneTakeData(true);
        })
        .catch((error) => {
          setFailed(true);
          console.log(error);
        });
    };
    if (emailRemove !== undefined) {
      test();
    }
  }, [dispatch, emailRemove]);

  useEffect(() => {
    if (doneTakeData === true) {
      if (userData.lastLogin) {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currnetYear = today.getFullYear();
        const currentTime = today.getTime();
        const currentDay = today.getDate();
        const lastLoginMonth = userData.lastLogin.split("/")[0];

        if (+lastLoginMonth !== currentMonth + 1) {
          dispatch(userDataStoreAction.MonthlyUpdateTest());
        }

        const futureExpireTime = new Date(
          currnetYear,
          currentMonth + 1,
          1
        ).getTime();

        const remadingTime = futureExpireTime - currentTime;

        let nextMonth: any;

        if (currentDay > 20) {
          nextMonth = setTimeout(() => {
            console.log("why");
          }, remadingTime);
        }

        dispatch(userDataStoreAction.setLastLogin());

        return () => {
          clearTimeout(nextMonth);
        };
      } else {
        dispatch(userDataStoreAction.setLastLogin());
      }
    }
  }, [dispatch, doneTakeData]);

  return (
    <div className="h-screen flex">
      <SideBar />
      <div className="w-11/12 h-full">
        {failed ? (
          <p className="text-center"> Error Loading Data </p>
        ) : (
          <div className="flex p-4 gap-2 h-screen">
            <div className="w-1/2 flex flex-col gap-2 h-full">
              <div className="flex gap-2 h-1/2">
                <WalletCard />
                <MonthBalanceCard MonthData={userData.thisMonth} label="This" />
                <MonthBalanceCard MonthData={userData.lastMonth} label="Last" />
              </div>

              <div className="bg-white rounded-md border-4 border-blue-400 p-2 h-1/2">
                <ChartCard />
              </div>
            </div>

            <div className="w-1/2">
              <div className="flex gap-2 h-full">
                <ExpenseBox />
                <ToBuyBox />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
