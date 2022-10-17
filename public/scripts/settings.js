(() => {
  const app = {
    initialize() {
      this.cacheELements();
      this.eventListener();
    },

    cacheELements() {
      this.$checkboxPhoto = document.querySelector('#photos');
      this.$checkboxAgenda = document.querySelector('#agenda');
      this.$checkboxVisit = document.querySelector('#visit');
      this.$checkboxRequest = document.querySelector('#request');

      this.$button = document.querySelector('#btnSettings');
    },

    eventListener() {
      this.$button.addEventListener(
        'click',
        async (ev) => {
          ev.preventDefault();
          const settings = {
            agenda: `${this.$checkboxAgenda.checked}`,
            photos: `${this.$checkboxPhoto.checked}`,
            visit: `${this.$checkboxVisit.checked}`,
            request: `${this.$checkboxRequest.checked}`,
          };

          const permissions = [settings];
          console.log(permissions);


          const query = window.location.search;
          const params = new URLSearchParams(query);
          const id = params.get('group');

          const idNumber = parseInt(id);


          await fetch('/api/group', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: idNumber,
              permissions,
            }),
          }).then(
            () =>
              (window.location.href = `/select-contacts?group=${id}`)
          );
        },
        false
      );
    },
  };

  app.initialize();
})();
