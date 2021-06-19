import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { Choice } from './Choice'
import { BaseEntity } from './BaseEntity'

@Entity({ tableName: 'polls' })
export class Poll extends BaseEntity {

  @Property()
  title: string

  @OneToMany(() => Choice, c => c.poll)
  choices = new Collection<Choice>(this)

  constructor(title: string) {
    super()
    this.title = title
  }
}