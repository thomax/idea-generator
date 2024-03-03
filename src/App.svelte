<script>
  import { afterUpdate } from 'svelte'
  import { contentMeta, randomItemFrom } from './stores/contentStore.js'
  import { random } from './lib/utils.js'
  let localContentMeta
  let result = ''
  const drawnCardX = '35%'
  const drawnCardY = '-380px'
  let curretRotation = 0

  contentMeta.subscribe((updatedContentMeta) => {
    localContentMeta = updatedContentMeta
  })

  afterUpdate(() => {
    const elements = document.querySelectorAll('.card')

    elements.forEach((element) => {
      // @ts-ignore
      element.style.backgroundImage = `url("../src/assets/card-0${random(1, 5)}.jpg")`
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
    element.style.display = 'block'

    const startX = random(-1000, 1600)
    const startY = -random(600, 1400)
    const endY = -380
    const direction = Math.random() > 0.5 ? 1 : -1
    const degrees = Math.random() > 0.5 ? 720 : 360
    const duration = random(2000, 4000)
    curretRotation = random(-5, 5)
    element.animate(
      [
        { transform: `translateX(${startX}px) translateY(${startY}px) rotate(0deg)` },
        {
          transform: `translateX(${drawnCardX}) translateY(${drawnCardY}) rotate(${
            curretRotation + degrees * direction
          }deg)`
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
    const style = window.getComputedStyle(element)
    const startX = style.left
    const startY = style.top
    const duration = 500
    const animation = element.animate(
      [
        { transform: `translateX(35%) translateY(-380px) rotate(${curretRotation}deg)` },
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
      // element.remove()
    }
  }
</script>

<main>
  <h1>Idégenerator</h1>

  <section id="gallery">
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
  </section>
  <div id="drawn-card" class="card" on:click={handleClickDrawnCard}>{result}</div>
</main>
