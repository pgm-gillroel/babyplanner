(() => {
  const app = {
    initialize() {
      this.cacheELements();
      this.eventListener();
    },
    cacheELements() {
      this.contacts = document.querySelectorAll('.contact');
      this.searchBar = document.querySelector('.contact_searchBar');
    },
    eventListener() {
      this.searchBar.addEventListener('change', (event) => {
        this.contacts.forEach((contact) => {
          if (contact.classList.contains('hide')) {
            contact.classList.remove('hide');
          }
          if (
            !`${contact.dataset.firstname.toLowerCase()} ${contact.dataset.lastname.toLowerCase()}`.includes(
              event.target.value.toLowerCase()
            )
          ) {
            contact.classList.add('hide');
          }
        });
      });
    },
  };

  app.initialize();
})();
