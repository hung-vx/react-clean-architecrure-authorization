import { IBaseViewModel } from '../BaseViewModel'

export interface IAuthDataStateViewModel {
  emailQuery: string
  passwordQuery: string
  isSignInButtonVisible: boolean
  isSignOutButtonVisible: boolean

  isShowError: boolean
  errorMessage: string

  authStatus: string
  isAuthStatusPositive: boolean
}

export interface IAuthViewModel extends IBaseViewModel {
  authState: IAuthDataStateViewModel

  onEmailQueryChanged(loginQuery: string): void
  onPasswordQueryChanged(passwordQuery: string): void
  onClickSignIn(): void
  onClickSignOut(): void
}

export class AuthDataSetViewModelIml implements IAuthDataStateViewModel {
  emailQuery: string
  passwordQuery: string
  isSignInButtonVisible: boolean
  isSignOutButtonVisible: boolean

  isShowError: boolean
  errorMessage: string

  authStatus: string
  isAuthStatusPositive: boolean

  public constructor() {
    this.emailQuery = ''
    this.passwordQuery = ''
    this.isSignInButtonVisible = true
    this.isSignOutButtonVisible = false

    this.isShowError = false
    this.errorMessage = ''

    this.authStatus = 'is not authorized'
    this.isAuthStatusPositive = false
  }
}
