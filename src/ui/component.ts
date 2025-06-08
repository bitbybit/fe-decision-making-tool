export class Component<T extends keyof HTMLElementTagNameMap> {
  public readonly eventTarget: EventTarget

  private readonly children: Component<keyof HTMLElementTagNameMap>[] = []
  private readonly node: HTMLElementTagNameMap[T]

  constructor(
    {
      tag,
      className = '',
      text = ''
    }: {
      tag: T
      className?: string
      text?: string
    },
    ...children: Component<keyof HTMLElementTagNameMap>[]
  ) {
    this.eventTarget = new EventTarget()

    const node = document.createElement(tag)

    node.className = className
    node.textContent = text

    this.node = node

    if (children) {
      this.appendChildren(children)
    }
  }

  public append(child: Component<keyof HTMLElementTagNameMap>): void {
    this.children.push(child)
    this.node.append(child.getNode())
  }

  public appendChildren(children: Component<keyof HTMLElementTagNameMap>[]): void {
    for (const element of children) {
      this.append(element)
    }
  }

  public getNode(): HTMLElementTagNameMap[T] {
    return this.node
  }

  public getChildren(): Component<keyof HTMLElementTagNameMap>[] {
    return this.children
  }

  public setTextContent(content: string): void {
    this.node.textContent = content
  }

  public setAttribute(attribute: string, value: string): void {
    this.node.setAttribute(attribute, value)
  }

  public removeAttribute(attribute: string): void {
    this.node.removeAttribute(attribute)
  }

  public toggleClass(className: string): void {
    this.node.classList.toggle(className)
  }

  public addListener(
    event: keyof HTMLElementEventMap,
    listener: (this: HTMLElementTagNameMap[T], event: Event) => unknown,
    options: boolean | undefined = false
  ): void {
    this.node.addEventListener(event, listener, options)
  }

  public removeListener(
    event: string,
    listener: (this: HTMLElementTagNameMap[T], event: Event) => unknown,
    options: boolean | undefined = false
  ): void {
    this.node.removeEventListener(event, listener, options)
  }

  public destroyChildren(): void {
    for (const child of this.children) {
      child.destroy()
    }

    this.children.length = 0
  }

  public destroy(): void {
    this.destroyChildren()
    this.node.remove()
  }
}
