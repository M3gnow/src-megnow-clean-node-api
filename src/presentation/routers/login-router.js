const HttpResponse = require('../helpers/http-response')
const InvalidParam = require('../helpers/invalid-param-error')
const MissingParamError = require('../helpers/missing-param-error')

class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }

      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParam('email'))
      }

      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }

      const acessToken = await this.authUseCase.auth(email, password)

      if (!acessToken) {
        return HttpResponse.unauthorizedError()
      }

      return HttpResponse.successRequest({ acessToken })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}

module.exports = LoginRouter
