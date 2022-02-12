import { useState, useEffect } from "react";
import AddNewExpenseFrom from "./AddNewExpenseFrom";
import ExpenseCard from "./ExpenseCard";
import { useAppSelector } from "../../hooks/storeHooks";
import { PlusIcon } from "@heroicons/react/solid";
import ReactPaginate from "react-paginate";
import { expense } from "../../type/userDataType";

const ExpenseBox = () => {
  const [isAddNewExpense, setIsAddNewExpense] = useState(false);
  const expense = useAppSelector((state) => state.userData.data.expense);

  const openAddExpense = () => {
    setIsAddNewExpense((state) => !state);
  };

  const [currentItems, setCurrentItems] = useState<expense[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(expense?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(expense?.length / itemsPerPage));
  }, [itemOffset, expense]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % expense?.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="w-1/2 bg-white rounded-md border-4 border-emerald-500 select-none">
      <div className="flex items-center justify-center gap-2 bg-emerald-100">
        <p className="text-center text-3xl my-2 font-medium select-none text-emerald-500">
          Spending
        </p>
        <button
          className="text-xl bg-slate-100 rounded-md p-1 hover:bg-slate-200 border-2 border-emerald-400"
          onClick={openAddExpense}
        >
          <PlusIcon className="h-5 w-5 text-emerald-500" />
        </button>
      </div>

      <AddNewExpenseFrom
        openAddExpense={openAddExpense}
        isOpen={isAddNewExpense}
      />

      <div className="h-5/6 p-2 w-full flex flex-col gap-2">
        {currentItems?.length > 0 ? (
          currentItems.map((x, index) => (
            <ExpenseCard
              forName={x.for}
              cost={x.cost}
              date={x.date}
              index={index}
              key={x.for + x.cost + x.date + index + Math.random()}
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
          containerClassName="flex justify-center items-center text-md"
          nextLinkClassName="border-2 p-1 hover:bg-emerald-500 hover:text-white rounded-r-lg"
          previousLinkClassName="p-1 border-y-2 border-l-2 hover:bg-emerald-500 hover:text-white rounded-l-lg"
          pageLinkClassName="p-1 border-y-2 border-l-2 hover:bg-emerald-500 hover:text-white"
          breakLinkClassName="p-1 border-y-2 border-l-2"
          activeLinkClassName="bg-emerald-500 text-white"
        />
      )}
    </div>
  );
};

export default ExpenseBox;
