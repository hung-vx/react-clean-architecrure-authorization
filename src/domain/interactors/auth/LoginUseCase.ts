import AuthHolder from "../../entities/auth/models/AuthHolder";
import IAuthRepository from "../../repositories/auth/AuthRepository";

export default class LoginUseCase {
  private authRepository: IAuthRepository
  private authHolder: AuthHolder

  public constructor(authRepository: IAuthRepository, authHolder: AuthHolder) {
    this.authRepository = authRepository
    this.authHolder = authHolder
  }

  /**
   * @throws {Error} if credentials are not valie or lave not passed
   */
  public async loginUser(email: string, password: string): Promise<void> {
    const validationResult = await this.authRepository.validateCredentials(email, password)
    const authResult = await this.authRepository.login(email, password, validationResult.validationKey)

    this.authHolder.onSignedIn(authResult.authorizationToken)
  }

  public async loginOut(): Promise<void> {
    this.authHolder.onSignedOut()
  }
}