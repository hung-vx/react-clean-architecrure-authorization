import IAuthListener from './AuthListener'

export default class AuthHolder {
  private authListeners: IAuthListener[]
  private isAuthorized: boolean
  private authToken: string

  public constructor() {
    this.isAuthorized = false
    this.authListeners = []
    this.authToken = ''
  }

  public onSignedIn(authToken: string): void {
    this.isAuthorized = true
    this.authToken = authToken
    this.notifyListeners()
  }

  public onSignedOut(): void {
    this.isAuthorized = false
    this.authToken = ''
    this.notifyListeners()
  }

  public isUserAuthorized(): boolean {
    return this.isAuthorized
  }

  public getAuthToken(): string {
    if (!this.isAuthorized) {
      throw new Error('User is not authorized')
    }
    return this.authToken
  }

  public addAuthListener(authListeners: IAuthListener): void {
    this.authListeners.push(authListeners)
  }

  public removeAuthListener(authListeners: IAuthListener): void {
    this.authListeners.splice(this.authListeners.indexOf(authListeners), 1)
  }

  private notifyListeners(): void {
    this.authListeners.forEach(listener => listener.onAuthChanged())
  }
}
