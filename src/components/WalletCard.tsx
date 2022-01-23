import { useAppSelector } from "../hooks/storeHooks";

const WalletCard = () => {
  const userData = useAppSelector((state) => state.userData.data);

  return (
    <>
      <div className="flex items-center text-center justify-center w-4/12 bg-blue-300 rounded-md shadow-xl shadow-slate-400">
        <div>
          <div className="mb-7">
            <p className="text-white text-3xl font-medium ">Balance</p>
            <p className="text-white text-3xl font-medium ">
              ${userData.balance}
            </p>
          </div>
          <div>
            <p className="text-green-700 text-2xl font-medium">Income</p>
            <p className="text-green-700 text-2xl font-medium">
              ${userData.income}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletCard;
