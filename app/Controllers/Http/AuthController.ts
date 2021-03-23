import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async getUser ({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate();
    response.status(200).send(user);
  }

  public async login ({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.post();
    await auth.attempt(email, password)

    response.send({ message: 'Succesfull Login' });
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout();
    response.send({ message: 'Succesfull Logout' });
  }
}
