(() => {
  const app = {
    initialize() {
      this.cacheELements();
      this.eventListener();
      this.addCalendarFlow();
    },

    cacheELements() {
      this.$genderInput = document.querySelector('#gender');
      this.$genderContainer = document.querySelectorAll('.gender');
      this.$genderSvg = document.querySelectorAll('.gender__img');
      this.$validateVisitorBtns = document.querySelectorAll(
        '.visitor--unconfirmed .thumbs-up'
      );
      this.$cancelVisitorBtns = document.querySelectorAll(
        '.visitor--unconfirmed .thumbs-down'
      );
    },
    eventListener() {
      // select gender by register-1
      // this.$genderContainer.forEach(($button) => {
      //   $button.addEventListener('click', (ev) => {
      //     ev.preventDefault();
      //     this.$genderInput.value = $button.value;

      //     const genderSvg = document.querySelectorAll(` .gender`);
      //   });
      // });

      // Get all buttons with class="btn" inside the container
      const btns = document.querySelectorAll('.gender');

      btns.forEach(($button) => {
        $button.addEventListener('click', (ev) => {
          ev.preventDefault();
          this.$genderInput.value = $button.value;
          btns.forEach((btn) => btn.classList.remove('active'));
          $button.classList.add('active');
        });
      });
    },
    addCalendarFlow() {
      // Validate visitor
      this.$validateVisitorBtns.forEach((btn) => {
        btn.addEventListener('click', (ev) => {
          ev.preventDefault();
          const visitor = btn.parentElement.parentElement.parentElement;
          const request = visitor.querySelector('.request');
          const responseContentAdded =
            visitor.querySelector('.response__denied');
          if (request.classList.contains('denied')) {
            visitor.classList.remove('visitor--md');
            request.classList.remove('denied');
            responseContentAdded.classList.remove('denied');
          }
          const responseContent = visitor.querySelector('.response__content');
          const btns = visitor.querySelector('.response__btns');

          if (responseContent.classList.contains('close')) {
            responseContent.classList.remove('close');
          }

          request.classList.add('confirmed');
          visitor.classList.add('visitor--sm');
          responseContent.classList.remove('hide');
          setTimeout(() => {
            responseContent.classList.add('confirmed');
          }, 150);

          btns.addEventListener('click', (e) => {
            e.preventDefault();
            responseContent.classList.add('close');
            visitor.classList.remove('visitor--sm');
          });
        });
      });

      // Cancel visitor
      this.$cancelVisitorBtns.forEach((btn) => {
        btn.addEventListener('click', (ev) => {
          ev.preventDefault();
          const visitor = btn.parentElement.parentElement.parentElement;
          const request = visitor.querySelector('.request');
          const responseContentAdded =
            visitor.querySelector('.response__content');
          if (request.classList.contains('confirmed')) {
            visitor.classList.remove('visitor--sm');
            request.classList.remove('confirmed');
            responseContentAdded.classList.remove('confirmed');
            responseContentAdded.classList.add('hide');
          }
          const responseContent = visitor.querySelector('.response__denied');
          const responseReason = visitor.querySelector('.response__reason');
          const responseMoment = visitor.querySelector('.response__moment');
          const validateAlternativeMoment = visitor.querySelector(
            '.alternative-moment'
          );
          const refuseAlternativeMoment = visitor.querySelector(
            '.no-alternative-moment'
          );
          const requestTime = visitor.querySelector('.request__time-container');
          const responseTime = visitor.querySelector('.response__timepicker');
          const validateNewMoment = visitor.querySelector('.send');

          // if (responseContent.classList.contains('close')) {
          //   responseContent.classList.remove('close');
          // }
          visitor.classList.add('visitor--md');
          request.classList.add('denied');

          setTimeout(() => {
            responseContent.classList.add('denied');
          }, 150);

          responseReason.addEventListener('click', (e) => {
            e.preventDefault();
            responseMoment.classList.remove('hide');
            responseReason.classList.add('hide');
          });

          refuseAlternativeMoment.addEventListener('click', (e) => {
            e.preventDefault();
            responseContent.classList.add('close');
            visitor.classList.remove('visitor--md');
          });

          validateAlternativeMoment.addEventListener('click', (e) => {
            e.preventDefault();
            responseMoment.classList.add('hide');
            responseTime.classList.remove('hide');
          });

          validateNewMoment.addEventListener('click', (e) => {
            e.preventDefault();
            responseContent.classList.add('close');
            visitor.classList.remove('visitor--md');
            request.classList.add('pending');
          });
        });
      });
    },
  };

  app.initialize();
})();
