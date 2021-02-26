import AuthHolder from '../../../domain/entities/auth/models/AuthHolder';
import LoginUseCase from '../../../domain/interactors/auth/LoginUseCase';
import FormValidator from '../../util/FormValidator';
import { IBaseView } from './../../views/BaseView';
import { IAuthDataStateViewModel, IAuthViewModel } from "./AuthViewModel"


export class AuthDataSetViewModelIml implements IAuthDataStateViewModel{
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

export class AuthViewModelImpl implements IAuthViewModel {
  public authState: IAuthDataStateViewModel

  private baseView?: IBaseView
  private loginUseCase: LoginUseCase
  private authHolder: AuthHolder

  public constructor(loginUseCase: LoginUseCase, authHolder: AuthHolder) {
    this.authState = new AuthDataSetViewModelIml()

    this.loginUseCase = loginUseCase
    this.authHolder = authHolder

    this.authHolder.addAuthListener(this)
  }

  public attachView = (baseView: IBaseView): void => {
    this.baseView = baseView
  }

  public detachView = (): void => {
    this.baseView = undefined
  }

  public onAuthChanged(): void {
    if (this.authHolder.isUserAuthorized()) {
      this.authState.isSignInButtonVisible = false
      this.authState.isSignOutButtonVisible = true
      this.authState.authStatus = 'authorized'
      this.authState.isAuthStatusPositive = true
    } else {
      this.authState.isSignInButtonVisible = true
      this.authState.isSignOutButtonVisible = false
      this.authState.authStatus = 'is not authorized'
      this.authState.isAuthStatusPositive = false
    }

    this.notifyViewAboutChanges()
  }

  public onEmailQueryChanged = (loginQuery: string): void => {
    this.authState.emailQuery = loginQuery
    this.notifyViewAboutChanges()
  }

  public onPasswordQueryChanged = (passwordQuery: string): void => {
    this.authState.passwordQuery = passwordQuery
    this.notifyViewAboutChanges()
  }


  public onClickSignIn = async (): Promise<void> => {
    if (!this.validateLoginForm()) {
      this.notifyViewAboutChanges()
      return
    }

    try {
      await this.loginUseCase.loginUser(this.authState.emailQuery, this.authState.passwordQuery);
      this.authState.isShowError = false
      this.authState.errorMessage = ''
    } catch (e) {
      this.authState.errorMessage = e.message
      this.authState.isShowError = true
    }

    this.notifyViewAboutChanges()
  }

  public onClickSignOut = async (): Promise<void> => {
    await this.loginUseCase.loginOut()
  }

  private validateLoginForm = (): boolean => {
    if (!this.authState.emailQuery) {
      this.authState.isShowError = true
      this.authState.errorMessage = 'Email cannot be empty'
      return false
    }

    if (this.authState.errorMessage === 'Email cannot be empty') {
      this.authState.isShowError = false
      this.authState.errorMessage = ''
    }

    if (!FormValidator.isValidEmail(this.authState.emailQuery)) {
      this.authState.isShowError = true
      this.authState.errorMessage = 'Email format is not valid'
      return false
    }
    if (this.authState.errorMessage === 'Email format is not valid') {
      this.authState.isShowError = false
      this.authState.errorMessage = ''
    }

    if (!this.authState.passwordQuery) {
      this.authState.isShowError = true
      this.authState.errorMessage = 'Password cannot be empty'
      return false
    }

    if (this.authState.errorMessage === 'Password cannot be empty') {
      this.authState.isShowError = false
      this.authState.errorMessage = ''
    }

    return true
  }

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged()
    }
  }
}