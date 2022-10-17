const app = {
  initialize() {
    this.cacheELements();
    this.animations();
  },
  cacheELements() {
    this.$staggerFromBottom = document.querySelectorAll(
      '.staggerFromBottomAnimation'
    );
    this.$staggerFromBottom2 = document.querySelectorAll(
      '.staggerFromBottomAnimation-x2'
    );
    this.$staggerFromTop = document.querySelectorAll(
      '.staggerFromTopAnimation'
    );
    this.$scaleFromNullAnimation = document.querySelectorAll(
      '.scaleFromNullAnimation'
    );
  },
  animations() {
    gsap.from(this.$staggerFromBottom, {
      y: -10,
      opacity: 0,
      ease: 'power3.out',
    });

    gsap.from(this.$staggerFromTop, {
      y: -10,
      opacity: 0,
      duration: 0.25,
      stagger: 0.1,
      ease: 'power3.in',
    });

    gsap.from(this.$staggerFromBottom2, {
      y: -10,
      opacity: 0,
      stagger: 0.05,
      duration: 0.25,
      ease: 'power4.out',
    });

    gsap.from(this.$scaleFromNullAnimation, {
      scale: 0,
      opacity: 0,
      ease: 'power3.out',
    });
  },
};

app.initialize();
