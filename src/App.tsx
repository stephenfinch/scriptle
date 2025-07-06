import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'

export default function App() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [guesses, setGuesses] = useState<Record<number, string>>({})

  const verse =
    'In the beginning was the Word, and the Word was with God, and the Word was God. He was in the beginning with God.'

  const { verseWithBlanks, blanks } = getBlanks(verse)

  const handleNext = (guess: string) => {
    const nextBlankIndex = verseWithBlanks.findIndex(
      (word, index) => index > currentWordIndex && word === ''
    )
    setCurrentWordIndex(nextBlankIndex)
    setGuesses(prevGuesses => ({ ...prevGuesses, [currentWordIndex]: guess }))
  }

  const handleSubmit = () => {
    const completedVerse = verseWithBlanks
      .map((word, index) => {
        return guesses[index] ?? word
      })
      .join(' ')

    if (completedVerse === verse) {
      alert('Congratulations! You completed the verse correctly!')
    } else {
      alert('The completed verse does not match the original verse.')
    }

    setCurrentWordIndex(0)
    setGuesses({})
  }

  const handleDelete = () => {
    const lastGuessIndex = Object.keys(guesses).pop() ?? 0
    setCurrentWordIndex(Number(lastGuessIndex))
    setGuesses(prevGuesses => {
      const newGuesses = { ...prevGuesses }
      delete newGuesses[Number(lastGuessIndex)]
      return newGuesses
    })
  }

  return (
    <>
      <Typography variant="h1">SCRIPTLE</Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          marginTop: 2,
          maxWidth: '400px',
        }}
      >
        {verseWithBlanks.map((word, index) => (
          <Box
            sx={{
              padding: 1,
              border: `1px solid ${currentWordIndex === index ? 'blue' : 'lightgray'}`,
              borderRadius: 2,
              textAlign: 'center',
              minWidth: '40px',
            }}
            key={word + index}
          >
            <Typography variant="body1" className="verse">
              {guesses[index] ?? word}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          marginTop: 2,
          maxWidth: '400px',
        }}
      >
        {blanks.map((blank, index) => (
          <Button
            key={blank + index}
            onClick={() => handleNext(blank)}
            sx={{ padding: 2, backgroundColor: 'darkgray', borderRadius: 2 }}
            disabled={Object.keys(guesses).length >= blanks.length}
          >
            {blank}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 2,
          maxWidth: '400px',
        }}
      >
        <Button
          onClick={handleSubmit}
          disabled={Object.keys(guesses).length < blanks.length}
        >
          Submit
        </Button>
        <Button onClick={handleDelete} disabled={Object.keys(guesses).length === 0}>
          Delete
        </Button>
      </Box>
    </>
  )
}

const getBlanks = (verse: string) => {
  const words = verse.split(' ')
  const blanks: string[] = []
  const verseWithBlanks = words.map((word, index) => {
    if (index % 2 === 0) {
      blanks.push(word)
      return ''
    }
    return word
  })
  return { verseWithBlanks, blanks }
}
