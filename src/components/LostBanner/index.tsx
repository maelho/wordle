import Banner from '../Banner'

export default function LostBanner({ answer }: { answer: string }) {
  return (
    <Banner status="sad">
      <p>
        Sorry! The answer was <strong>{answer}</strong>
      </p>
    </Banner>
  )
}
