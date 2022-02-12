import AddNewToBuyForm from "./AddNewToBuyForm";
import ToBuyCard from "./TobuyCard";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/storeHooks";
import { PlusIcon } from "@heroicons/react/solid";
import { toBuyType } from "../../type/userDataType";
import ReactPaginate from "react-paginate";
import React from "react";

const SavingBox = () => {
  const [isAddToBuy, setIsAddToBuy] = useState(false);
  const ToBuyList = useAppSelector((state) => state.userData.data.toBuy);

  const openAddTobuy = () => {
    setIsAddToBuy((state) => !state);
  };

  const [currentItems, setCurrentItems] = useState<toBuyType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(ToBuyList?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(ToBuyList?.length / itemsPerPage));
  }, [itemOffset, ToBuyList]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % ToBuyList?.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="w-1/2 bg-white rounded-md border-4 border-purple-400 select-none">
      <div className="flex items-center justify-center gap-2 bg-purple-100">
        <p className="text-center text-3xl my-2 font-medium text-purple-500">
          Wish List
        </p>
        <button
          className="text-xl bg-slate-100 rounded-md p-1 hover:bg-slate-200 border-2 border-purple-400"
          onClick={openAddTobuy}
        >
          <PlusIcon className="h-5 w-5 text-purple-500" />
        </button>
      </div>

      <AddNewToBuyForm openAddTobuy={openAddTobuy} isOpen={isAddToBuy} />

      <div className="h-5/6 p-2">
        {currentItems?.length > 0 ? (
          currentItems.map((x, index) => (
            <ToBuyCard
              forName={x.for}
              key={x.for + index + Math.random()}
              index={index}
            />
          ))
        ) : (
          <p className="flex text-center text-4xl h-full items-center justify-center text-slate-400">
            Empty
          </p>
        )}
      </div>

      {pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          containerClassName="flex justify-center items-center text-md select-none"
          nextLinkClassName="border-2 p-1 hover:bg-purple-500 hover:text-white rounded-r-lg"
          previousLinkClassName="p-1 border-y-2 border-l-2 hover:bg-purple-500 hover:text-white rounded-l-lg"
          pageLinkClassName="p-1 border-y-2 border-l-2 hover:bg-purple-500 hover:text-white"
          breakLinkClassName="p-1 border-y-2 border-l-2"
          activeLinkClassName="bg-purple-500 text-white"
        />
      )}
    </div>
  );
};

export default React.memo(SavingBox);
