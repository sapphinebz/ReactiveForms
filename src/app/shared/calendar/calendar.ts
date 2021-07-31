export class DayTimecard {
  constructor(private formatter: (date: Date) => string) {}

  *iterators() {
    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() - dateNow.getDay());
    for (let i = 0; i < 7; i++) {
      const iterateDate = new Date(dateNow.getTime());
      iterateDate.setDate(dateNow.getDate() + i);
      const date = iterateDate.getDate();
      const month = iterateDate.getMonth();
      yield { label: `${date}/${month}`, day: i };
    }
  }

  toDayLabel(date: Date) {
    return this.formatter(date);
  }
}
