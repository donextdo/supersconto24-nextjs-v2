import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="text-center not-found-container">
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/" className="return-link">Return Home</Link>
        </div>
    )
}