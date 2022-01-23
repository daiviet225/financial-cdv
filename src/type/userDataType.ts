export type MonthDataType = { limit: number; spending: number };

export type expense = {
  for: string;
  cost: number;
  date: string;
};

export type toBuyType = {
  for: string;
};

export type userDataType = {
  email: string;
  balance: number;
  thisMonth: MonthDataType;
  lastMonth: MonthDataType;
  user: string;
  expense: expense[];
  toBuy: toBuyType[];
  income: number;
};
