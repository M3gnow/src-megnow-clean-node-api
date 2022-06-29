const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')

const makeSystemUnderTest = () => {
  return new LoginRouter()
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const systemUnderTest = makeSystemUnderTest()
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
    const systemUnderTest = makeSystemUnderTest()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }

    const httpResponse = systemUnderTest.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const systemUnderTest = makeSystemUnderTest()
    const httpResponse = systemUnderTest.route()

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no httpRequest has no body', () => {
    const systemUnderTest = makeSystemUnderTest()
    const httpResponse = systemUnderTest.route({ })

    expect(httpResponse.statusCode).toBe(500)
  })
})
