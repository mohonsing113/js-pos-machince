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
  

  /*Given 1 item in receipt
    When print receipt
    Then I get receipt with one item 
  */
  it ('should print only 1 item receipt', () => {
    const input = [
        'ITEM000001'
      ]
    expect(printReceipt(input, loadAllItems(), loadPromotions())).toBe(
        "***<store earning no money>Receipt***\n"+
        "Name：Sprite, Quantity：1bottle, Unit price：3.00(yuan), Subtotal：3.00(yuan)\n"+
        "----------------------\n"+
        "Total：3.00(yuan)\n"+
        "Saving：0.00(yuan)\n"+
        "**********************"
    );
  });

  /*Given 1 item with 3 count in receipt and can trigger buy 2 get 1 free promotion
    When print receipt
    Then I get receipt with one item with saving
  */
  it ('should print only 1 item receipt with saving', () => {
    const input = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001'
      ]
    expect(printReceipt(input, loadAllItems(), loadPromotions())).toBe(
        "***<store earning no money>Receipt***\n"+
         "Name：Sprite, Quantity：3bottle, Unit price：3.00(yuan), Subtotal：6.00(yuan)\n"+
         "----------------------\n"+
         "Total：6.00(yuan)\n"+
         "Saving：3.00(yuan)\n"+
         "**********************"
    );
  });

  /*Given 3 item with 3 count in receipt and can trigger buy 2 get 1 free promotion and weight checking
    When print receipt
    Then I get receipt with one item with saving
  */
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
         "Name：Sprite, Quantity：5bottle, Unit price：3.00(yuan), Subtotal：12.00(yuan)\n"+
         "Name：Litchi, Quantity：2kg, Unit price：15.00(yuan), Subtotal：30.00(yuan)\n"+
         "Name：Noodles, Quantity：3bag, Unit price：4.50(yuan), Subtotal：9.00(yuan)\n"+
         "----------------------\n"+
         "Total：51.00(yuan)\n"+
         "Saving：7.50(yuan)\n"+
         "**********************"

     );
 });