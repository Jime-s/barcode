export const barcodeTypes = [
  {
    name: 'Code 128',
    types: [
      { name: 'Code 128', value: 'Code128', initData: 'ABC-abc-1234' },
      { name: 'Code 128A', value: 'Code128A', initData: 'ABC123' },
      { name: 'Code 128B', value: 'Code128B', initData: 'Hello World!' },
      { name: 'Code 128C', value: 'Code128C', initData: '123456' },
      {
        name: 'GS1-128',
        value: 'gs1-128',
        initData: '(01)09521234543213(3103)000123',
      },
      /* Future support:
            { name: 'HIBC Code 128', value: 'Hibccode128', initData: 'A999BJC5D6E71' },
            { name: 'GS1-128 Composite', value: 'Gs1128composite', initData: '(00)095287654321012346|(02)09521234543213(37)24(10)1234567ABCDEFG' },
            */
    ],
  },
  {
    name: 'EAN / UPC',
    types: [
      { name: 'EAN-13', value: 'Ean13', initData: '5901234123457' },
      { name: 'EAN-8', value: 'Ean8', initData: '96385074' },
      { name: 'EAN-5', value: 'Ean5', initData: '54495' },
      { name: 'EAN-2', value: 'Ean2', initData: '53' },
      { name: 'UPC-A', value: 'Upc', initData: '123456789012' },
      { name: 'UPC-E', value: 'UpcE', initData: '01234565' },
      /* Future support:
            { name: 'GS1-14', value: 'Ean14', initData: '(01) 0 952 8765 43210 8' },
            { name: 'EAN-13 Composite', value: 'Ean13composite', initData: '9520123456788|(99)1234-abcd' },
            { name: 'EAN-8 Composite', value: 'Ean8composite', initData: '95200002|(21)A12345678' },
            { name: 'UPC-A Composite', value: 'Upcacomposite', initData: '012345000058|(99)1234-abcd' },
            { name: 'UPC-E Composite', value: 'Upcecomposite', initData: '01234558|(15)021231' },
            */
    ],
  },
  {
    name: '2D Barcodes',
    types: [
      {
        name: 'QR Code',
        value: 'Qrcode',
        initData: 'https://barcodediy.com',
      },
      {
        name: 'Data Matrix',
        value: 'Datamatrix',
        initData: 'This is Data Matrix!',
      },
      { name: 'PDF417', value: 'Pdf417', initData: 'This is PDF417' },
      {
        name: 'Aztec Code',
        value: 'Azteccode',
        initData: 'This is Aztec Code',
      },
      // { name: 'MaxiCode', value: 'Maxicode', initData: '[)>^03001^02996152382802^029840^029001^0291Z00004951^029UPSN^02906X610^029159^0291234567^0291/1^029^029Y^029634 ALPHA DR^029PITTSBURGH^029PA^029^004' },
    ],
  },
  {
    name: 'Code 39',
    types: [
      { name: 'Code 39', value: 'Code39', initData: 'CODE 39' },
      { name: 'Code 39 Extended', value: 'Code39ext', initData: 'Code39 Ext!' },

      /* Future support:
            { name: 'HIBC Code 39', value: 'Hibccode39', initData: 'A999BJC5D6E71' },
            { name: 'Code 32 (Italian Pharmacode)', value: 'Code32', initData: '1234567' },
            */
    ],
  },
  {
    name: 'ITF',
    types: [
      { name: 'ITF', value: 'Itf', initData: '1234567890' },
      { name: 'ITF-14', value: 'Itf14', initData: '15400141288763' },
      /* Future support:
            { name: 'Deutsche Post Identcode', value: 'Identcode', initData: '563102111111' },
            { name: 'Deutsche Post Leitcode', value: 'Leitcode', initData: '21348075016401' },
            */
    ],
  },
  {
    name: 'MSI Plessey',
    types: [
      { name: 'MSI Plessey (Mod 10)', value: 'Msi10', initData: '1234567' },
      { name: 'MSI Plessey (Mod 11)', value: 'Msi11', initData: '1234567' },
      { name: 'MSI Plessey (Mod 1010)', value: 'Msi1010', initData: '1234567' },
      { name: 'MSI Plessey (Mod 1110)', value: 'Msi1110', initData: '1234567' },
      /* Future support:
            { name: 'MSI Modified Plessey', value: 'Msi', initData: '123456789' },
            { name: 'Plessey UK', value: 'Plessey', initData: '01234ABCD' },
            */
    ],
  },
  {
    name: 'Pharmacode',
    types: [
      { name: 'Pharmacode', value: 'Pharmacode', initData: '1234' },
      /* Future support:
            { name: 'Two-track Pharmacode', value: 'Pharmacode2', initData: '117480' },
            { name: 'Pharmazentralnummer (PZN)', value: 'Pzn', initData: '123456' },
            */
    ],
  },
  {
    name: 'Codabar',
    types: [
      { name: 'Codabar', value: 'Codabar', initData: 'A1234B' },
      /* Future support:
            { name: 'Rationalized Codabar', value: 'RationalizedCodabar', initData: 'A0123456789B' },
            */
    ],
  },
  /* Future categories:
    {
        name: 'Postal and Logistics',
        types: [
            { name: 'USPS Intelligent Mail', value: 'Onecode', initData: '12345678901234567890123456789' },
            { name: 'USPS PLANET', value: 'Planet', initData: '1234567890' },
            { name: 'USPS POSTNET', value: 'Postnet', initData: '1234' },
            { name: 'Royal Mail 4 State Customer Code', value: 'Royalmail', initData: 'LE28HS9Z' },
            { name: 'Deutsche Post Identcode', value: 'Identcode', initData: '563102111111' },
            { name: 'Deutsche Post Leitcode', value: 'Leitcode', initData: '21348075016401' },
            { name: 'Japan Post 4 State Customer Code', value: 'Japanpost', initData: '6540123789-A-K-Z' },
            { name: 'AusPost 4 State Customer Code', value: 'Auspost', initData: '5956439111ABA 9' },
            { name: 'Royal Dutch TPG Post KIX', value: 'Kix', initData: '1231FZ13XHS' },
        ]
    },
    */

  {
    name: 'GS1 DataBar',
    types: [
      {
        name: 'GS1 DataBar Omnidirectional',
        value: 'Databaromni',
        initData: '(01)09521234543213',
      },
      {
        name: 'GS1 DataBar Limited',
        value: 'Databarlimited',
        initData: '(01)09521234543213',
      },
      {
        name: 'GS1 DataBar Expanded',
        value: 'Databarexpanded',
        initData: '(01)09521234543213(3103)000123',
      },
      {
        name: 'GS1 DataBar Stacked',
        value: 'Databarstacked',
        initData: '(01)09521234543213',
      },
    ],
  },

  {
    name: 'Publishing',
    types: [
      { name: 'ISBN', value: 'Isbn', initData: '978-1-56581-231-4 90000' },
      { name: 'ISMN', value: 'Ismn', initData: '979-0-2605-3211-3' },
      { name: 'ISSN', value: 'Issn', initData: '0311-175X 00 17' },
    ],
  },
  /* Future categories:
    {
        name: 'Industrial',
        types: [
            { name: 'Code 93', value: 'Code93', initData: 'THIS IS CODE 93' },
            { name: 'Code 93 Extended', value: 'Code93ext', initData: 'Code93 Ext!' },
            { name: 'Code 11', value: 'Code11', initData: '123456789' },
            { name: 'Matrix 2 of 5', value: 'Matrix2of5', initData: '1234567' },
            { name: 'Industrial 2 of 5', value: 'Industrial2of5', initData: '1234567' },
            { name: 'IATA 2 of 5', value: 'Iata2of5', initData: '1234567' },
        ]
    }
    */
]

// 检查是否是二维码类型
export const checkQRCode = (codeFormat: string) => {
  return [
    'qrcode',
    'datamatrix',
    'azteccode',
    'pdf417',
    'Databarstacked',
  ].includes(codeFormat.toLowerCase())
}

// 检查是否是二维码类型
export const lockHeight = (codeFormat: string) => {
  return ['qrcode', 'datamatrix', 'azteccode'].includes(
    codeFormat.toLowerCase(),
  )
}

export function findBarcodeCategory(value: string): string | undefined {
  for (const category of barcodeTypes) {
    const matchingType = category.types.find(
      (type) => type.value.toUpperCase() === value.toUpperCase(),
    )
    if (matchingType) {
      return category.name
    }
  }
  return undefined
}

// List of formats supported by JsBarcode
export const jsBarcodeSupportedFormats = [
  'CODE128',
  'CODE128A',
  'CODE128B',
  'CODE128C',
  'EAN',
  'EAN13',
  'EAN8',
  'EAN5',
  'EAN2',
  'UPC',
  'UPCE',
  'CODE39',
  'ITF',
  'ITF',
  'ITF14',
  'MSI',
  'MSI10',
  'MSI11',
  'MSI1010',
  'MSI1110',
  'Pharmacode',
  'Codabar',
]
