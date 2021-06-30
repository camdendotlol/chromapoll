import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from './BaseEntity'
import { Poll } from './Poll'

@Entity({ tableName: 'choices' })
export class Choice extends BaseEntity {

  @Property()
  label: string

  @Property()
  color: string

  @ManyToOne(() => Poll)
  poll!: Poll

  constructor(text: string, color: string, poll: Poll) {
    super()
    this.label = text
    this.color = color
    this.poll = poll
  }
}