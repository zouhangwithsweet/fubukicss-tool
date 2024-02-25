const namesRGB = ['r', 'g', 'b'] as const

/**
 * this function converts figma color to RGB(A) (array)
 */

// figmaRGBToWebRGB({r: 0.887499988079071, g: 0.07058823853731155, b: 0.0665624737739563})
//=> [226, 18, 17]

function figmaRGBToWebRGB(color: RGBA): webRGBA
function figmaRGBToWebRGB(color: RGB): webRGB
function figmaRGBToWebRGB(color: RGBA | RGB): any {
  const rgb = []

  namesRGB.forEach((e, i) => {
    rgb[i] = Math.round(color[e] * 255)
  })

  if ('a' in color && color['a'] !== undefined) {
    rgb[3] = Math.round(color['a'] * 100) / 100
  } else {
    rgb[3] = 1
  }

  return rgb
}

/**
 * this function converts RGB(A) color (array) to figma color
 */

// webRGBToFigmaRGB([226, 18, 17])
//=> {r: 0.8862745098039215, g: 0.07058823529411765, b: 0.06666666666666667}

function webRGBToFigmaRGB(color: webRGBA): RGBA
function webRGBToFigmaRGB(color: webRGB): RGB
function webRGBToFigmaRGB(color: webRGB | webRGBA): any {
  const rgb: any = {}

  namesRGB.forEach((e, i) => {
    rgb[e] = color[i] / 255
  })

  if (color[3] !== undefined) rgb['a'] = color[3]
  return rgb
}

/**
 * this function converts figma color to HEX (string)
 */

// figmaRGBToHex({ r: 0, g: 0.1, b: 1 })
//=> #001aff

function figmaRGBToHex(color: RGB | RGBA): string {
  let hex = '#'

  const rgb = figmaRGBToWebRGB(color) as webRGB | webRGBA
  hex += ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)

  if (rgb[3] !== undefined) {
    const a = Math.round(rgb[3] * 255).toString(16)
    if (a.length == 1) {
      hex += '0' + a
    } else {
      if (a !== 'ff') hex += a
    }
  }
  return hex
}

/**
 * this function converts HEX color (string) to figma color
 */

// hexToFigmaRGB(#001aff)
//=> { r: 0, g: 0.10196078431372549, b: 1 }

function hexToFigmaRGB(color: string): RGB | RGBA {
  let opacity = ''

  color = color.toLowerCase()

  if (color[0] === '#') color = color.slice(1)
  if (color.length === 3) {
    color = color.replace(/(.)(.)(.)?/g, '$1$1$2$2$3$3')
  } else if (color.length === 8) {
    const arr = color.match(/(.{6})(.{2})/)
    color = arr?.[1] ?? ''
    opacity = arr?.[2] ?? ''
  }

  const num = parseInt(color, 16)
  const rgb = [num >> 16, (num >> 8) & 255, num & 255]

  if (opacity) {
    rgb.push(parseInt(opacity, 16) / 255)
    return webRGBToFigmaRGB(rgb as webRGBA)
  } else {
    return webRGBToFigmaRGB(rgb as webRGB)
  }
}

export function figmaRGBToHSL(color: RGBA | RGB): number[] {
  const a = 'a' in color ? Math.round(color['a'] * 100) / 100 : 1
  const H = figmaRGBToHex(color)
  // Convert hex to RGB first
  let r: any = 0,
    g: any = 0,
    b: any = 0
  if (H.length === 4) {
    r = '0x' + H[1] + H[1]
    g = '0x' + H[2] + H[2]
    b = '0x' + H[3] + H[3]
  } else if (H.length === 7) {
    r = '0x' + H[1] + H[2]
    g = '0x' + H[3] + H[4]
    b = '0x' + H[5] + H[6]
  }
  // Then to HSL
  r /= 255
  g /= 255
  b /= 255
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0

  if (delta === 0) h = 0
  else if (cmax === r) h = ((g - b) / delta) % 6
  else if (cmax === g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  if (h < 0) h += 360

  l = (cmax + cmin) / 2
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return [h, s, l, a]
}

export { figmaRGBToHex, figmaRGBToWebRGB, hexToFigmaRGB, webRGBToFigmaRGB }

type webRGB = [number, number, number]
type webRGBA = [number, number, number, number]
