import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { Choice } from './Choice'
import { BaseEntity } from './BaseEntity'

@Entity({ tableName: 'ips' })
export class IP extends BaseEntity {

  @Property()
  address: string

  @OneToMany(() => Choice, c => c.voters)
  votes = new Collection<Choice>(this)

  constructor(address: string) {
    super()
    this.address = address
  }
}