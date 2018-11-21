const printReceipt = require('../main');

function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: 'Coca-Cola',
      unit: 'bottle',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: 'Sprite',
      unit: 'bottle',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: 'Apple',
      unit: 'kg',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: 'Litchi',
      unit: 'kg',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: 'Battery',
      unit: 'box',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: 'Noodles',
      unit: 'bag',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}
  

  
  it ('should print only 1 item receipt', () => {
    const input = [
        'ITEM000001'
      ]
    expect(printReceipt(input, loadAllItems(), loadPromotions())).toBe(
        "***<store earning no money>Receipt***\n"+
        "Name：Sprite, Quantity：1bottle, Unit price：3.00(yuan), Subtotal：3.00(yuan)\n"+
        "----------------------\n"+
        "Saving：0.00(yuan)\n"+
        "Total：3.00(yuan)\n"+
        "**********************"
    );
  });

  it ('should print only 1 item receipt with saving', () => {
    const input = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001'
      ]
    expect(printReceipt(input, loadAllItems(), loadPromotions())).toBe(
        "***<store earning no money>Receipt***\n"+
         "Name：Sprite, Quantity：3bottle, Unit price：3.00(yuan), Subtotal：9.00(yuan)\n"+
         "----------------------\n"+
         "Saving：3.00(yuan)\n"+
         "Total：6.00(yuan)\n"+
         "**********************"
    );
  });


 it ('should print receipt with weight checking and saving', () => {
     const input = [
         'ITEM000001',
         'ITEM000001',
         'ITEM000001',
         'ITEM000001',
         'ITEM000001',
         'ITEM000003-2',
         'ITEM000005',
         'ITEM000005',
         'ITEM000005'
       ]
     expect(printReceipt(input, loadAllItems(), loadPromotions())).toBe(
        "***<store earning no money>Receipt***\n"+
         "Name：Sprite, Quantity：5bottle, Unit price：3.00(yuan), Subtotal：15.00(yuan)\n"+
         "Name：Litchi, Quantity：2kg, Unit price：15.00(yuan), Subtotal：30.00(yuan)\n"+
         "Name：Noodles, Quantity：3bag, Unit price：4.50(yuan), Subtotal：13.50(yuan)\n"+
         "----------------------\n"+
         "Saving：7.50(yuan)\n"+
         "Total：51.00(yuan)\n"+
         "**********************"

     );
 });