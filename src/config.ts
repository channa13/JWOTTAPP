export const VideoProgressMinMax = {
  Min: 0.05,
  Max: 0.95,
};

export const PLAYLIST_LIMIT = 25;

/**
 * Set this parameter to `normal` if you want to disable the Poster Fading feature.
 * With set to `fading`, this image is placed on the background and fills a larger portion of the screen.
 */
export const POSTER_MODE: 'fading' | 'normal' = 'fading';

/**
 * Set this parameter to `false` if you want to disable titles below the cards on the home, playlist and search screen.
 */
export const ENABLE_SHELF_TITLES: boolean = true;

/**
 * Set this parameter to `false` if you want to disable the Dynamic Blur feature.
 * The Dynamic Blur feature is a blurred image of the current item on the background of the screen.
 * When a user hovers a card, the blurred image changes to the selected item.
 */
export const DYNAMIC_BLUR: boolean = true;

// The externalData attribute of Cleeng can contain max 5000 characters
export const MAX_WATCHLIST_ITEMS_COUNT = 48;

export const ADYEN_TEST_CLIENT_KEY = 'test_I4OFGUUCEVB5TI222AS3N2Y2LY6PJM3K';

export const ADYEN_LIVE_CLIENT_KEY = 'live_BQDOFBYTGZB3XKF62GBYSLPUJ4YW2TPL';

// how often the live channel schedule is refetched in ms
export const LIVE_CHANNELS_REFETCH_INTERVAL = 15 * 60_000;
