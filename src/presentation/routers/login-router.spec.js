const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')

const makeSystemUnderTest = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }

  const authUseCaseSpy = new AuthUseCaseSpy()
  const systemUnderTest = new LoginRouter(authUseCaseSpy)

  return {
    systemUnderTest,
    authUseCaseSpy
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const { systemUnderTest } = makeSystemUnderTest()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = systemUnderTest.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const { systemUnderTest } = makeSystemUnderTest()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }

    const httpResponse = systemUnderTest.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const { systemUnderTest } = makeSystemUnderTest()
    const httpResponse = systemUnderTest.route()

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no httpRequest has no body', () => {
    const { systemUnderTest } = makeSystemUnderTest()
    const httpResponse = systemUnderTest.route({ })

    expect(httpResponse.statusCode).toBe(500)
  })
})

describe('Login Router Integration AuthCase', () => {
  test('Should call AuthUseCase with corret param', () => {
    const { systemUnderTest, authUseCaseSpy } = makeSystemUnderTest()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    systemUnderTest.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should return 401 when invalid credentials are provided', () => {
    const { systemUnderTest } = makeSystemUnderTest()
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = systemUnderTest.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
  })
})
