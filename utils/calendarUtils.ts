export function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendar: any[] = [];

  for (let i = 0; i < firstDay; i++) {
    calendar.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendar.push(day);
  }

  return calendar;
}
