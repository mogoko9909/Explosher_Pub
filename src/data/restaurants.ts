import { KosherLevel } from '../types';

// Sourced from the kosher culinary venue lists for Prague and Athens.
// Only genuinely kosher-certified venues (glatt / supervised) are used as
// meal stops in tour itineraries — vegetarian/vegan-only or "not certified"
// venues from the source lists are intentionally excluded from meals.
export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  priceRange: string;
  address: string;
  kosherLevel: KosherLevel;
  kosherAuthority: string;
};

export const pragueRestaurants: Record<string, Restaurant> = {
  kingSolomon: {
    id: 'king-solomon',
    name: 'King Solomon Restaurant',
    cuisine: 'Israeli / Middle Eastern (Meat)',
    priceRange: '€€–€€€',
    address: 'Maiselova 18, 110 00 Prague',
    kosherLevel: 'supervised',
    kosherAuthority: 'Kosher supervised – Jewish Community of Prague',
  },
  golem: {
    id: 'golem',
    name: 'Golem Restaurant',
    cuisine: 'Jewish / European (Meat)',
    priceRange: '€€',
    address: 'Maiselova 22, 110 00 Prague',
    kosherLevel: 'supervised',
    kosherAuthority: 'Kosher supervised – Jewish Community of Prague',
  },
  dinitz: {
    id: 'dinitz',
    name: 'Dinitz Kosher Restaurant',
    cuisine: 'Israeli / Jewish (Meat)',
    priceRange: '€€',
    address: 'Bílkova 863/12, 110 00 Prague',
    kosherLevel: 'supervised',
    kosherAuthority: 'Kosher supervised',
  },
  shalom: {
    id: 'shalom',
    name: 'Shalom Restaurant',
    cuisine: 'Jewish / Israeli (Meat)',
    priceRange: '€€',
    address: 'Maiselova 18, 110 00 Prague',
    kosherLevel: 'supervised',
    kosherAuthority: 'Kosher supervised',
  },
};

export const athensRestaurants: Record<string, Restaurant> = {
  gostijo: {
    id: 'gostijo',
    name: 'Gostijo Kosher Restaurant',
    cuisine: 'Sephardic Mediterranean / Jewish-Greek (Meat)',
    priceRange: '€€',
    address: 'Esopou 10, Psiri, Athens',
    kosherLevel: 'glatt',
    kosherAuthority: 'Glatt Kosher – Chabad of Greece (Rabbi Mendel Hendel)',
  },
  parakalo: {
    id: 'parakalo',
    name: 'Parakalo (Kosher Dairy Café-Bistro)',
    cuisine: 'Kosher dairy café-bistro',
    priceRange: '€€',
    address: 'Mikonos 18, Psiri, Athens',
    kosherLevel: 'glatt',
    kosherAuthority: 'Glatt Kosher Dairy – Chabad of Greece (Rabbi Mendel Hendel)',
  },
  kingDavidBurger: {
    id: 'king-david-burger',
    name: 'King David Burger',
    cuisine: 'Kosher burgers / street food (Meat)',
    priceRange: '€',
    address: 'Ermou 78 & Athinas 2, Athens',
    kosherLevel: 'supervised',
    kosherAuthority: 'Kosher supervised – Mehadrin (Rabbi Joel Kaplan, Saloniki)',
  },
};
