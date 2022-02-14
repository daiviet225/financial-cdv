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
import React from "react";

const Main = () => {
  const [failed, setFailed] = useState(false);
  const dispatch = useAppDispatch();

  const localEmail = localStorage?.getItem("email");
  const emailRemove = localEmail?.split("@")[0];

  const userData = useAppSelector((state) => state.userData.data);
  const login = useAppSelector((state) => state.Login.isLogin);

  useEffect(() => {
    if (login) {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currnetYear = today.getFullYear();
      const currentTime = today.getTime();

      const futureExpireTime = new Date(
        currnetYear,
        currentMonth + 1,
        1
      ).getTime();

      const remadingTime = futureExpireTime - currentTime;

      let nextMonth = setTimeout(() => {
        dispatch(userDataStoreAction.MonthlyUpdateTest());
      }, remadingTime);

      return () => {
        clearTimeout(nextMonth);
      };
    }
  }, [dispatch, login]);

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

export default React.memo(Main);
