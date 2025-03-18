import { OptionModel } from '@/model/option'
import { OptionListModel } from '@/model/option-list'
import { jsonToOptionList, optionListToJson } from '@/util/serializer'

export type AppState = {
  optionList: OptionListModel
  optionCounter: number
}

class State {
  public readonly minOptionAmountToStart = 2

  private readonly optionListStorageKey: string = 'optionList'
  private readonly optionCounterStorageKey: string = 'optionCounter'

  private readonly state: AppState = {
    optionList: new OptionListModel(),
    optionCounter: 0
  }

  constructor() {
    const { persistedOptionList, persistedOptionCounter } = this.retrieve()

    if (persistedOptionList === null || persistedOptionCounter === null) {
      this.initDefaultState()
      return
    }

    try {
      const optionList = jsonToOptionList(persistedOptionList)
      const optionCounter = Number(persistedOptionCounter)

      if (optionList.entries.length === 0 || optionCounter === 0) {
        this.initDefaultState()
        return
      }

      this.state.optionList = optionList
      this.state.optionCounter = optionCounter
    } catch (error) {
      console.error('Error parsing saved state, initializing default state', error)

      this.initDefaultState()
    }
  }

  public get optionList(): OptionListModel {
    return this.state.optionList
  }

  public get optionCounter(): number {
    return this.state.optionCounter
  }

  public get validOptions(): OptionListModel['entries'] {
    return this.optionList.entries.filter(({ title, weight }) => title !== '' && weight > 0)
  }

  public get canStart(): boolean {
    return this.validOptions.length >= this.minOptionAmountToStart
  }

  public incrementOptionCounter(): number {
    this.state.optionCounter += 1
    this.persist()

    return this.state.optionCounter
  }

  public decrementOptionCounter(): number {
    if (this.state.optionCounter > 0) {
      this.state.optionCounter = Number(this.optionList.entries.at(-1)?.id ?? this.state.optionCounter - 1)
      this.persist()
    }

    return this.state.optionCounter
  }

  public clear(): void {
    this.state.optionList.entries.length = 0
    this.state.optionCounter = 0

    this.persist()
  }

  public load(optionList: OptionListModel, optionCounter: number): void {
    this.state.optionList = optionList
    this.state.optionCounter = optionCounter

    this.persist()
  }

  public persist(): void {
    localStorage.setItem(this.optionListStorageKey, optionListToJson(this.state.optionList))
    localStorage.setItem(this.optionCounterStorageKey, String(this.state.optionCounter))
  }

  private retrieve(): {
    persistedOptionList: string | null
    persistedOptionCounter: string | null
  } {
    const persistedOptionList = localStorage.getItem(this.optionListStorageKey)
    const persistedOptionCounter = localStorage.getItem(this.optionCounterStorageKey)

    return {
      persistedOptionList,
      persistedOptionCounter
    }
  }

  private initDefaultState(): void {
    const optionList = new OptionListModel()

    optionList.addOption(new OptionModel('1', '', 0))

    this.state.optionList = optionList
    this.state.optionCounter = 1

    this.persist()
  }
}

export const state = new State()
