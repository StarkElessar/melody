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
  let currentFlat     = 1
  let currentNumber   = ''
  const pathFloor     = document.querySelectorAll('[data-floor]')
  const pathFlat      = document.querySelectorAll('[data-flat]')
  const nameFlats     = document.querySelectorAll('.flat__list-link')
  const floorParent   = document.querySelector('.main__image-home')
  const flatsParent   = document.querySelector('.flats')
  const counterPlace  = document.querySelector('.counter__number')
  const counterUp     = document.querySelector('.counter__arrow-up')
  const counterDown   = document.querySelector('.counter__arrow-down')
  const modalWindow   = document.querySelector('.modal')
    
  const getZero = number => number >= 0 && number < 10 ? `0${number}` : number
  
  floorParent.addEventListener('mouseover', (event) => {
    const target    = event.target
    const thisFloor = target.hasAttribute('data-floor')
    
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

  modalWindow.addEventListener('mouseover', (event) => {
    const target        = event.target
    const thisFlat      = target.hasAttribute('data-flat')
    const thisNameFlat  = target.hasAttribute('data-flat-number')
    
    if (target && (thisFlat || thisNameFlat)) {
      currentFlat = (target.getAttribute('data-flat') || target.getAttribute('data-flat-number'))
      pathFlat.forEach((path) => path.classList.remove('current-flat'))
      nameFlats.forEach((flat) => flat.classList.remove('current-flat'))
      document.querySelector(`[data-flat-number="${currentFlat}"]`).classList.toggle('current-flat')
      document.querySelector(`[data-flat="${currentFlat}"]`).classList.toggle('current-flat')
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
      changeCurrentNumberOfFlat()
    }
    if (target && (modalCloseBtn || svgBtn || pathBtn || modalCover)) {
      modalWindow.classList.remove('show')
    }
  })

  function changeCurrentNumberOfFlat() {
    const currentNumberOfFlats = document.querySelectorAll('.number-of-flat')
    const counterFloor = document.querySelector('.modal__counter')
    const numbers = ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
    const numbersForLoop = [
      {
        floor: '02',
        numbers: 0
      }, 
      {
        floor: '03',
        numbers: 10
      }, 
      {
        floor: '04',
        numbers: 20
      }, 
      {
        floor: '05',
        numbers: 30
      }, 
      {
        floor: '06',
        numbers: 40
      }, 
      {
        floor: '07',
        numbers: 50
      }, 
      {
        floor: '08',
        numbers: 60
      },
      {
        floor: '09',
        numbers: 70
      },
      {
        floor: '10',
        numbers: 80
      },
      {
        floor: '11',
        numbers: 90
      },
      {
        floor: '12',
        numbers: 100
      },
      {
        floor: '13',
        numbers: 110
      },
      {
        floor: '14',
        numbers: 120
      },
      {
        floor: '15',
        numbers: 130
      },
      {
        floor: '16',
        numbers: 140
      },
      {
        floor: '17',
        numbers: 150
      },
      {
        floor: '18',
        numbers: 160
      }
    ]

    // numbersForLoop.forEach((id, num) => {
    //   if (counterPlace.innerHTML == `'${id}'`) {
    //     currentNumberOfFlats.forEach((flat, index) => {
    //       flat.innerHTML = ''
    //       flat.innerHTML = numbers[index] + num
    //     })
    //   }
    // })

    if (counterPlace.innerHTML == '02') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = numbers[index]
      })
    }
    if (counterPlace.innerHTML == '03') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 10
      })
    }
    if (counterPlace.innerHTML == '04') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 20
      })
    }
    if (counterPlace.innerHTML == '05') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 30
      })
    }
    if (counterPlace.innerHTML == '06') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 40
      })
    }
    if (counterPlace.innerHTML == '07') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 50
      })
    }
    if (counterPlace.innerHTML == '08') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 60
      })
    }
    if (counterPlace.innerHTML == '09') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 70
      })
    }
    if (counterPlace.innerHTML == '10') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 80
      })
    }
    if (counterPlace.innerHTML == '11') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 90
      })
    }
    if (counterPlace.innerHTML == '12') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 100
      })
    }
    if (counterPlace.innerHTML == '13') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 110
      })
    }
    if (counterPlace.innerHTML == '14') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 120
      })
    }
    if (counterPlace.innerHTML == '15') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 130
      })
    }
    if (counterPlace.innerHTML == '16') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 140
      })
    }
    if (counterPlace.innerHTML == '17') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 150
      })
    }
    if (counterPlace.innerHTML == '18') {
      currentNumberOfFlats.forEach((flat, index) => {
        flat.innerHTML = ''
        flat.innerHTML = +numbers[index] + 160
      })
    }
  }
})