/**
 * Dropdown
 * ======================================
 * - mobile only
 * - add class to parent on click
 * - and close others open on mobile
 */

const WIDGET = '.dropdown'
const ACTIVECLASS = 'is-open'
const IS_COARSE = matchMedia('(pointer:coarse)').matches

export class Dropdown {
  constructor() {
    this.elements = document.querySelectorAll(WIDGET)
  }

  init = () => {
   this.elements.forEach((el) => {
     const button = el.querySelector('.dropdown__btn')

     if(button){
       button.addEventListener('click', this.clickHandler, false)
     }
  })
  }

  clickHandler = (e) => {
    const button = e.currentTarget
    const widget = button.closest(WIDGET)

    if(!widget.classList.contains(ACTIVECLASS)){
      this.closeActive()
    }

    widget.classList.toggle(ACTIVECLASS)
  }

  closeActive = () => {
   const openDropdown = document.querySelector('.dropdown.is-open')

   if(openDropdown){
     openDropdown.classList.remove('is-open')
   }
  }
}

if(IS_COARSE){
 const DropdownObject = new Dropdown()
 DropdownObject.init()
}
