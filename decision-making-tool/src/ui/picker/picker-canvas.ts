import { Component } from '@/ui/component'
import type { OptionModel } from '@/model/option'

export class PickerCanvas extends Component<'div'> {
  private readonly canvas: Component<'canvas'>

  constructor() {
    super({ tag: 'div', className: 'flex justify-center' })

    this.canvas = new Component<'canvas'>({ tag: 'canvas' })
    this.canvas.getNode().width = document.body.clientWidth
    this.canvas.getNode().height = Math.ceil(document.body.clientHeight / 2)

    this.append(this.canvas)
  }

  public drawWheel(pickerOptions: (OptionModel & { color: string })[], rotation: number = 0): void {
    const context = this.canvas.getNode().getContext('2d')

    if (context === null) {
      return
    }

    const centerX = this.canvas.getNode().width / 2
    const centerY = this.canvas.getNode().height / 2
    const radius = Math.min(centerX, centerY) - 20

    context.clearRect(0, 0, this.canvas.getNode().width, this.canvas.getNode().height)

    context.save()

    context.translate(centerX, centerY)
    context.rotate(rotation)

    const totalWeight = pickerOptions.reduce((sum, option) => sum + option.weight, 0)
    let startAngle = 0

    for (const option of pickerOptions) {
      const angle = (option.weight / totalWeight) * Math.PI * 2
      const endAngle = startAngle + angle

      context.beginPath()
      context.moveTo(0, 0)
      context.arc(0, 0, radius, startAngle, endAngle)
      context.closePath()

      context.fillStyle = option.color
      context.fill()

      context.strokeStyle = '#fff'
      context.lineWidth = 2
      context.stroke()

      if (angle > 0.3) {
        context.save()

        const midAngle = startAngle + angle / 2
        context.rotate(midAngle)

        context.textAlign = 'center'
        context.fillStyle = '#000'

        let title = option.title
        const maxWidth = radius * angle * 0.6

        if (context.measureText(title).width > maxWidth) {
          while (context.measureText(title + '…').width > maxWidth && title.length > 0) {
            title = title.slice(0, -1)
          }

          title += '…'
        }

        context.fillText(title, radius * 0.6, 0)
        context.restore()
      }

      startAngle = endAngle
    }

    context.restore()

    context.beginPath()
    context.arc(centerX, centerY, 20, 0, Math.PI * 2)

    context.fillStyle = '#fff'
    context.fill()

    context.strokeStyle = '#000'
    context.lineWidth = 2
    context.stroke()

    context.beginPath()
    context.moveTo(centerX, 30)
    context.lineTo(centerX + 10, 10)
    context.lineTo(centerX - 10, 10)
    context.closePath()

    context.fillStyle = '#000'
    context.fill()
  }
}
