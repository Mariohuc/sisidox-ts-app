import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid';
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public email_verified?: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public role: string

  @column()
  public names?: string

  @column()
  public pat_last_name?: string

  @column()
  public mot_last_name?: string

  @column()
  public gender: string

  @column()
  public avatar?: string

  @column()
  public record_status: string

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv4()
  }

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
