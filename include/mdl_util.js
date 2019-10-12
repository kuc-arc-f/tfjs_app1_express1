// mdl_util

/**
 * constructor
 */
var mdl_util = function()
{
//    this.aa = aa;
}
/******************************** 
*
*********************************/
mdl_util.prototype.convert_str2date = function(item)
{
    var ret = ""
    col = item.split(" ")
    var dt = col[0]
    row = dt.split("/")
    var month = row[1]
    ret =new Date(row[0], month -1 , row[2], 0 ,0 , 0)
//console.log( ret );
    return ret
}
/******************************** 
*
*********************************/
mdl_util.prototype.convert_date2str = function(date){
    var ret = ""
    var yyyy = date.getFullYear()
    var mm = date.getMonth() + 1
    var dd  = date.getDate();
    var s = yyyy + "/" + mm + "/"+ dd
//console.log( s );
    return s
}
/******************************** 
*
*********************************/
mdl_util.prototype.test = function(param)
{
    return "Test:" + param
}

module.exports = mdl_util
