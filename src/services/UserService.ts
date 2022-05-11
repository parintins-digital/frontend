import api from '../api'
import {User} from '../entities/User'

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

  async login(token: string): Promise<User> {
    const {data: user} = await api.post<User>(PATH, {token})
    return user
  }
}
