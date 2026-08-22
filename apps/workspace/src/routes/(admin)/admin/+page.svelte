<script lang="ts">
  import { Alert, EmptyState, FilterBar, Table } from '@naira/ui-svelte';
  import { adminFilters, adminRows } from '../../../lib/fixtures/admin-pilot';

  const rows = adminRows.map(({ name, status, updated }) => ({ name, status, updated }));
</script>

<section class="grid gap-6" aria-labelledby="admin-title">
  <div>
    <p class="text-sm font-semibold uppercase tracking-[0.14em] text-action-primary">
      Admin workspace
    </p>
    <h1 id="admin-title" class="mt-2 text-4xl font-bold text-content-primary md:text-6xl">
      Operational overview.
    </h1>
    <p class="mt-3 max-w-2xl text-lg text-content-muted">
      Pilot surface untuk filter, table, status, dan empty/error treatment.
    </p>
  </div>

  <Alert
    tone="info"
    title="Pilot mode"
    message="Data di halaman ini masih fixture untuk validasi design system."
  />
  <FilterBar filterCount={2}>
    <span class="rounded-md bg-surface-elevated px-3 py-2 text-sm text-content-primary"
      >Status: {adminFilters.status}</span
    >
    <span class="rounded-md bg-surface-elevated px-3 py-2 text-sm text-content-primary"
      >Region: {adminFilters.region}</span
    >
  </FilterBar>
  <Table
    caption="Trip operations"
    density="compact"
    columns={[
      { key: 'name', label: 'Trip' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Updated' },
    ]}
    {rows}
  />
  <EmptyState
    title="No pending escalations"
    description="Semua operational review pilot sudah tertangani."
  />
</section>
