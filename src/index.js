import $ from 'jquery'
import './scss/index.scss'

import activeLink from './js/modules/activeLink'

activeLink()
// Вариант написания скрипта с библиотекой JQuery
// $(document).ready(function () {
//   var currentFloor  = 2
//   var counterUp     = $('.counter__arrow-up')
//   var counterDown   = $('.counter__arrow-down')

//   $('.main__image-home path').on('mouseover', function () {
//     $('.main__image-home path').removeClass('current-floor')
//     currentFloor = $(this).attr('data-floor')
//     $('.counter__number').text(currentFloor)
//     $(`[data-floor=${currentFloor}]`).toggleClass('current-floor')
//   })

//   counterUp.on('click', function () {
//     if (currentFloor < 18) {
//       currentFloor++
//       var usCurrentFloor = currentFloor.toLocaleString('en-US', {
//         minimumIntegerDigits: 2,
//         useGrouping: false
//       })
//       $('.counter__number').text(usCurrentFloor)
//       $('.main__image-home path').removeClass('current-floor')
//       $(`[data-floor=${usCurrentFloor}]`).toggleClass('current-floor')
//     }
//   })

//   counterDown.on('click', function () {
//     if (currentFloor > 2) {
//       currentFloor--
//       var usCurrentFloor = currentFloor.toLocaleString('en-US', {
//         minimumIntegerDigits: 2,
//         useGrouping: false
//       })
//       $('.counter__number').text(usCurrentFloor)
//       $('.main__image-home path').removeClass('current-floor')
//       $(`[data-floor=${usCurrentFloor}]`).toggleClass('current-floor')
//     }
//   })
// })

// Вариант написания скрипта на чистом JavaScript
document.addEventListener('DOMContentLoaded', () => {
  let currentFloor    = 2
  const pathFloor     = document.querySelectorAll('[data-floor]')
  const imageParent   = document.querySelector('.main__image-home')
  const counterPlace  = document.querySelector('.counter__number')
  const counterUp     = document.querySelector('.counter__arrow-up')
  const counterDown   = document.querySelector('.counter__arrow-down')
  const modalWindow   = document.querySelector('.modal')
    
  const getZero = number => number >= 0 && number < 10 ? `0${number}` : number
  
  imageParent.addEventListener('mouseover', (event) => {
    const target    = event.target,
          thisFloor = target.hasAttribute('data-floor')
    
    if (target && thisFloor) {
      pathFloor.forEach((path) => path.classList.remove('current-floor'))
      currentFloor = target.getAttribute('data-floor')
      counterPlace.innerHTML = currentFloor
      document.querySelector(`[data-floor="${currentFloor}"]`).classList.toggle('current-floor')
    }   
  })

  counterUp.addEventListener('click', () => {    
    if (currentFloor < 18) {
      currentFloor++
      counterPlace.innerHTML = getZero(currentFloor)
      pathFloor.forEach((path) => path.classList.remove('current-floor'))
      document.querySelector(`[data-floor="${getZero(currentFloor)}"]`).classList.toggle('current-floor')
    }    
  })

  counterDown.addEventListener('click', () => {    
    if (currentFloor > 2) {
      currentFloor--
      counterPlace.innerHTML = getZero(currentFloor)
      pathFloor.forEach((path) => path.classList.remove('current-floor'))
      document.querySelector(`[data-floor="${getZero(currentFloor)}"]`).classList.toggle('current-floor')
    }
  })

  document.addEventListener('click', (event) => {
    const target              = event.target
    const showModalBtn        = target.classList.contains('main__nav-btn')
    const modalCover          = target.classList.contains('modal')
    const modalCloseBtn       = target.classList.contains('modal__close-btn')
    const svgBtn              = target.classList.contains('svg__close-btn')
    const pathBtn             = target.classList.contains('path__close-btn')
    const currentNumberFloor  = document.querySelector('.counter__number').innerHTML
    let currentFloorInModal   = document.querySelector('.modal__counter')
    
    if (target && (target.hasAttribute('data-floor') || showModalBtn)) {
      modalWindow.classList.add('show')
      currentFloorInModal.innerHTML = currentNumberFloor
      
    }
    if (target && (modalCloseBtn || svgBtn || pathBtn || modalCover)) {
      modalWindow.classList.remove('show')
    }
  })
})