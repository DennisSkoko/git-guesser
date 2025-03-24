<script lang="ts">
  const { label, name } = $props()
</script>

<label>
  <span>{label}</span>
  <input name={name} />
</label>
