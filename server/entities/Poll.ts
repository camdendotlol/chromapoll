import { Collection, Entity, ManyToMany, OneToMany, Property } from '@mikro-orm/core'
import { Choice } from './Choice'
import { BaseEntity } from './BaseEntity'
import { IP } from './Ip'

@Entity({ tableName: 'polls' })
export class Poll extends BaseEntity {

  @Property()
  title: string

  @OneToMany(() => Choice, c => c.poll)
  choices = new Collection<Choice>(this)

  @ManyToMany(() => IP, 'votes', { owner: true, lazy: true })
  voters = new Collection<IP>(this)

  constructor(title: string) {
    super()
    this.title = title
  }
}