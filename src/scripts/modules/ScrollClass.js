/*
  @ Add body class if:
  - scroll started
  - scrolled to bottom
*/

const START_OFFSET = 10;
const START_CLASS = "is-scrolled";
const BOTTOM_OFFSET = 10;
const BOTTOM_CLASS = "is-scrolled-bottom";

const UP_DOWN_CLASSES = false;
const UP_CLASS = "scrolling-up";
const DOWN_CLASS = "scrolling-down";

class ScrollClass {
  constructor() {
    document.addEventListener("scroll", this.scrollHandler, {passive: true});

    this.scrollHandler();
  }

  scrollHandler = () => {
    const top = document.documentElement.scrollTop;

    document.body.classList.toggle(START_CLASS, top >= START_OFFSET);
    document.body.classList.toggle(
      BOTTOM_CLASS,
      window.innerHeight + top >= document.body.offsetHeight - BOTTOM_OFFSET
    );

    if (UP_DOWN_CLASSES) {
      if(this.oldScroll > top){
        document.body.classList.add(UP_CLASS)
        document.body.classList.remove(DOWN_CLASS);
      } else {
        document.body.classList.add(DOWN_CLASS)
        document.body.classList.remove(UP_CLASS);
      }
    }

    this.oldScroll = top;

  };
}

new ScrollClass();
