import Banner from '../Banner'

export default function WonBanner({ numOfGuesses }: { numOfGuesses: number }) {
  return (
    <Banner status="happy">
      <p>
        <strong>Congratulations!</strong> Got it in{' '}
        <strong>{numOfGuesses === 1 ? '1 guess' : `${numOfGuesses} gusses`}</strong>
      </p>
    </Banner>
  )
}
