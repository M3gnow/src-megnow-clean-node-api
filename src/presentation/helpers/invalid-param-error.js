class InvalidParam extends Error {
  constructor (paramName) {
    super(`Invalid param : ${paramName}`)
    this.name = 'InvalidParam'
  }
}

module.exports = InvalidParam
