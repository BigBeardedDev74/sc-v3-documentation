<script lang="ts">
  import Config from "$components/Config.svelte";
  export let data;
</script>

<section class="section">
  <Config configDetails={data.configOptions} />
</section>
