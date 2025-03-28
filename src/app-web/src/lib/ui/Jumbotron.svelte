<script lang="ts">
  const { title, content } = $props()
</script>

<div>
  <h2>{title}</h2>
  {@render content?.()}
</div>

<style>
  h2 {
    margin: 0 0 .5em;
    font-size: 3rem;
  }

  div {
    margin: 5em 0;
  }
</style>
