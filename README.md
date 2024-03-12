# fubukicss-tool

A browser extension to **get TailwindCSS/Unocss/CSS from Figma in one step.**

## Usage

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
