<script>
  // @ts-nocheck

  import { onMount } from 'svelte'
  import Switch from './lib/Switch.svelte'
  import { contentMeta, randomItemFrom } from './stores/contentStore.js'
  import { random, allCardImages } from './lib/utils.js'

  const drawnCardX = '10%'
  const drawnCardY = '0px'
  let localContentMeta
  let result = ''
  let drawnCardTransform = ''
  let isFancyModeEnabled = true

  contentMeta.subscribe((updatedContentMeta) => {
    localContentMeta = updatedContentMeta
  })

  onMount(() => {
    applyStylesAccordingToMode()
  })

  function handleClickLabel(category, label) {
    result = randomItemFrom(category, label)
    playEnterAnimation()
  }

  function handleClickDrawnCard() {
    playExitAnimation()
  }

  function applyStylesAccordingToMode() {
    const cardElements = document.querySelectorAll('.card')
    const headerElements = document.querySelectorAll('h1, h2')
    cardElements.forEach((element) => {
      if (isFancyModeEnabled) {
        const randomImage = `url("${allCardImages[random(0, allCardImages.length - 1)]}")`
        cardElements.forEach((element) => {
          element.style.fontFamily = 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif'
          element.style.backgroundImage = randomImage
        })
      } else {
        cardElements.forEach((element) => {
          element.style.fontFamily = 'Helvetica, Arial, sans-serif'
          element.style.backgroundImage = 'none'
        })
      }
    })
    headerElements.forEach((element) => {
      if (isFancyModeEnabled) {
        element.style.fontFamily = 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif'
      } else {
        element.style.fontFamily = 'Helvetica, Arial, sans-serif'
      }
    })
  }

  const playEnterAnimation = () => {
    const element = document.getElementById('drawn-card')
    element.style.visibility = 'visible'
    element.style.display = 'grid'

    const startX = random(-1000, 1500)
    const startY = -random(500, 1000)
    const direction = Math.random() > 0.5 ? 1 : -1
    const degrees = Math.random() > 0.5 ? 720 : 360
    const duration = random(2000, 4000)
    const rotation = Math.random() > 0.5 ? random(3, 6) : -random(3, 6)
    drawnCardTransform = `translateX(${drawnCardX}) translateY(${drawnCardY}) rotate(${
      rotation + degrees * direction
    }deg)`
    element.animate(
      [
        { transform: `translateX(${startX}px) translateY(${startY}px) rotate(0deg)` },
        {
          transform: drawnCardTransform
        }
      ],
      {
        duration,
        easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        fill: 'forwards' // keep the end state after the animation
      }
    )
  }

  const playExitAnimation = () => {
    const element = document.getElementById('drawn-card')
    const duration = 500
    const animation = element.animate(
      [
        {
          transform: drawnCardTransform
        },
        {
          transform: `translateX(2000px) translateY(0px)`
        }
      ],
      {
        duration,
        easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        fill: 'forwards' // keep the end state after the animation
      }
    )

    animation.onfinish = function () {
      element.style.display = 'none'
    }
  }
</script>

<main>
  <h1>Idégenerator</h1>

  <div id="gallery">
    {#each localContentMeta || [] as category}
      <div class="deck card">
        <h2>{category.name}</h2>
        {#each category.labels || [] as label}
          <div>
            <span class="categoryLabel" on:click={handleClickLabel(category.name, label)}>
              {label}
            </span>
          </div>
        {/each}
      </div>
    {/each}
  </div>
  <div id="drawn-card" class="card" on:click={handleClickDrawnCard}>{result}</div>
</main>

<footer class="footer">
  <Switch
    bind:value={isFancyModeEnabled}
    toggleFunction={applyStylesAccordingToMode}
    label="Fancy mode"
    fontSize={14}
  />
  <p class="footer__text">
    Laget av <a href="https://github.com/thomax/idea-generator" target="_blank">thomax</a> - innhold
    kopiert med tillateslse fra
    <a href="https://skaperskolen.no" target="_blank">skaperskolen.no</a>
  </p>
</footer>
