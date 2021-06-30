import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core'
import { BaseEntity } from './BaseEntity'
import { Poll } from './Poll'

@Entity({ tableName: 'ips' })
export class IP extends BaseEntity {

  @Property()
  address: string

  @ManyToMany(() => Poll, poll => poll.voters)
  votes = new Collection<Poll>(this)

  constructor(address: string) {
    super()
    this.address = address
  }
}