import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="bg-surface border-border shadow-soft rounded-4xl border p-8 sm:p-10">
      <p className="text-muted text-sm font-semibold uppercase tracking-[0.28em]">
        Not Found
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
        This page does not exist.
      </h1>
      <p className="text-muted mt-4 max-w-2xl text-base leading-7">
        The route is set up correctly, but there is no page at this path yet.
      </p>
      <Link
        to="/"
        className="bg-text text-bg mt-6 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold"
      >
        Back to home
      </Link>
    </section>
  )
}

export default NotFound
