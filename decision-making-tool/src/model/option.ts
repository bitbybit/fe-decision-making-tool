export class Option {
  public id: string
  public title: string
  public weight: number

  constructor(id: string, title: string, weight: number) {
    this.id = id
    this.title = title
    this.weight = weight
  }
}
