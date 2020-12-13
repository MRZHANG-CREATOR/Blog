const bcrypt = require('bcrypt') //哈希算法密码加密模块 依赖Python  node-gyp  windows-build-tools  注意安装
async function run() {
    const salt = await bcrypt.genSalt(10) //生成random string  数值越大复杂度越高  return promise object
    const result = await bcrypt.hash('password', salt) //哈希算法加密  明文加盐  return promise object  random string is added the clear text
    console.log(salt)
    console.log(result)
}
run()