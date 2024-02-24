export function arrayBufferToImageFile(arrayBuffer: ArrayBuffer | string, filename: string, type = 'image/jpg') {
  const blob = new Blob([arrayBuffer], { type }) // 假设图像是JPEG格式
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename

  document.body.appendChild(link)
  link.click()

  URL.revokeObjectURL(url)
  document.body.removeChild(link)
}

export function arrayBufferToBase64(arrayBuffer: ArrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer)

  let binary = ''
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i])
  }

  return btoa(binary)
}
