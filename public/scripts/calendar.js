/* eslint-disable radix */
(() => {
  const calendar = {
    init() {
      this.cacheElements();
      this.eventListeners();
      this.generateCalender();
      this.showCalendar(this.currentMonth, this.currentYear);
    },
    cacheElements() {
      this.selectYear = document.getElementById('year');
      this.selectMonth = document.getElementById('month');
      this.nextDiv = document.getElementById('next');
      this.previousDiv = document.getElementById('previous');
      this.today = new Date();
      this.currentMonth = this.today.getMonth();
      this.currentYear = this.today.getFullYear();
      this.dayDefault = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      this.calendar = document.getElementById('calendar');
      this.allDaysBttn = document.querySelector('.visitor__all-days');
      this.months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      this.theadMonth = document.getElementById('thead-month');
      this.tbl = document.getElementById('calendar-body');
      this.monthAndYear = document.getElementById('monthAndYear');
      this.visitors = document.querySelectorAll('.visitor');
      this.visitDays = [];
      this.visitors.forEach((visitor) => {
        this.visitDays.push({
          day: visitor.dataset.day,
          month: visitor.dataset.month,
          year: visitor.dataset.year,
        });
      });
      this.timepickerHours = document.querySelectorAll('.timepicker__hour');
      this.timepickerMinutes = document.querySelectorAll(
        '.timepicker__minutes'
      );
    },
    eventListeners() {
      this.allDaysBttn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const activeDay = document.querySelector('.date-picker.active');
        if (activeDay) {
          activeDay.classList.remove('active');
        }
        this.filterVisits('All', 1, 1, 1);
      });
      this.timepickerHours.forEach((timepickerHour) => {
        const timepicker = timepickerHour.querySelector('.timepicker__value');
        const arrowUp = timepickerHour.querySelector('.timepicker__arrow--up');
        const arrowDown = timepickerHour.querySelector(
          '.timepicker__arrow--down'
        );
        arrowUp.addEventListener('click', () => {
          const value = timepicker.innerHTML;
          const valueNumber = parseInt(value) + 1;
          if (valueNumber === 24) {
            timepicker.innerHTML = `00`;
          } else if (valueNumber < 10) {
            timepicker.innerHTML = `0${valueNumber}`;
          } else {
            timepicker.innerHTML = `${valueNumber}`;
          }
        });
        arrowDown.addEventListener('click', () => {
          const value = timepicker.innerHTML;
          const valueNumber = parseInt(value) - 1;
          if (valueNumber === -1) {
            timepicker.innerHTML = `23`;
          } else if (valueNumber < 10) {
            timepicker.innerHTML = `0${valueNumber}`;
          } else {
            timepicker.innerHTML = `${valueNumber}`;
          }
        });
      });
      this.timepickerMinutes.forEach((timepickerMinute) => {
        const timepicker = timepickerMinute.querySelector('.timepicker__value');
        const arrowUp = timepickerMinute.querySelector(
          '.timepicker__arrow--up'
        );
        const arrowDown = timepickerMinute.querySelector(
          '.timepicker__arrow--down'
        );
        arrowUp.addEventListener('click', (ev) => {
          const value = timepicker.innerHTML;
          const valueNumber = parseInt(value) + 5;
          if (valueNumber > 59) {
            timepicker.innerHTML = `00`;
            const hourValueContainer =
              ev.target.parentNode.parentNode.querySelector(
                '.timepicker__hour .timepicker__value'
              );
            const hourValue = parseInt(hourValueContainer.innerHTML) + 1;
            if (hourValue === 24) {
              hourValueContainer.innerHTML = '00';
            } else if (hourValue < 10) {
              hourValueContainer.innerHTML = `0${hourValue}`;
            } else {
              hourValueContainer.innerHTML = `${hourValue}`;
            }
          } else if (valueNumber < 10) {
            timepicker.innerHTML = `0${valueNumber}`;
          } else {
            timepicker.innerHTML = `${valueNumber}`;
          }
        });
        arrowDown.addEventListener('click', (ev) => {
          const value = timepicker.innerHTML;
          const valueNumber = parseInt(value) - 5;
          if (valueNumber < 0) {
            timepicker.innerHTML = `55`;
            const hourValueContainer =
              ev.target.parentNode.parentNode.querySelector(
                '.timepicker__hour .timepicker__value'
              );
            const hourValue = parseInt(hourValueContainer.innerHTML) - 1;
            if (hourValue === -1) {
              hourValueContainer.innerHTML = '23';
            } else if (hourValue < 10) {
              hourValueContainer.innerHTML = `0${hourValue}`;
            } else {
              hourValueContainer.innerHTML = `${hourValue}`;
            }
          } else if (valueNumber < 10) {
            timepicker.innerHTML = `0${valueNumber}`;
          } else {
            timepicker.innerHTML = `${valueNumber}`;
          }
        });
      });
      this.nextDiv.addEventListener('click', this.nextYear);
      this.selectMonth.onchange = () => {
        this.jump();
      };
      this.selectYear.onchange = () => {
        this.jump();
      };
      this.previousDiv.addEventListener('click', this.previousYear);
    },
    generateCalender() {
      this.createYear = this.generateYearRange(
        this.today.getFullYear() - 2,
        this.today.getFullYear() + 2
      );
      this.selectYear.innerHTML = this.createYear;
      let $dataHead = '<tr>';
      this.days.forEach((dhead) => {
        $dataHead += `<th data-days='${dhead}'>${dhead}</th>`;
      });
      $dataHead += '</tr>';
      this.theadMonth.innerHTML = $dataHead;
    },
    filterVisits(freePass, day, month, year) {
      this.visitors.forEach((v) => {
        if (v.classList.contains('hide')) {
          v.classList.remove('hide');
        }
        if (freePass !== 'All') {
          if (parseInt(v.dataset.day) !== day) {
            v.classList.add('hide');
          } else if (parseInt(v.dataset.month) !== month) {
            v.classList.add('hide');
          } else if (parseInt(v.dataset.year) !== year) {
            v.classList.add('hide');
          }
        }
      });
    },
    nextYear() {
      calendar.currentYear =
        calendar.currentMonth === 11
          ? calendar.currentYear + 1
          : calendar.currentYear;
      calendar.currentMonth = (calendar.currentMonth + 1) % 12;
      calendar.showCalendar(calendar.currentMonth, calendar.currentYear);
    },
    previousYear() {
      calendar.currentYear =
        calendar.currentMonth === 0
          ? calendar.currentYear - 1
          : calendar.currentYear;
      calendar.currentMonth =
        calendar.currentMonth === 0 ? 11 : calendar.currentMonth - 1;
      calendar.showCalendar(calendar.currentMonth, calendar.currentYear);
    },
    generateYearRange(start, end) {
      let years = '';
      for (let year = start; year <= end; year += 1) {
        years += `<option value='${year}'>${year}</option>`;
      }
      return years;
    },
    jump() {
      this.currentYear = parseInt(this.selectYear.value);
      this.currentMonth = parseInt(this.selectMonth.value);
      this.showCalendar(this.currentMonth, this.currentYear);
    },
    daysInMonth(iMonth, iYear) {
      return 32 - new Date(iYear, iMonth, 32).getDate();
    },
    showCalendar(month, year) {
      const firstDay = new Date(year, month).getDay();
      this.tbl.innerHTML = '';
      this.monthAndYear.innerHTML = `${this.months[month]} ${year}`;
      this.selectYear.value = year;
      this.selectMonth.value = month;
      // creating all cells
      let date = 1;
      for (let i = 0; i < 6; i += 1) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j += 1) {
          if (i === 0 && j < firstDay) {
            const cell = document.createElement('td');
            const cellText = document.createTextNode('');
            cell.appendChild(cellText);
            row.appendChild(cell);
          } else if (date > this.daysInMonth(month, year)) {
            break;
          } else {
            const cell = document.createElement('td');
            cell.setAttribute('data-date', date);
            cell.setAttribute('data-month', month + 1);
            cell.setAttribute('data-year', year);
            cell.setAttribute('data-month_name', this.months[month]);
            cell.className = 'date-picker';
            cell.innerHTML = `<span>${date}</span>`;
            if (
              date === this.today.getDate() &&
              year === this.today.getFullYear() &&
              month === this.today.getMonth()
            ) {
              cell.className = 'date-picker selected';
            }
            row.appendChild(cell);
            date += 1;
          }
        }
        this.tbl.appendChild(row);
      }
      const calendarDays = document.querySelectorAll('.date-picker');
      calendarDays.forEach((cd) => {
        cd.addEventListener('click', () => {
          const maybeActive = document.querySelector('.date-picker.active');
          if (maybeActive) {
            maybeActive.classList.remove('active');
          }
          cd.classList.add('active');
          this.filterVisits(
            '',
            parseInt(cd.dataset.date),
            cd.dataset.month - 1,
            parseInt(cd.dataset.year)
          );
        });
      });
      const allDates = document.querySelectorAll('.date-picker');
      allDates.forEach((singleDay) => {
        const currentDate = {
          day: singleDay.dataset.date,
          month: singleDay.dataset.month,
          year: singleDay.dataset.year,
        };
        if (
          this.visitDays.filter(
            (v) =>
              v.day === currentDate.day &&
              v.month - currentDate.month === -1 &&
              v.year === currentDate.year
          ).length > 0
        ) {
          singleDay.classList.add('event');
        }
      });
    },
  };
  calendar.init();
})();

// alert($dataHead);
