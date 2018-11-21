function printReceipt (barcodes, database, promotions) {
    let itemList=[]
    barcodes.forEach(barcode => {
        addItemToReceipt(itemList, find(barcode, database))
    });

    var text=""
    var total =0;

    text+='***<没钱赚商店>购物清单***\n'
    itemList.forEach( item =>{
        text+="名称："+item.name+", "
        text+="数量："+item.count+item.unit+", "
        text+="单价："+item.price.toFixed(2)+"(元), "
        var smallTotal = item.price*item.count
        text+="小计："+smallTotal.toFixed(2)+"(元)\n"
        total+=smallTotal
    })
    text+= '----------------------\n' +'总计：'+total.toFixed(2)+'(元)\n' + '**********************'
    return text
}

function addItemToReceipt(itemList, item){
    var itemInReceipt = find(item.barcode, itemList)
    if(typeof itemInReceipt != 'undefined'){
        itemInReceipt.count++
    }else{
        itemList.push({barcode:item.barcode, name:item.name, count:1, price:item.price, unit:item.unit})
    }
}

function find(barcode, database){
    return database.find(a => a.barcode==barcode)
}
  

module.exports = printReceipt;