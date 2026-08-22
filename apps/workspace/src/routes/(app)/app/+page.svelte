<script lang="ts">
  import { pilotChecklist, pilotItinerary, pilotTrip } from '../../../lib/fixtures/planner-pilot';
  import GearChecklistRecipe from '../../../lib/recipes/GearChecklistRecipe.svelte';
  import ItineraryRecipe from '../../../lib/recipes/ItineraryRecipe.svelte';
  import TripSummaryRecipe from '../../../lib/recipes/TripSummaryRecipe.svelte';
</script>

<section class="grid gap-6" aria-labelledby="planner-title">
  <div>
    <p class="text-sm font-semibold uppercase tracking-[0.14em] text-action-primary">
      Planner workspace
    </p>
    <h1 id="planner-title" class="mt-2 text-4xl font-bold text-content-primary md:text-6xl">
      Siapkan perjalanan dengan lebih terarah.
    </h1>
    <p class="mt-3 max-w-2xl text-lg text-content-muted">
      Pilot surface untuk trip summary, gear, itinerary, dan sync state.
    </p>
  </div>
  <TripSummaryRecipe trip={pilotTrip} />
  <div class="grid gap-6 lg:grid-cols-2">
    <GearChecklistRecipe checklist={pilotChecklist} />
    <ItineraryRecipe itinerary={pilotItinerary} />
  </div>
</section>
