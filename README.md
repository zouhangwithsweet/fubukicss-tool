# fubukicss-tool

A browser extension to **get TailwindCSS/UnoCSS/CSS from Figma in one step.**

## Usage

> [!IMPORTANT]
> <img height="200" alt="image" align="right" src="https://github.com/ecomfe/tempad-dev/assets/1726061/ac185c15-b7b1-4deb-984b-45027a84650c">
> <img height="200" alt="image" align="right" src="https://lh3.googleusercontent.com/fife/ALs6j_GE4ysmit8lN3rjJ6w37TlZ841PW_pL9m8queinvsnj8i5m6bUFVo_ZQiCQJOVll05Uw7anZHi_309sd8ubgboGy9v-4dWtsGtjgBlPa8fcuMNT4AP6vEHaVPf4SwtVPeNAaveSNuLD95nGNd1xWzz8XwkRZrdxcO7JjhNNEZNEXsR-TRVFAcSxtMCm164Qint3StfIk-tH6t3BBYUhMeuB0CncBXzbxrhSvFJM4mWBjHXT8BC-wmoNmHf9yRcuUyYSOhI__uOTFu0XWND0N5FpC0u2fo4sZoiy3PmbO03IA7pzbfwETnoMYTlMBPjVebmuzUX9REgWUJUPj34ZGPL4fwoUFpXckDXhiZMsP7iuAr8i39e682r1eMXArratCpXAGpYZQHBTmKVWwakRhnlm4q8pmQQnORmoSOHmtSZmL_1mcjwhurWsNa8gN90VgS_SbC1-7eqdA8aVtLT5Knz_rhUqF3JH7Gcrw8kas_jKhGZgLiNI3K82kYVwgUz80W54BFw5mMZE6p6OMMTrVAkGXljEyknWgOcq27olh1Gh_Oc_gNRSlXkYmmY0bWC42_D2btqxi28DGzBT0rsKK3K9G6oRMsUf_BENgNQABlVAHEvDeCx_e3zSJKrZzYGWhO6JwNFqq_3lQyOzZoYccAO0VVGud0pUnDwUwPhR2mGE2SDrcDrDr_C2BOsp2lIyrm_CoHzgoXLlBkSKuMOR1aDPkjW34Du2ZFmXovbiWibitoLGnfxn7y2tPRd8_rTSom9R8CHPe1VIj7wPQAXbwMBeu_jma9t0ZLGjo68P73g6FEZ__GF8NyfyFrm2elakhAH0MkZXVnI0OK1biYYAYGvoPnMFNcxf94ylhCfv398RzusrPulttIgqbluSqKIlT3DNOKbLprzMgthqr1K1l2wGKb0ylvlv3TtiiuiQgy15TbrlR9KlZZ8liB4z8IZ3QBSTgjd_l20qYBXrttO9fTn-szUjd45mptKp5XyLD71JrkKpkrdXoKzs10Csa0j89bGByAvJMDmIdT7iUUc1hcOV0SJEM3zhE02iwV6xhIPrQ2XEok2z6y7caj7wHJRGkYz-N6_Y2pHCZzmAzW0qhQ2g1JQBTh6JQCaDgC9Pnvf20bGvkHaZWus_aQhWqib1Vj9DUYGPFEmY3Vf4j728fwrdGupLmEMjHyqJYbNLwRK8PoKKvCzonjSnIYJEV75fdiY8A4Z6b3Gniwp272qND5wBaU6VCxjJEg8uP28bZsORd1Xn54u269awOIi-GfyEn24e-WD7Z-Xlq-LHrVc4Oy2L_u_onCLcGzr-OIiOgBKwPREkHSb8v_9qkd4SdyZOV5XLnksKyMHL170xUPHmZTQI8H5TxlFfI1s_Bwd_rX9Op58ii5YvclMp51veQN0I8m_lcfjHSeYT9no-yPo9Vuym2DE1nyjms7U56FNISMU1PUaMYMW4lYX-IRPFvIFBA9lsmAc_rH-t7qcmIkMfMR-kzU64KOgWSy0xOTObDs8Bi29EeOsYUMI0WkBIisxQEtMFMLSqQf6OVLIhIBlZe5UFdZL3hKiFfEQO72snG9_TsOsF8inexdFyYBgP1dpfoE1hwMOJtR-vmorP0u1xkg=w2884-h1714">
>
> On March 19, Figma removed the `window.figma` in view-only mode pages (which the Fubukicss extension relies on to function properly). After our proactive communication, the Figma team promised to re-add the `window.figma` interface within a few weeks. During the waiting period, Fubukicss cannot work properly in view-only mode. You can use it in edit mode by using the “Duplicate to your drafts” feature and use it in edit mode.
>
> You can follow [this post](https://forum.figma.com/t/figma-removed-window-figma-on-view-only-pages-today/67292) to get the latest updates.

Check it on chrome store [fubukicss-tool](https://chrome.google.com/webstore/detail/behnfolmiinfhphfdolomedncdnogcim)
or download zip file from here [fubukicss-stage](https://fubukicss.zouhangoo7241.workers.dev/)

## Motivation

Due to the recent introduction of charges for Figma's dev mode, which restricts the direct export of CSS, I've developed this browser extension.

## Features

- [x] Export Figma styles to CSS
- [x] Export Figma styles to tailwindcss / unocss
- [x] Export Figma Frame Node to image
- [x] List Figma colors

![image](https://pbs.twimg.com/media/GHtXze9aAAAZr1I?format=png&name=900x900)

## Development

Install dependencies
```bash
pnpm i
```

Setup dev mode
```bash
pnpm dev
```

Build
```bash
pnpm build
```

## Credits

- [figma-viewer-chrome-plugin](https://github.com/leadream/figma-viewer-chrome-plugin)
- [transform-to-unocss-core](https://github.com/Simon-He95/transform-to-unocss-core)
