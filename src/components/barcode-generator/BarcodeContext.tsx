'use client'
import { barcodeTypes, checkQRCode } from '@/config/barcode-types'
import { ImageFormat } from '@/types/image'
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react'

interface BarcodeContextType {
  input: string
  setInput: (input: string) => void
  output: string[]
  setOutput: (output: string[]) => void
  barcodeLength: number
  setBarcodeLength: (length: number) => void
  barcodeHeight: number
  setBarcodeHeight: (height: number) => void
  showText: boolean
  setShowText: (show: boolean) => void
  showOptions: boolean
  setShowOptions: (show: boolean) => void
  codeFormat: string
  setCodeFormat: (format: string) => void
  imageFormat: ImageFormat
  setImageFormat: (format: ImageFormat) => void
  barcodeMargin: number
  setBarcodeMargin: (margin: number) => void
}

interface FormatSettings {
  barcodeLength: number
  barcodeHeight: number
  showText: boolean
  barcodeMargin: number
}

interface SavedState {
  // 旧版本的全局配置
  barcodeLength?: number
  barcodeHeight?: number
  showText?: boolean
  imageFormat?: ImageFormat
  barcodeMargin?: number

  // 新版本的按格式配置
  formatSettings?: {
    [format: string]: FormatSettings
  }

  // 全局配置
  globalSettings?: {
    imageFormat: ImageFormat
  }
}

const BarcodeContext = createContext<BarcodeContextType | undefined>(undefined)

const LOCAL_STORAGE_KEY = 'barcodeSettings'

const saveStateToLocalStorage = (state: SavedState) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
}

const getStateFromLocalStorage = (): SavedState | null => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY)
    return savedState ? JSON.parse(savedState) : null
  }
  return null
}

// 默认配置
const DEFAULT_SETTINGS: FormatSettings = {
  barcodeLength: 260,
  barcodeHeight: 80,
  showText: true,
  barcodeMargin: 10,
}

// 获取指定格式的默认设置
const getDefaultSettingsForFormat = (format: string): FormatSettings => {
  const isQRCode = checkQRCode(format)

  return {
    ...DEFAULT_SETTINGS,
    // 如果是二维码，默认高度等于宽度
    barcodeHeight: isQRCode
      ? DEFAULT_SETTINGS.barcodeLength
      : DEFAULT_SETTINGS.barcodeHeight,
  }
}

export const BarcodeProvider: React.FC<{
  children: React.ReactNode
  value: {
    initCodeFormat: string
    initialData: string
  }
}> = ({ children, value: { initCodeFormat, initialData } }) => {
  const savedState = getStateFromLocalStorage()

  // 初始化格式设置存储
  const [formatSettings, setFormatSettings] = useState<{
    [format: string]: FormatSettings
  }>(() => {
    // 如果有新版本的按格式配置，则使用它
    if (savedState?.formatSettings) {
      return savedState.formatSettings
    }

    // 否则，创建一个新的配置对象，并将旧版本的全局配置作为默认值
    const newFormatSettings: { [format: string]: FormatSettings } = {}

    // 如果有旧版本的全局配置，将其作为默认值
    if (savedState?.barcodeLength !== undefined) {
      const oldGlobalSettings: FormatSettings = {
        barcodeLength:
          savedState.barcodeLength || DEFAULT_SETTINGS.barcodeLength,
        barcodeHeight:
          savedState.barcodeHeight || DEFAULT_SETTINGS.barcodeHeight,
        showText: savedState.showText ?? DEFAULT_SETTINGS.showText,
        barcodeMargin:
          savedState.barcodeMargin || DEFAULT_SETTINGS.barcodeMargin,
      }

      // 为初始格式设置旧版本的全局配置
      newFormatSettings[initCodeFormat] = oldGlobalSettings
    } else {
      // 否则，使用默认配置
      newFormatSettings[initCodeFormat] =
        getDefaultSettingsForFormat(initCodeFormat)
    }

    return newFormatSettings
  })

  const initData =
    initialData ||
    barcodeTypes
      .flatMap((barcode) => barcode.types)
      .findLast((barcode) => barcode.value === initCodeFormat)?.initData ||
    ''

  const [input, setInput] = useState<string>(initData)
  const [output, setOutput] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [codeFormat, setCodeFormat] = useState(initCodeFormat)
  const [imageFormat, setImageFormat] = useState<ImageFormat>(
    savedState?.globalSettings?.imageFormat || savedState?.imageFormat || 'svg',
  )

  // 获取当前格式的设置
  const getCurrentFormatSettings = (): FormatSettings => {
    // 如果当前格式没有配置，则创建一个默认配置
    if (!formatSettings[codeFormat]) {
      return getDefaultSettingsForFormat(codeFormat)
    }
    return formatSettings[codeFormat]
  }

  // 当前格式的设置
  const currentSettings = getCurrentFormatSettings()

  // 单独的状态，从当前格式设置中获取
  const [barcodeLength, setBarcodeLength] = useState<number>(
    currentSettings.barcodeLength,
  )
  const [barcodeHeight, setBarcodeHeight] = useState<number>(
    currentSettings.barcodeHeight,
  )
  const [showText, setShowText] = useState<boolean>(currentSettings.showText)
  const [barcodeMargin, setBarcodeMargin] = useState<number>(
    currentSettings.barcodeMargin,
  )

  // 当编码格式改变时，更新设置
  useEffect(() => {
    const settings =
      formatSettings[codeFormat] || getDefaultSettingsForFormat(codeFormat)
    setBarcodeLength(settings.barcodeLength)
    setBarcodeHeight(settings.barcodeHeight)
    setShowText(settings.showText)
    setBarcodeMargin(settings.barcodeMargin)
  }, [codeFormat, formatSettings])

  // 当设置改变时，更新格式设置
  useEffect(() => {
    setFormatSettings((prev) => ({
      ...prev,
      [codeFormat]: {
        barcodeLength,
        barcodeHeight,
        showText,
        barcodeMargin,
      },
    }))
  }, [codeFormat, barcodeLength, barcodeHeight, showText, barcodeMargin])

  // 保存设置到本地存储
  useEffect(() => {
    // 创建新的保存状态，包含格式设置和全局设置
    const newSavedState: SavedState = {
      formatSettings,
      globalSettings: {
        imageFormat,
      },
    }

    saveStateToLocalStorage(newSavedState)
  }, [formatSettings, imageFormat])

  const value = useMemo(
    () => ({
      input,
      setInput,
      output,
      setOutput,
      barcodeLength,
      setBarcodeLength,
      barcodeHeight,
      setBarcodeHeight,
      showText,
      setShowText,
      showOptions,
      setShowOptions,
      codeFormat,
      setCodeFormat,
      imageFormat,
      setImageFormat,
      barcodeMargin,
      setBarcodeMargin,
    }),
    [
      input,
      output,
      barcodeLength,
      barcodeHeight,
      showText,
      showOptions,
      codeFormat,
      imageFormat,
      barcodeMargin,
    ],
  )

  return (
    <BarcodeContext.Provider value={value}>{children}</BarcodeContext.Provider>
  )
}

export const useBarcodeContext = () => {
  const context = useContext(BarcodeContext)
  if (context === undefined) {
    throw new Error('useBarcodeContext must be used within a BarcodeProvider')
  }
  return context
}
