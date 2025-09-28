import React, { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBarcodeContext } from './BarcodeContext'
import JsBarcode from 'jsbarcode'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { Download } from 'lucide-react'
import { ImageFormat } from '@/types/image'
import { checkQRCode, jsBarcodeSupportedFormats } from '@/config/barcode-types'
const bwipjs = require('bwip-js') as any

export const DownloadBarcodes: React.FC = () => {
  const {
    input,
    barcodeLength,
    barcodeHeight,
    showText,
    codeFormat,
    imageFormat,
    setImageFormat,
    barcodeMargin,
  } = useBarcodeContext()

  const generateBarcode = useCallback(
    (value: string): Promise<Blob | string> => {
      return new Promise((resolve, reject) => {
        const scaleFactor = 1

        try {
          if (jsBarcodeSupportedFormats.includes(codeFormat.toUpperCase())) {
            // JsBarcode 配置
            const jsBarcodeConfig = {
              format: codeFormat.toUpperCase(),
              width: 2,
              height: barcodeHeight,
              displayValue: showText,
              font: 'Arial',
              fontSize: 20,
              textMargin: 2,
              margin: barcodeMargin,
              background: '#ffffff',
              lineColor: '#000000',
              textAlign: 'center',
              textPosition: 'bottom',
            }

            if (imageFormat === 'svg') {
              const svg = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg',
              )

              try {
                JsBarcode(svg, value, jsBarcodeConfig)
                svg.setAttribute('width', `${barcodeLength}`)
                svg.setAttribute('height', `${barcodeHeight}`)
                resolve(new XMLSerializer().serializeToString(svg))
              } catch (error) {
                console.error('JsBarcode generation error:', error)
                reject(
                  new Error(
                    `Invalid barcode value for ${codeFormat}: ${value}`,
                  ),
                )
              }
            } else {
              const canvas = document.createElement('canvas')
              canvas.width = barcodeLength * scaleFactor
              canvas.height = barcodeHeight * scaleFactor

              try {
                JsBarcode(canvas, value, {
                  ...jsBarcodeConfig,
                  width: 2 * scaleFactor,
                  height: barcodeHeight * scaleFactor,
                  fontSize: 20 * scaleFactor,
                  textMargin: 2 * scaleFactor,
                  margin: barcodeMargin * scaleFactor,
                })

                canvas.toBlob(
                  (blob) => {
                    if (blob) {
                      resolve(blob)
                    } else {
                      reject(new Error('Failed to generate barcode image'))
                    }
                  },
                  `image/${imageFormat}`,
                  imageFormat === 'jpg' ? 0.9 : 1,
                )
              } catch (error) {
                console.error('JsBarcode generation error:', error)
                reject(
                  new Error(
                    `Invalid barcode value for ${codeFormat}: ${value}`,
                  ),
                )
              }
            }
          } else {
            // BWIP-JS 配置
            const scale = 2
            const MM_TO_PX = 2.835 * scale // 72 dpi / 25.4 mm/in
            const heightInMM = barcodeHeight / MM_TO_PX
            const widthInMM = barcodeLength / MM_TO_PX
            const marginInMM = barcodeMargin / scale

            // 检查是否是二维码类型
            const isQRCode = checkQRCode(codeFormat)

            const fontSize = 15 // 固定字体大小为15px
            const textMargin = 2 // 文本与条码之间的间距

            const bwipConfig = {
              bcid: codeFormat.toLowerCase(),
              text: value,
              scale: scale,
              height: heightInMM,
              width: widthInMM,
              includetext: showText,
              padding: marginInMM,
              paddingbottom:
                isQRCode && showText
                  ? marginInMM + fontSize + textMargin
                  : marginInMM,
              backgroundcolor: 'ffffff',
              barcolor: '000000',
            }

            try {
              if (imageFormat === 'svg') {
                const svgString = bwipjs.toSVG(bwipConfig)
                const parser = new DOMParser()
                const doc = parser.parseFromString(svgString, 'image/svg+xml')
                const svg = doc.documentElement

                svg.setAttribute('width', `${barcodeLength}`)
                svg.setAttribute(
                  'height',
                  `${isQRCode && showText ? barcodeHeight + fontSize + textMargin : barcodeHeight}`,
                )

                if (isQRCode && showText) {
                  // 使用 Canvas 测量文本宽度
                  const canvas = document.createElement('canvas')
                  const ctx = canvas.getContext('2d')

                  if (ctx === null) {
                    console.warn('Canvas 2D context not supported')
                    return `<div class="barcode-item">${svg.outerHTML}</div>`
                  }

                  ctx.font = `${fontSize}px Arial`
                  const textWidth = ctx.measureText(value).width

                  // 计算缩放比例
                  const availableWidth = barcodeLength - marginInMM * 2
                  const scaleRatio = Math.min(1, availableWidth / textWidth)

                  // 创建text元素
                  const text = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'text',
                  )
                  text.setAttribute('x', `${marginInMM + barcodeLength / 2}`)
                  text.setAttribute(
                    'y',
                    `${barcodeHeight + marginInMM * 2 + fontSize + textMargin}`,
                  )
                  text.setAttribute('text-anchor', 'middle')
                  text.setAttribute('font-family', 'Arial')
                  text.setAttribute('font-size', `${fontSize}`)
                  text.setAttribute('transform', `scale(${scaleRatio})`)
                  text.setAttribute(
                    'transform-origin',
                    `${marginInMM + barcodeLength / 2} ${barcodeHeight + marginInMM * 2 + fontSize / 2 + textMargin}`,
                  )
                  text.setAttribute('fill', '#000000')

                  text.textContent = value
                  svg.appendChild(text)

                  svg.setAttribute(
                    'height',
                    `${barcodeHeight + fontSize + textMargin + marginInMM * 2}`,
                  )
                }
                resolve(new XMLSerializer().serializeToString(svg))
              } else {
                if (isQRCode && showText) {
                  // 创建临时canvas来测量文本宽度
                  const tempCanvas = document.createElement('canvas')
                  const tempCtx = tempCanvas.getContext('2d')

                  if (!tempCtx) {
                    console.warn('Canvas 2D context not supported')
                    reject(new Error('Canvas 2D context not supported'))
                    return
                  }

                  // 测量文本宽度
                  tempCtx.font = `${fontSize}px Arial`
                  const textWidth = tempCtx.measureText(value).width
                  const requiredWidth = textWidth + barcodeMargin * 2 // 文本需要的宽度（包含边距）

                  // 计算缩放比例 - 如果文本宽度大于原始宽度，需要放大整体尺寸
                  const scaleRatio = Math.max(
                    1,
                    Math.ceil(requiredWidth / barcodeLength),
                  )

                  // 创建最终的canvas，尺寸根据缩放比例调整
                  const finalCanvas = document.createElement('canvas')
                  const ctx = finalCanvas.getContext('2d')

                  if (!ctx) {
                    console.warn('Canvas 2D context not supported')
                    reject(new Error('Canvas 2D context not supported'))
                    return
                  }

                  bwipConfig.scale = scale * scaleRatio
                  bwipConfig.paddingbottom = marginInMM + fontSize / scaleRatio
                  bwipjs.toCanvas(finalCanvas, bwipConfig)

                  // 设置最终canvas的尺寸
                  const finalWidth = finalCanvas.width
                  const finalHeight = finalCanvas.height

                  // 绘制文本
                  ctx.fillStyle = '#000000'
                  ctx.font = `${fontSize}px Arial`
                  ctx.textAlign = 'center'
                  // ctx.textBaseline = 'top'
                  ctx.fillText(
                    value,
                    finalWidth / 2,
                    finalHeight - fontSize - textMargin,
                  )

                  // 转换为blob
                  finalCanvas.toBlob(
                    (blob) => {
                      if (blob) {
                        resolve(blob)
                      } else {
                        reject(new Error('Failed to generate barcode image'))
                      }
                    },
                    `image/${imageFormat}`,
                    imageFormat === 'jpg' ? 0.9 : 1,
                  )
                } else {
                  // 如果不需要显示文本，直接使用原始尺寸
                  const canvas = document.createElement('canvas')
                  bwipjs.toCanvas(canvas, bwipConfig)

                  canvas.toBlob(
                    (blob) => {
                      if (blob) {
                        resolve(blob)
                      } else {
                        reject(new Error('Failed to generate barcode image'))
                      }
                    },
                    `image/${imageFormat}`,
                    imageFormat === 'jpg' ? 0.9 : 1,
                  )
                }
              }
            } catch (error) {
              console.error('BWIP-JS generation error:', error)
              reject(
                new Error(`Invalid barcode value for ${codeFormat}: ${value}`),
              )
            }
          }
        } catch (error) {
          console.error('Error generating barcode:', error)
          reject(new Error(`Failed to generate barcode: ${error}`))
        }
      })
    },
    [
      barcodeLength,
      barcodeHeight,
      barcodeMargin,
      showText,
      codeFormat,
      imageFormat,
    ],
  )

  const downloadBarcodes = useCallback(async () => {
    const values = input.split('\n').filter((value) => value.trim() !== '')

    if (values.length === 1) {
      const barcodeData = await generateBarcode(values[0])
      if (imageFormat === 'svg') {
        const blob = new Blob([barcodeData as string], {
          type: 'image/svg+xml;charset=utf-8',
        })
        FileSaver.saveAs(blob, `barcode-${codeFormat}.${imageFormat}`)
      } else {
        FileSaver.saveAs(
          barcodeData as Blob,
          `barcode-${codeFormat}.${imageFormat}`,
        )
      }
    } else {
      const zip = new JSZip()

      for (let i = 0; i < values.length; i++) {
        const value = values[i]
        const barcodeData = await generateBarcode(value)
        if (imageFormat === 'svg') {
          zip.file(
            `barcode-${codeFormat}_${i + 1}.${imageFormat}`,
            barcodeData as string,
          )
        } else {
          zip.file(
            `barcode-${codeFormat}_${i + 1}.${imageFormat}`,
            barcodeData as Blob,
          )
        }
      }

      zip.generateAsync({ type: 'blob' }).then((content) => {
        FileSaver.saveAs(content, 'barcodes(barcodediy).zip')
      })
    }
  }, [input, generateBarcode, imageFormat, codeFormat])

  return (
    <div className="flex flex-wrap items-center justify-center space-x-2 space-y-2">
      <Button
        size="lg"
        variant="outline"
        onClick={downloadBarcodes}
        title="download barcodes"
        className="h-10 border-none bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 px-6 text-white hover:from-blue-700 hover:via-purple-700 hover:to-red-700"
      >
        <Download className="mr-2 h-4 w-4" />
        <span className="text-sm">Download</span>
      </Button>
      <span className="text-sm"> as</span>
      <Select
        value={imageFormat}
        onValueChange={(value: ImageFormat) => setImageFormat(value)}
      >
        <SelectTrigger className="h-8 w-[70px] bg-white">
          <SelectValue placeholder="Format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="png">PNG</SelectItem>
          <SelectItem value="jpg">JPG</SelectItem>
          <SelectItem value="gif">GIF</SelectItem>
          <SelectItem value="svg">SVG</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
