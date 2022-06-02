import api from '../api'
import {User} from '../entities/User'
import {PathBuilder} from '../utils/PathBuilder'
import {
  clearCookies,
  clearSessionStorage,
  getSessionStorage,
  saveSessionStorage,
} from './StorageService'

const PATH = '/user'
const LOCAL_USER_SYSTEM = 'parintinsuser'

export class UserService {
  getAuthenticatedUser(): User | undefined {
    const user = getSessionStorage<User>(LOCAL_USER_SYSTEM)
    if (!user) {
      console.error('[Autenticação] Usuário sem as credenciais necessárias.')
      return
    }
    return user
  }

  async isAuthenticated(saveUser = false): Promise<boolean> {
    const user = await this.findCurrentUser()
    if (!user) return false
    if (!getSessionStorage<User>(LOCAL_USER_SYSTEM) && saveUser) {
      saveSessionStorage(LOCAL_USER_SYSTEM, user)
    }
    return true
  }

  async logout(): Promise<void> {
    await api.delete(new PathBuilder().addPath('logout').build()).then(() => {
      clearCookies()
      clearSessionStorage()
    })
  }

  async isAdmin(): Promise<boolean> {
    const {data: response} = await api.get<boolean>(
      new PathBuilder(PATH).addPath('admin').build()
    )
    return response
  }

  async create(user: User): Promise<User> {
    const {data: createdUser} = await api.post<User>(
      new PathBuilder(PATH).build(),
      user
    )
    return createdUser
  }

  async findCurrentUser(): Promise<User | undefined> {
    const {data: authenticatedUser} = await api.get<User | undefined>(
      new PathBuilder(PATH).build()
    )
    return authenticatedUser
  }

  async login(email: string, password: string): Promise<User | undefined> {
    await api.post(new PathBuilder().addPath('login').build(), {
      email,
      password,
    })
    const authenticatedUser = await this.findCurrentUser()
    if (!authenticatedUser) {
      console.error('Não foi possível autenticar realizar a autenticação.')
      return
    }
    saveSessionStorage(LOCAL_USER_SYSTEM, authenticatedUser)
    return authenticatedUser
  }

  async loginAsAdmin(
    email: string,
    password: string
  ): Promise<User | undefined> {
    await api.post(
      new PathBuilder().addPath('login').addPath('admin').build(),
      {
        email,
        password,
      }
    )
    const authenticatedUser = await this.findCurrentUser()
    if (!authenticatedUser) {
      console.error('Não foi possível autenticar realizar a autenticação.')
      return
    }
    return authenticatedUser
  }
}
