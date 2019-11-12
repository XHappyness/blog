function loginCheck(name, psd) {
    if (name === "xuehaishuang" && psd === "123456") {
        return true
    }
    return false
}

module.exports = {
    loginCheck
}