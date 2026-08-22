<script lang="ts">
  export let selectedId: string | undefined = undefined;
  export let mobileMode: 'stacked' | 'detail-first' = 'stacked';
</script>

<div
  class={`grid gap-6 lg:grid-cols-[minmax(16rem,0.4fr)_minmax(0,1fr)] ${mobileMode === 'detail-first' ? 'grid-flow-dense' : ''}`}
  data-selected-id={selectedId}
>
  <aside data-testid="list-detail-list" class="min-w-0"><slot name="list" /></aside>
  <section data-testid="list-detail-detail" class="min-w-0"><slot name="detail" /></section>
</div>
