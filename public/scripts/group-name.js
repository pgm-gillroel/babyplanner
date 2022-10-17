(() => {
  const app = {
    initialize() {
      this.cacheELements();
      this.eventListener();
      this.inputGroup();
    },
    cacheELements() {
      this.$inputGroupNew = document.querySelector('.inputGroupName');
      this.$inputGroup = document.querySelector('.dropdownGroup');
    },
    eventListener() {},

    inputGroup() {
      const $button = document.querySelector('.btn');

      setInterval(() => {
        if (this.$inputGroupNew.value || this.$inputGroup.value) {
          $button.classList.replace('inactive', 'active');
        } else {
          $button.classList.replace('active', 'inactive');
        }
      }, 300);
    },
  };

  app.initialize();
})();
