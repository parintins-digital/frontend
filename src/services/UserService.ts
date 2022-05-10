export class UserService {
  logout() {
    console.log('Deslogando')
  }

  login(token: string) {
    console.log(token, 'Autenticando')
  }
}
