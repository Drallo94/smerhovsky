/**
 * Animate
 * ======================================
 * - add class to element in viewport
 * - if you want disable animate delay on mobile use [animate-delay-desktop]
 * - set animation delay via [animate-delay] html attribute
 * - set visible threshold via [animate-threshold] html attribute
 * - toggle class on body when visible via [animate-body-class] attr
 * - add class for all childrens of AUTO_CHILDRENS
 */

const ISMOBILE = window.matchMedia("only screen and (max-width: 768px)").matches
const THRESHOLD = ISMOBILE ? '0.4' : '0.6'
const LOAD_THRESHOLD = '0.2'
const ELEMENTS_CLASS = 'animate'
const VISIBLE_CLASS = 'animate--visible'
const AUTO_CHILDRENS = '.js-animate-childrens'

class Animate {
  constructor() {
   this.auto_elements = document.querySelectorAll(AUTO_CHILDRENS)

   if(this.auto_elements){
    this.auto_elements.forEach((group) => {
      for (const child of group.children) {
        child.classList.add(ELEMENTS_CLASS)
      }
    })
   }

   this.THRESHOLD = THRESHOLD
   this.LOAD_THRESHOLD = LOAD_THRESHOLD
   this.sections = document.querySelectorAll('.'+ ELEMENTS_CLASS)

     if('IntersectionObserver' in window) {
       this.sections.forEach((el) => {
        const BoundingClientRect = el.getBoundingClientRect()
        const visibleRatio =  BoundingClientRect.height / window.innerHeight

        if(visibleRatio > 0.95){
          this.THRESHOLD =  window.innerHeight / BoundingClientRect.height / 100 * 30
          this.LOAD_THRESHOLD = window.innerHeight / BoundingClientRect.height / 100 * 20
        }

         // observe on page load
         const loadObserver = new IntersectionObserver(this.observeCallback, {
           threshold: this.LOAD_THRESHOLD
         });
         loadObserver.observe(el);


         setTimeout(() => {
           loadObserver.disconnect();
         }, 100);

         // observe
         const observerThreshold = el.getAttribute('animate-threshold') ? el.getAttribute('animate-threshold') : this.THRESHOLD
         const observer = new IntersectionObserver(this.observeCallback, {
           threshold: observerThreshold
         });
         observer.observe(el);
       })
     } else {
       this.sections.forEach((el) => {
         el.classList.add(VISIBLE_CLASS)
       })
     }
  }

   observeCallback = (entries) => {
     entries.map((entry) => {
       const section = entry.target;
       const delay = this.getDelay(section)
       const sectionBodyClass = section.getAttribute('animate-body-class')

       if (entry.isIntersecting) {
         if(ISMOBILE && section.getAttribute('animate-delay-desktop')){
           section.classList.add(VISIBLE_CLASS)

           this.bodyClass(sectionBodyClass, 'add')
         } else {
           setTimeout(() => {
             section.classList.add(VISIBLE_CLASS)
             this.bodyClass(sectionBodyClass, 'add')
           }, delay)
         }
       } else {
         this.bodyClass(sectionBodyClass, 'remove')
       }
     });
   }

  getDelay = (section) => {
  var delay = section.getAttribute('animate-delay')

  if(!ISMOBILE && section.getAttribute('animate-delay-desktop')){
    var delay = section.getAttribute('animate-delay-desktop')
  }

  if (delay === null) {
    return 0
  } else if (delay.includes('.')) {
    return parseInt(delay * 1000)
  } else {
    return parseInt(delay)
  }
  }

  bodyClass = (htmlclass, type) => {
    if(!htmlclass){
      return
    }

     if(type == 'add'){
       document.body.classList.add(htmlclass)
     } else {
       document.body.classList.remove(htmlclass)
     }
   }
}

new Animate()
