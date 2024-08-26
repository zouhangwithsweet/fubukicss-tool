export function roundTranslateValues(element: HTMLDivElement) {
  const transform = element.style.transform
  if (!transform) return

  const newTransform = transform.replace(
    /(translate[XY])\s*\(\s*(-?\d+\.?\d*)/g,
    (_, prop, value) => `${prop}(${Math.round(parseFloat(value))}`,
  )

  if (newTransform !== transform) {
    element.style.transform = newTransform
  }
}
