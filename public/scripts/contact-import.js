(() => {
  const app = {
    initialize() {
      this.cacheELements();
      this.eventListener();
    },
    cacheELements() {
      this.modal = document.querySelector('.modal');
      this.importBttns = document.querySelectorAll('.uploadBttn');
      this.modalCloseBttn = document.querySelector('.modal__close-btn');
      this.acceptBttn = document.querySelector('.acceptBttn');
      this.declineBttn = document.querySelector('.declineBttn');
      const userInput = document.querySelector('#userId');
      this.userId = userInput.value;
    },
    closeModal() {
      this.modal.classList.add('hide');
    },
    openModal() {
      this.modal.classList.remove('hide');
    },
    async importContacts() {
      await fetch(`http://localhost:3000/api/seedContacts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: this.userId }),
      }).then(() => {
        window.location.href = '/group-name';
      });
    },
    eventListener() {
      this.modalCloseBttn.addEventListener('click', (ev) => {
        ev.preventDefault();
        this.closeModal();
      });
      this.declineBttn.addEventListener('click', (ev) => {
        ev.preventDefault();
        this.closeModal();
      });
      this.importBttns.forEach((bttn) => {
        bttn.addEventListener('click', (ev) => {
          ev.preventDefault();
          this.openModal();
        });
      });
      this.acceptBttn.addEventListener('click', (ev) => {
        ev.preventDefault();
        this.importContacts();
      });
    },
  };

  app.initialize();
})();
