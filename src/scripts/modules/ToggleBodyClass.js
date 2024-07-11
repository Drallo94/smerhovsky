/**
 * ToggleBodyClass
 * ======================================
 * - toggle class on body
 * - multiple classes supported - "CLASSNAME CLASSNAME2 ..."
 * - add class to html attr [data-toggle="CLASSNAME"]
 * - remove class when attr [data-remove="CLASSNAME"]
 */

 const ELEMENTS = '.js-ToggleBodyClass'

 class ToggleBodyClass {
   constructor() {
     this.elements = document.querySelectorAll(ELEMENTS)

     if (!this.elements) {
       return false
     }

     this.elements.forEach(el => {
       el.addEventListener('click', this.toggle, false)
     })
   }

   toggle = (e) => {
     const el = e.currentTarget
     const classes = el.getAttribute('data-toggle')
     const classesRemove = el.getAttribute('data-remove')

     if(classesRemove){
      classesRemove.split(" ").forEach(className => {
        document.body.classList.remove(className)
       })
    } else {
     classes.split(" ").forEach(className => {
      document.body.classList.toggle(className)
     })
    }

   }
 }

 new ToggleBodyClass()
