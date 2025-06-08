import { type RouteView } from '@/router'
import { BaseView } from '@/view/base'
import { type OptionModel } from '@/model/option'
import { Header } from '@/ui/header'
import { PickerContainer } from '@/ui/picker/picker-container'
import { PickerCanvas } from '@/ui/picker/picker-canvas'
import { PickerPickedOption } from '@/ui/picker/picker-picked-option'
import { PickerControls } from '@/ui/picker/picker-controls'
import { PickerBackButton } from '@/ui/picker/picker-back-button'
import { PickerSoundButton } from '@/ui/picker/picker-sound-button'
import { PickerDurationInput } from '@/ui/picker/picker-duration-input'
import { PickerPickButton } from '@/ui/picker/picker-pick-button'
import { getRandomColor } from '@/util/color'
import { state } from '@/state'
import { easeInOutQuad } from '@/util/animate'

enum PickerState {
  Initial = 'initial',
  Picking = 'picking',
  Picked = 'picked'
}

export class PickerView extends BaseView implements RouteView {
  public readonly container: PickerContainer
  private readonly header: Header
  private readonly canvas: PickerCanvas
  private readonly pickedOption: PickerPickedOption
  private readonly controls: PickerControls
  private readonly backButton: PickerBackButton
  private readonly soundButton: PickerSoundButton
  private readonly durationInput: PickerDurationInput
  private readonly pickButton: PickerPickButton

  private pickerOptions: (OptionModel & { color: string })[] = []
  private pickerState: PickerState = PickerState.Initial
  private mute: boolean = true
  private duration: number = 10
  private rotationAngle: number = 0
  private animationRequestId?: number = undefined

  constructor() {
    super()

    this.header = new Header()
    this.canvas = new PickerCanvas()
    this.pickedOption = new PickerPickedOption()
    this.backButton = new PickerBackButton()
    this.soundButton = new PickerSoundButton()
    this.durationInput = new PickerDurationInput()
    this.pickButton = new PickerPickButton()
    this.controls = new PickerControls(this.backButton, this.soundButton, this.durationInput, this.pickButton)
    this.container = new PickerContainer(this.header, this.canvas, this.pickedOption, this.controls)

    this.backButton.addListener('click', () => {
      if (this.pickerState === PickerState.Picking) {
        return
      }

      this.router?.navigate('/options')
    })

    this.soundButton.addListener('click', () => {
      if (this.pickerState === PickerState.Picking) {
        return
      }

      this.mute = !this.mute
      this.soundButton.setTextContent(this.mute ? 'Sound: Off' : 'Sound: On')
    })

    this.durationInput.setAttribute('value', String(this.duration))

    this.durationInput.addListener('change', () => {
      const value = Number(this.durationInput.getNode().value)
      if (value >= 5 && value <= 30) {
        this.duration = value
      } else {
        this.durationInput.getNode().value = String(this.duration)
      }
    })

    this.pickButton.addListener('click', () => {
      if (this.pickerState === PickerState.Picking || this.duration < 5) {
        return
      }

      this.startPicking()
    })

    this.onRender()
  }

  public onRender(): void {
    if (!state.canStart) {
      setTimeout(() => {
        this.router?.navigate('/options')
      })
      return
    }

    this.pickedOption.setTextContent('')
    this.setPickerOptions()
    this.drawWheel()
  }

  private drawWheel(rotation: number = 0): void {
    this.canvas.drawWheel(this.pickerOptions, rotation)
  }

  private setPickerOptions(): void {
    this.pickerOptions = [...state.validOptions]
      .sort(() => Math.random() - 0.5)
      .map((option) => ({
        ...option,
        color: ''
      }))

    for (const option of this.pickerOptions) {
      option.color = getRandomColor()
    }
  }

  private startPicking(): void {
    this.pickerState = PickerState.Picking

    this.disableControls()

    const startTime = performance.now()
    const durationMs = this.duration * 1000
    const fullTurns = 5
    const totalRotation = fullTurns * Math.PI * 2 + Math.random() * Math.PI * 2

    const animate = (now: number): void => {
      const elapsed = now - startTime

      if (elapsed < durationMs) {
        const t = elapsed / durationMs
        const easedT = easeInOutQuad(t)

        this.rotationAngle = easedT * totalRotation

        this.drawWheel(this.rotationAngle)
        this.updatePickedOption()

        this.animationRequestId = requestAnimationFrame(animate)
      } else {
        this.rotationAngle = totalRotation

        this.drawWheel(this.rotationAngle)
        this.finishPicking()
      }
    }

    this.animationRequestId = requestAnimationFrame(animate)
  }

  private getCurrentOption(rotation: number): (typeof this.pickerOptions)[0] | undefined {
    const pointerOffset = Math.PI / 2
    const normalizedAngle = (((rotation - pointerOffset) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
    const totalWeight = this.pickerOptions.reduce((sum, option) => sum + option.weight, 0)

    let startAngle = 0

    for (const option of this.pickerOptions) {
      const angle = (option.weight / totalWeight) * Math.PI * 2

      if (normalizedAngle >= startAngle && normalizedAngle < startAngle + angle) {
        return option
      }

      startAngle += angle
    }

    return undefined
  }

  private updatePickedOption(): void {
    const currentOption = this.getCurrentOption(this.rotationAngle)

    if (currentOption !== undefined) {
      this.pickedOption.setTextContent(`Picking: ${currentOption.title}`)
    }
  }

  private finishPicking(): void {
    if (this.animationRequestId !== undefined) {
      cancelAnimationFrame(this.animationRequestId)
      this.animationRequestId = undefined
    }

    this.pickerState = PickerState.Picked

    const pickedOption = this.getCurrentOption(this.rotationAngle)

    if (pickedOption !== undefined) {
      this.pickedOption.setTextContent(`Picked: ${pickedOption.title}`)
      this.pickedOption.getNode().classList.add('font-bold', 'text-green-600')

      if (!this.mute) {
        // playSound('finish')
      }
    }

    this.enableControls()
  }

  private disableControls(): void {
    this.backButton.getNode().setAttribute('disabled', 'true')
    this.soundButton.getNode().setAttribute('disabled', 'true')
    this.pickButton.getNode().setAttribute('disabled', 'true')
    this.durationInput.getNode().disabled = true
  }

  private enableControls(): void {
    this.backButton.getNode().removeAttribute('disabled')
    this.soundButton.getNode().removeAttribute('disabled')
    this.pickButton.getNode().removeAttribute('disabled')
    this.durationInput.getNode().disabled = false
  }
}
