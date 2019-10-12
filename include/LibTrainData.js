// LibTrainData

/**
 * constructor
 */
var LibTrainData = function()
{
//    this.aa = aa;
}
/******************************** 
*
*********************************/
LibTrainData.prototype.convert_chart_arr = function(items){
	var hnum = []
	var lbl = []
	items.forEach( function (item) {
//console.log( item );    
		lbl.push( item.no )                
		hnum.push( item.hnum )                
	});
	var ret= {
		"lbl" : lbl,
		"hnum" : hnum,
	}
	return ret;
}
/******************************** 
*
*********************************/
LibTrainData.prototype.convert_train_arr = function(items)
{
    var hnum = []
	var lnum = []
	var xnum = []
	items.forEach( function (item) {
//console.log( item[0] );    
        xnum.push( parseFloat(item[0]) )                
		hnum.push( parseFloat(item[1]) )                
		lnum.push( parseFloat(item[2]) )                
	});
	var ret= {
		"xnum" : xnum,
		"hnum" : hnum,
		"lnum" : lnum,
	}
	return ret;
}

module.exports = LibTrainData
