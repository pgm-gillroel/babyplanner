/* eslint-disable radix */
(() => {
  const app = {
    initialize() {
      this.cacheELements();
      this.eventListener();
    },
    cacheELements() {
      this.$btnSend = document.querySelectorAll('.send');
      this.$hours = document.querySelector('#hour');
      this.$minutes = document.querySelector('#minutes');
      this.$btnDelete = document.querySelectorAll('.btnDelete');
      this.$btnConfirm = document.querySelectorAll('.btnConfirm');
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
    },

    eventListener() {
      this.$btnSend.forEach(($btnSend) => {
        $btnSend.addEventListener(
          'click',
          async (ev) => {
            const visitId = ev.target.dataset.id;
            const id = parseInt(visitId);

            const hours = this.$hours.innerHTML;
            const hoursInt = parseInt(hours);

            const minutes = this.$minutes.innerHTML;
            const minutesInt = parseInt(minutes);

            const date = `${hoursInt}:${minutesInt}:00`;

            const response = await fetch(`api/visits`);
            const visit = await response.json();

            const filterVisit = visit.find((u) => u.id === id);

            const oldDateMili = filterVisit.date;
            const oldDate = new Date(oldDateMili);

            const oldYear = oldDate.getFullYear();
            const monthOld = oldDate.getMonth() + 1;
            const oldDay = oldDate.getDate();

            const newDate = new Date(
              `${monthOld} ${oldDay} ${oldYear} ${date}`
            );

            const newMili = newDate.getTime();

            await fetch('/api/visit', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id,
                date: newMili,
                status: 'Pending',
              }),
            }).then(location.reload());
          },
          false
        );
      });

      this.$btnDelete.forEach(($btn) => {
        $btn.addEventListener(
          'click',
          async (ev) => {
            const visitId = ev.target.dataset.id;
            const id = parseInt(visitId);

            await fetch(`/api/visit/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({}),
            }).then(location.reload());
          },
          false
        );
      });

      this.$btnConfirm.forEach(($btn) => {
        $btn.addEventListener(
          'click',
          async (ev) => {
            const visitId = ev.target.dataset.id;
            const id = parseInt(visitId);

            await fetch('/api/visit', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id,
                status: 'Confirmed',
              }),
            }).then(location.reload());
          },
          false
        );
      });
    },
  };

  app.initialize();
})();
