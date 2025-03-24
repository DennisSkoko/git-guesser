<script lang="ts">
  const { title } = $props()
</script>

<div>
  <h2>{title}</h2>
  <slot />
</div>

<style>
  h2 {
    margin: 0 0 1em;
    font-size: 3rem;
  }

  div {
    margin: 5em 0;
  }
</style>
