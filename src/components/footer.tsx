import { GoogleAnalytics } from '@next/third-parties/google'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex justify-center gap-4 py-8 text-sm">
      <span>&copy; {new Date().getFullYear()}</span>
      <Link href="/terms" className="hover:underline">
        Terms & Privacy
      </Link>
      <>
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ? (
          <>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_TAG_ID} />
          </>
        ) : null}
      </>
    </footer>
  )
}
