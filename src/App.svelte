<script>
  import { contentMeta, randomItemFrom } from './stores/contentStore.js'
  let localContentMeta
  let idea = ''

  contentMeta.subscribe((updatedContentMeta) => {
    localContentMeta = updatedContentMeta
  })

  function handleGenerateIdea(category, label) {
    idea = randomItemFrom(category, label)
  }
</script>

<main>
  <h1>Idégenerator</h1>

  {#each localContentMeta || [] as category}
    <div class="card">
      <h2>{category.name}</h2>
      {#each category.labels || [] as label}
        <a on:click={handleGenerateIdea(category.name, label)}>{label}</a>
        <br />
      {/each}
      <div>{idea}</div>
    </div>
  {/each}
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
