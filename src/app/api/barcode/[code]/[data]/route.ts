import { NextRequest, NextResponse } from 'next/server'
import JsBarcode from 'jsbarcode'
import { DOMImplementation, XMLSerializer } from 'xmldom'
const bwipjs = require('bwip-js') as any
import { jsBarcodeSupportedFormats, checkQRCode } from '@/config/barcode-types'

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string; data: string } },
) {
  console.log('API route hit:', request.url)
  console.log('Received parameters:', params)

  const { code, data } = params

  if (!code || !data) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
  }

  try {
    let svgString = ''

    // Check if the format is supported by JsBarcode
    if (jsBarcodeSupportedFormats.includes(code.toUpperCase())) {
      // Use JsBarcode for supported formats
      const document = new DOMImplementation().createDocument(
        'http://www.w3.org/1999/xhtml',
        'html',
        null,
      )
      const svgNode = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg',
      )

      JsBarcode(svgNode, data, {
        xmlDocument: document,
        format: code.toLowerCase(),
        width: 2,
        height: 100,
        displayValue: true,
      })

      svgString = new XMLSerializer().serializeToString(svgNode)
    } else {
      // Use BWIP-JS for other formats
      const scale = 2
      const bwipConfig = {
        bcid: code.toLowerCase(),
        text: data,
        scale: scale,
        height: 100 / (2.835 * scale), // Convert px to mm
        includetext: true,
        padding: 5 / scale,
        backgroundcolor: 'ffffff',
        barcolor: '000000',
      }

      try {
        svgString = bwipjs.toSVG(bwipConfig)
      } catch (error) {
        console.error('BWIP-JS generation error:', error)
        return NextResponse.json(
          { error: `Invalid barcode value for ${code}: ${data}` },
          { status: 400 },
        )
      }
    }

    console.log('Barcode generated successfully')

    return new NextResponse(svgString, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error generating barcode:', error)
    return NextResponse.json(
      { error: 'Barcode generation failed' },
      { status: 500 },
    )
  }
}
