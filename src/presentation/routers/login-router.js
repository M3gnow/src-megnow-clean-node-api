const HttpResponse = require('../helpers/http-response')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!this.authUseCase || !this.authUseCase.auth) {
      return HttpResponse.serverError()
    }

    if (!httpRequest || !httpRequest.body || !this.authUseCase) {
      return HttpResponse.serverError()
    }

    const { email, password } = httpRequest.body

    if (!email) {
      return HttpResponse.badRequest('email')
    }

    if (!password) {
      return HttpResponse.badRequest('password')
    }

    const acessToken = this.authUseCase.auth(email, password)

    if (!acessToken) {
      return HttpResponse.unauthorizedError()
    }

    return HttpResponse.successRequest()
  }
}

module.exports = LoginRouter
