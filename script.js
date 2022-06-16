const can = document.createElement('canvas')
const ctx = can.getContext('2d')
const video = document.querySelector('video')
/** @type {HTMLDivElement} */
const backElem = document.querySelector('div.container')
const article = document.querySelector('article')

can.width = 1
can.height = 1

/** @type {{x: number, y: number, array: HTMLDivElement[]}} */
const segments = {
  x: 24,
  y: 12,
  array: []
}

article.style.gridTemplateColumns = `repeat(${segments.x}, 1fr)`;
article.style.gridTemplateRows = `repeat(${segments.y}, 1fr)`;

for (let y = 0; y < segments.y; y++) {
  for (let x = 0; x < segments.x; x++) {
    const d = document.createElement('div')
    d.className = 'block'
    d.dataset.x = x
    d.dataset.y = y
    article.appendChild(d)
    segments.array.push(d)
  }
}

const render = () => {
  requestAnimationFrame(render)

  const { videoWidth, videoHeight } = video

  if (!videoWidth || !videoHeight)
    return

  const sX = videoWidth / segments.x
  const sY = videoHeight / segments.y

  for (const seg of segments.array) {
    const w = segments.x
    const h = segments.y
    const x = +(seg.dataset.x ?? 0)
    const y = +(seg.dataset.y ?? 0)
    const isHight = false

    if (x != 0 && y != 0 && x + 1 != w && y + 1 != h)
      continue

    if (isHight && y == 0)
      ctx.drawImage(video, x * sX, y * sY + sY * 1.5, sX, sY, 0, 0, 1, 1)
    else if (isHight && y + 1 == h)
      ctx.drawImage(video, x * sX, y * sY - sY * 1.5, sX, sY, 0, 0, 1, 1)
    else
      ctx.drawImage(video, x * sX, y * sY, sX, sY, 0, 0, 1, 1)

    const rgb = ctx.getImageData(0, 0, 1, 1).data
    seg.style.backgroundColor = `rgba(${rgb.join(',')})`
  }

}
render()