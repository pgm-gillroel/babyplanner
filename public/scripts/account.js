(() => {
  const app = {
    initialize() {
      this.cacheELements();
      this.eventListener();
    },

    cacheELements() {
      this.$btnOpenDataUser = document.querySelector('.btnDataUser');
      this.$btnOpenDataBaby = document.querySelector('.btnDataBaby');
      this.$btnSubmitUser = document.querySelector('.btnSubmitUser');
      this.$btnSubmitBaby = document.querySelector('.btnSubmitBaby');

      this.id = '';
    },

    eventListener() {
      this.$btnOpenDataUser.addEventListener('click', (ev) => {
        ev.preventDefault();

        this.id = ev.target.dataset.id;

        const dataUser = document.querySelector('.dataUser');
        dataUser.classList.toggle('active');
      });

      this.$btnOpenDataBaby.addEventListener('click', (ev) => {
        ev.preventDefault();

        this.id = ev.target.dataset.id;

        const dataBaby = document.querySelector('.dataBaby');
        dataBaby.classList.toggle('active');
      });

      this.$btnSubmitUser.addEventListener('click', async () => {
        const $inputEmail = document.querySelector('.inputEmail');
        const $inputPassword = document.querySelector('.inputPassword');
        const $inputPhoneNumber = document.querySelector('.inputPhoneNumber');
        const $inputPhoneNumberPartner = document.querySelector(
          '.inputPhoneNumberPartner'
        );

        const { id } = this;

        // fetch specific user
        const response = await fetch(`api/user/${id}`);
        const user = await response.json();

        const idNumber = parseInt(id);

        const body = { id: idNumber, userMeta: { id: user.userMeta.id } };

        if ($inputEmail.value) {
          const filter =
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          if (!filter.test($inputEmail.value)) {
            alert('Please provide a valid email address');
            return false;
          }
          body.email = $inputEmail.value;
        }

        if ($inputPhoneNumber.value) {
          body.userMeta.phoneNumber = `${$inputPhoneNumber.value}`;
        }

        if ($inputPhoneNumberPartner.value) {
          body.userMeta.phoneNumberPartner = `${$inputPhoneNumberPartner.value}`;
        }

        // update user
        await fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then(() => location.reload());
      });

      this.$btnSubmitBaby.addEventListener(
        'click',
        async () => {
          const $inputFirstName = document.querySelector('.inputFirstName');
          const $inputLastName = document.querySelector('.inputLastName');
          const $inputWeight = document.querySelector('.inputWeight');
          const $inputLength = document.querySelector('.inputLength');
          const $inputDate = document.querySelector('.inputDate');

          const response = await fetch(`api/user/${this.id}`);
          const user = await response.json();

          const body = {
            id: user.baby[0].id,
          };

          if ($inputFirstName.value) {
            body.firstname = $inputFirstName.value;
          }

          if ($inputLastName.value) {
            body.lastname = $inputLastName.value;
          }

          if ($inputWeight.value) {
            body.weight = $inputWeight.value;
          }

          if ($inputLength.value) {
            body.length = $inputLength.value;
          }

          if ($inputDate.value) {
            const dateValidation = /^\d{2}\/\d{2}\/\d{4}$/;
            if (!dateValidation.test($inputDate.value)) {
              alert('geef een geldige datum(dd/mm/yyyy)');
              return false;
            }
            const dateBody = $inputDate.value;
            const [day, month, year] = dateBody.split('/');

            const result = [month, day, year].join('/');

            const date = new Date(result);
            const milliseconds = date.getTime();

            body.date = milliseconds;
          }

          await fetch('/api/baby', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }).then(() => location.reload());
        },
        false
      );
    },
  };

  app.initialize();
})();
