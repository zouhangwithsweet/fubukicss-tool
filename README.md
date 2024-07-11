# fubukicss-tool

A browser extension to **get TailwindCSS/UnoCSS/CSS from Figma in one step.**

## Usage

> [!IMPORTANT]
> <img height="200" alt="image" align="right" src="https://github.com/ecomfe/tempad-dev/assets/1726061/ac185c15-b7b1-4deb-984b-45027a84650c">
> <img height="200" alt="image" align="right" src="https://im.gurl.eu.org/file/48c21f552f64aa7405982.png">
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
