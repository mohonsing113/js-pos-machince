function printReceipt (barcodes, database, promotions) {
    let itemList=[]
    barcodes.forEach(barcode => {
        let splitBarcode = barcode.split('-')
        let bar = splitBarcode[0]
        let weight = splitBarcode[1]
        if(!isNaN(weight)){
            weight = parseInt(weight)
        }else{
            weight = 1
        }
        addItemToReceipt(itemList, find(bar, database), weight)
    });

    let text = ""
    let total = 0;

    text+='***<store earning no money>Receipt***\n'
    itemList.forEach( item =>{
        text+="Name："+item.name+", "
        text+="Quantity："+item.count+item.unit+", "
        text+="Unit price："+item.price.toFixed(2)+"(yuan), "
        let smallTotal = item.price*item.count
        text+="Subtotal："+smallTotal.toFixed(2)+"(yuan)\n"
        total+=smallTotal
    })
    
    let saving =applyPromotion(itemList, promotions)
    total-=saving

    text+= '----------------------\n' +'Saving：'+saving.toFixed(2)+'(yuan)\n'
    text+= 'Total：'+total.toFixed(2)+'(yuan)\n' + '**********************'
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

function find(barcode, list){
    return list.find(a => a.barcode==barcode)
}

function applyPromotion(itemList, promotions){
    let saving = 0
    promotions.forEach(promo =>{
        if(promo.type == 'BUY_TWO_GET_ONE_FREE'){
            itemList
                .filter(item => typeof find(item.id, promo.barcodes) != undefined)
                .filter(item => item.count/3>=1)
                .map(item =>{
                    saving += item.price* parseInt(item.count/3)
                });

        }
        //space for future promos
    });
    return saving
}
module.exports = printReceipt;