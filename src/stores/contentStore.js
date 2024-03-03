// @ts-nocheck
import { get, writable } from 'svelte/store'
import { defaultContent } from '../lib/defaultContent.js'


export const content = writable(defaultContent)
export let contentMeta = writable([])
updateMeta(get(content))

function updateMeta(content) {
  const categories = content.map((category) => {
    const labels = category.variants.map((alternative) => alternative.label)
    return {
      name: category.name,
      labels
    }
  })
  contentMeta.set(categories)
}

export function randomItemFrom(categoryName, label) {
  const category = get(content).find((aCategory) => aCategory.name === categoryName)
  const variant = category.variants.find((alternative) => alternative.label === label)
  const randomItem = variant.alternatives[Math.floor(Math.random() * variant.alternatives.length)]
  return randomItem
}

content.subscribe((updatedContent) => {
  updateMeta(updatedContent)
})
