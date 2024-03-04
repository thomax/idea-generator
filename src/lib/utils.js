import card01 from '../assets/card-01.jpg'
import card02 from '../assets/card-02.jpg'
import card03 from '../assets/card-03.jpg'
import card04 from '../assets/card-04.jpg'
import card05 from '../assets/card-05.jpg'
import card06 from '../assets/card-06.jpg'

export const allCardImages = [card01, card02, card03, card04, card05, card06]

export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


