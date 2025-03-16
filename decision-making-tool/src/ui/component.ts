export class Component {
  private readonly children: Component[] = []
  private readonly node: HTMLElement

  constructor(
    {
      tag = 'div',
      className = '',
      text = ''
    }: {
      tag?: keyof HTMLElementTagNameMap
      className?: string
      text?: string
    },
    ...children: Component[]
  ) {
    const node = document.createElement(tag)

    node.className = className
    node.textContent = text

    this.node = node

    if (children) {
      this.appendChildren(children)
    }
  }

  public append(child: Component): void {
    this.children.push(child)
    this.node.append(child.getNode())
  }

  public appendChildren(children: Component[]): void {
    for (const element of children) {
      this.append(element)
    }
  }

  public getNode(): HTMLElement {
    return this.node
  }

  public getChildren(): Component[] {
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
    event: string,
    listener: (this: HTMLElement, event: unknown) => void,
    options: boolean | undefined = false
  ): void {
    this.node.addEventListener(event, listener, options)
  }

  public removeListener(
    event: string,
    listener: (this: HTMLElement, event: unknown) => void,
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
