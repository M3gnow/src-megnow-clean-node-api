const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
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
