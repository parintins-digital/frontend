import api from '../api'
import {User} from '../entities/User'
import {PathBuilder} from '../utils/PathBuilder'

const PATH = '/user'

export class UserService {
  getAuthenticatedUser(): User | undefined {
    const localData = localStorage.getItem('user')
    if (!localData) {
      console.error('[Autenticação] Usuário sem as credenciais necessárias.')
      return
    }
    const authenticatedUser = JSON.parse(localData) as User
    return authenticatedUser
  }

  logout(): void {
    localStorage.clear()
  }

  async create(user: User): Promise<User> {
    const {data: createdUser} = await api.post<User>(
      new PathBuilder(PATH).build(),
      user
    )
    return createdUser
  }

  async login(email: string, password: string): Promise<User> {
    const {data: user} = await api.post<User>(
      new PathBuilder(PATH).addPath('login').build(),
      {email, password}
    )
    return user
  }
}
