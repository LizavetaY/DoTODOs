import moment from 'moment';

export const getQtyOfPages = (arrayDataLength, limitPerPage) =>
  Math.ceil(arrayDataLength / limitPerPage);

export const getDateToday = () => moment().get().format('YYYY-MM-DD');

export const getTodoStatusOptions = () => {
  const labelsArr = ['Incomplete', 'Completed'];

  return labelsArr.map((todoStatus) => ({
    id: todoStatus,
    label: todoStatus
  }));
};
