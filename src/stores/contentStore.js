// @ts-nocheck
import { get, writable } from 'svelte/store'
import { defaultContent } from '../lib/defaultContent.js'

// On first load, get stored gameState from local storage
const localStorageContent = localStorage.content ? JSON.parse(localStorage.content) : defaultContent

export const content = writable(localStorageContent)
export let contentMeta = writable([])
updateMeta(get(content))

function updateMeta(content) {
  const categories = content.map((category) => {
    const labels = category.alternatives.map((alternative) => alternative.label)
    return {
      name: category.name,
      labels
    }
  })
  contentMeta.set(categories)
}

export function randomItemFrom(categoryName, label) {
  const category = get(content).find((aCategory) => aCategory.name === categoryName)
  const alternative = category.alternatives.find((alternative) => alternative.label === label)
  const randomQuestion = alternative.questions[Math.floor(Math.random() * alternative.questions.length)]
  return randomQuestion
}

content.subscribe((updatedContent) => {
  localStorage.content = JSON.stringify(updatedContent)
  updateMeta(updatedContent)
})
