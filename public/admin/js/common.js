//将表单提交数组整理成需要的name键值数组，依赖jq
function serializeToJson(form) {
    var result = {}
    var f = form.serializeArray() //获取表单提交的所有内容
    f.forEach(function (item) {
        result[item.name] = item.value;
    })
    return result
}