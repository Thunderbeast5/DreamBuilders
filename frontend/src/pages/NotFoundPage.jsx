import { Button } from '../components/ui/Button.jsx'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-xl">
        <div className="text-sm font-semibold text-slate-600">404</div>
        <h1 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-slate-600">
          The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-7">
          <Button to="/">Back to Home</Button>
        </div>
      </div>
    </div>
  )
}

