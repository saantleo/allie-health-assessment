import { format } from "date-fns";

export const formatDate = (date: string) => {
  const wholeDate = new Date(date);
  const noTimezoneDate = new Date(
    wholeDate.valueOf() + wholeDate.getTimezoneOffset() * 60 * 1000,
  );

  return format(noTimezoneDate, "dd/MM/yyyy");
};
