import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from './BaseEntity'
import { Poll } from './Poll'

@Entity({ tableName: 'choices' })
export class Choice extends BaseEntity {

  @Property()
  text: string

  @ManyToOne(() => Poll)
  poll!: Poll

  constructor(text: string, poll: Poll) {
    super()
    this.text = text
    this.poll = poll
  }
}