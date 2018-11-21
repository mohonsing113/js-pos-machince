const printReceipt = require('../main');

function loadAllItems() {
    return [
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000002',
        name: '苹果',
        unit: '斤',
        price: 5.50
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
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
  

  
  it ('should print only 1 item recepit', () => {
    const input = [
        'ITEM000001'
      ]
    expect(printReceipt(input, loadAllItems(), loadPromotions())).toBe(
        "***<没钱赚商店>购物清单***\n"+
        "名称：雪碧, 数量：1瓶, 单价：3.00(元), 小计：3.00(元)\n"+
        "----------------------\n"+
        "总计：3.00(元)\n"+
        "**********************"
    );
  });
// });
// it ('should print receipt', () => {
//     const input = [
//         'ITEM000001',
//         'ITEM000001',
//         'ITEM000001',
//         'ITEM000001',
//         'ITEM000001',
//         //'ITEM000003-2',
//         'ITEM000005',
//         'ITEM000005',
//         'ITEM000005'
//       ]
//     expect(printReceipt(input, loadAllItems(), loadPromotions())).toBe(null

//     );
// });


