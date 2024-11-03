class FieldValidator {
  /**
   * 
   * @param {String} eleId 文本框id
   * @param {Function} validatorFunc 处理函数
   */
  constructor(eleId, validatorFunc) {
    this.input = $('#' + eleId)
    this.p = this.input.nextElementSibling
    this.validatorFunc = validatorFunc
    this.input.onblur = () => {
      this.validate()
    }
  }
  // 验证有没有问题
  async validate() {
    const err = await this.validatorFunc(this.input.value)

    if (err) {
      this.p.innerText = err
      return false
    } else {
      this.p.innerText = ''
      return true
    }

  }
  /**
   * 
   * @param  {FieldValidator[]} validators 
   * @returns 
   */
  static async validate(...validators) {
    const proms = validators.map(item => item.validate())
    const results = await Promise.all(proms)
    return results.every(r => r)
  }
}
