class Tabs {
  constructor() {
    this.WIDGET = '.js-tabs'
    this.ACTIVECLASS = 'current'

    this.elements = document.querySelectorAll(this.WIDGET)

    this.elements.forEach((el) => {
      const nav = el.querySelectorAll('.js-tabs-nav > *')
      const select = el.querySelector('.js-tabs-select')

      nav.forEach((el) => {
        el.addEventListener('click', this.clickHandler, false)
      })

      if (select) {
        select.addEventListener('change', this.selectHandler, false)
      }
    })

    this.activateTabFromURL()
  }

  activateTabFromURL() {
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get('tab')

    if (tabParam) {
      const tabIndex = parseInt(tabParam, 10) - 1
      if (!isNaN(tabIndex)) {
        this.elements.forEach((widget) => {
          this.switchTab(widget, tabIndex)
          const nav = widget.querySelectorAll('.js-tabs-nav > *')
          if (nav[tabIndex]) {
            nav[tabIndex].classList.add(this.ACTIVECLASS)
          }
        })
      }
    }
  }

  clickHandler = (e) => {
    const button = e.currentTarget
    const widget = button.closest(this.WIDGET)

    this.switchTab(widget, this.getIndex(button))
    button.classList.add(this.ACTIVECLASS)
  }

  selectHandler = (e) => {
    const select = e.currentTarget
    const widget = select.closest(this.WIDGET)

    this.switchTab(widget, select.selectedIndex)
  }

  switchTab = (widget, index) => {
    const tabs = widget.querySelectorAll('.js-tabs-list > *')

    this.reset(widget)

    tabs.forEach((tab) => {
      if (this.getIndex(tab) === index) {
        tab.removeAttribute('hidden')
      }
    })

    window.dispatchEvent(new CustomEvent('scroll'))
  }

  getIndex = (el) => {
    return [...el.parentNode.children].indexOf(el)
  }

  reset = (widget) => {
    const nav = widget.querySelectorAll('.js-tabs-nav > *')
    const tabs = widget.querySelectorAll('.js-tabs-list > *')

    nav.forEach((button) => {
      button.classList.remove(this.ACTIVECLASS)
    })

    tabs.forEach((tab) => {
      tab.setAttribute('hidden', 'hidden')
    })
  }
}

new Tabs()
