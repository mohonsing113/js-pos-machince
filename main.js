function printReceipt (barcodes, database, promotions) {
    let itemList=[]
    barcodes.forEach(barcode => {
        let [bar, weight] = barcode.split('-')
        weight = isNaN(weight)? 1 : parseFloat(weight)
        addItemToReceipt(itemList, find(bar, database), weight)
    });

    itemList.forEach( item =>{
        item.subTotal = item.price*item.count
    })
    
    let saving = applyPromotion(itemList, promotions)
    let total = itemList.map(item => item.subTotal).reduce(sum, 0)
    
    return getOutput(itemList,total,saving)
}

function getOutput(itemList, total, saving){
    let text ='***<store earning no money>Receipt***\n'

    itemList.forEach( item =>{
        text+="Name："+item.name+", "
            +"Quantity："+item.count+item.unit+", "
            +"Unit price："+item.price.toFixed(2)+"(yuan), "
            +"Subtotal："+item.subTotal.toFixed(2)+"(yuan)\n"
    })

    text+='----------------------\n' 
        + 'Total：'+total.toFixed(2)+'(yuan)\n' 
        + 'Saving：'+saving.toFixed(2)+'(yuan)\n'
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
            subTotalSaving = itemList
                .filter(item => find(item.id, promo.barcodes) != undefined)
                .filter(item => item.count/3>=1)
                .map(item => {
                    let saving = item.price*parseInt(item.count/3)
                    item.subTotal-=saving;
                    return saving
                })
                .reduce(sum, 0);

            return subTotalSaving
        }
        //space for future promos
    }).reduce(sum, 0);
}
module.exports = printReceipt;