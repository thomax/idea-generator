<script>
  import { onMount } from 'svelte'
  import { contentMeta, randomItemFrom } from './stores/contentStore.js'
  import { random } from './lib/utils.js'
  let localContentMeta
  let result = ''
  const drawnCardX = '30%'
  const drawnCardY = '0px'
  let drawnCardTransform = ''

  contentMeta.subscribe((updatedContentMeta) => {
    localContentMeta = updatedContentMeta
  })

  onMount(() => {
    const elements = document.querySelectorAll('.card')
    const randomImage = `url("../src/assets/card-0${random(1, 5)}.jpg")`

    elements.forEach((element) => {
      // @ts-ignore
      element.style.backgroundImage = randomImage
    })
  })

  function handleClickLabel(category, label) {
    result = randomItemFrom(category, label)
    playEnterAnimation()
  }

  function handleClickDrawnCard() {
    playExitAnimation()
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
            <a class="categoryLabel" name={label} on:click={handleClickLabel(category.name, label)}
              >{label}</a
            >
          </div>
        {/each}
      </div>
    {/each}
  </div>
  <div id="drawn-card" class="card" on:click={handleClickDrawnCard}>{result}</div>
</main>
