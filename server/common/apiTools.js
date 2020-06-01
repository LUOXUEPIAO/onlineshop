let apiTools = {};
apiTools.getSucRtnData = function (data) {
    return {
        resultCode: 1,
        data: data
    }
};
apiTools.getFailRtnData = function (errorCode, msg) {
    return {
        resultCode: 0,
        errorCode: errorCode,
        msg: msg,
    }
}

module.exports = apiTools;