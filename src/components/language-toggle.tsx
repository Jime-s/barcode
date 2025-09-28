'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icons } from '@/components/icons'
import { Locale, locales, languageNames, defaultLocale, localePrefix } from '@/i18n/request'

interface LanguageToggleProps {
  locale: Locale
}

export function LanguageToggle({ locale }: LanguageToggleProps) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return

    let newPath = ''
    if (locale === defaultLocale && localePrefix === 'as-needed') {
      newPath = `/${newLocale}${pathname}`
    }
    else {
      newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    }
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={buttonVariants({
            size: 'icon',
            variant: 'ghost',
          })}
        >
          <Icons.Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle language</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map((lang) => (
          <DropdownMenuItem key={lang} onClick={() => switchLanguage(lang)}>
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
