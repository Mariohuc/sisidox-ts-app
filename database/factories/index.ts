import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    let random_g = faker.name.gender();
    return {      
      email: faker.internet.email(),
      password: '1234',
      names: faker.name.firstName().toUpperCase(),
      pat_last_name: faker.name.lastName().toUpperCase(),
      mot_last_name: faker.name.lastName().toUpperCase(),
      gender: random_g === "Female" ? "F" : "M",
      role: faker.random.number({ min: -2, max: 2 }) < 0 ? "MÉDICO" : "PACIENTE",
      email_verified: true,
      record_status: "A",
    }
  })
  .build()
