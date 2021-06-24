import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from './BaseEntity'
import { Poll } from './Poll'

@Entity({ tableName: 'choices' })
export class Choice extends BaseEntity {

  @Property()
  text: string

  @Property()
  color: string

  @ManyToOne(() => Poll)
  poll!: Poll

  constructor(text: string, color: string, poll: Poll) {
    super()
    this.text = text
    this.color = color
    this.poll = poll
  }
}