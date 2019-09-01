export default (selectDateStart, selectDateEnd) => {
  const startDate = new Date(selectDateStart);
  const endDate = new Date(selectDateEnd);
  const oneDatMilSec = 86400000;
  const dayCount = (endDate - startDate) / oneDatMilSec;

  let normalDayCount = 0;
  let holidayCount = 0;
  for (let i = 0; i < dayCount; i++) {
    const date = new Date(startDate.getTime() + oneDatMilSec * i);
    const day = date.getDay();
    if (day >= 1 && day <= 4) {
      normalDayCount++;
    } else {
      holidayCount++;
    }
  }

  const info = { normalDayCount, holidayCount };
  return info;
};
