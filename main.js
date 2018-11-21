function printReceipt (barcodes, database, promotions) {
    let itemList=[]
    barcodes.forEach(barcode => {
        addItemToReceipt(itemList, find(barcode, database))
    });

    let text = ""
    let total =0;

    text+='***<没钱赚商店>购物清单***\n'
    itemList.forEach( item =>{
        text+="名称："+item.name+", "
        text+="数量："+item.count+item.unit+", "
        text+="单价："+item.price.toFixed(2)+"(元), "
        let smallTotal = item.price*item.count
        text+="小计："+smallTotal.toFixed(2)+"(元)\n"
        total+=smallTotal
    })
    
    let saving =applyPromotion(itemList, promotions)
    total-=saving

    text+= '----------------------\n' +'Saving：'+saving.toFixed(2)+'(元)\n'
    text+= '总计：'+total.toFixed(2)+'(元)\n' + '**********************'
    return text
}

function addItemToReceipt(itemList, item){
    let itemInReceipt = find(item.barcode, itemList)
    if(typeof itemInReceipt != 'undefined'){
        itemInReceipt.count++
    }else{
        itemList.push({barcode:item.barcode, name:item.name, count:1, price:item.price, unit:item.unit})
    }
}

function find(barcode, list){
    return list.find(a => a.barcode==barcode)
}

function applyPromotion(itemList, promotions){
    let saving = 0
    promotions.forEach(promo =>{
        if(promo.type == 'BUY_TWO_GET_ONE_FREE'){

            itemList
                .filter(item => typeof find(item.id, promo.barcodes) != undefined)
                .filter(item => item.count%3==0)
                .map(item =>{
                    saving += item.price* parseInt(item.count/3)
                });
                
        }
    });
    return saving
}
module.exports = printReceipt;