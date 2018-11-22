function printReceipt (barcodes, database, promotions) {
    
    let itemList=[]
    barcodes.forEach(barcode => {
        let splitBarcode = barcode.split('-')
        let bar = splitBarcode[0]
        let weight = isNaN(splitBarcode[1])? 1 : parseInt(splitBarcode[1])
        addItemToReceipt(itemList, find(bar, database), weight)
    });

    let total = 0;
    let text ='***<store earning no money>Receipt***\n'
    itemList.forEach( item =>{
        text+="Name："+item.name+", "+"Quantity："+item.count+item.unit+", "+"Unit price："+item.price.toFixed(2)+"(yuan), "
        let smallTotal = item.price*item.count
        text+="Subtotal："+smallTotal.toFixed(2)+"(yuan)\n"
        total+=smallTotal
    })
    text+='----------------------\n' 
        + 'Total：'+total.toFixed(2)+'(yuan)\n' 
        + 'Saving：'+applyPromotion(itemList, promotions).toFixed(2)+'(yuan)\n'
        + '**********************'
    return text
}

function addItemToReceipt(itemList, item, weight){
    let itemInReceipt = find(item.barcode, itemList)
    if(typeof itemInReceipt != 'undefined'){
        itemInReceipt.count+=weight
    }else{
        itemList.push({barcode:item.barcode, name:item.name, count:weight, price:item.price, unit:item.unit})
    }
}

function find(barcode, list){return list.find(a => a.barcode==barcode)}

function sum(a, b) {return a + b}

function applyPromotion(itemList, promotions){
    return promotions.map(promo =>{
        if(promo.type == 'BUY_TWO_GET_ONE_FREE'){
            return itemList.filter(item => typeof find(item.id, promo.barcodes) != undefined)
                .filter(item => item.count/3>=1)
                .map(item => item.price*parseInt(item.count/3) )
                .reduce(sum, 0);
        }
        //space for future promos
    }).reduce(sum, 0);
}
module.exports = printReceipt;