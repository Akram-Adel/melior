export type IQuestionsApi = {
  [key: string]: {
    id: number
    text: string
    choices: {
      id: number
      text: 'Good' | 'Neutral' | 'Bad' // As per specifications, I only care about these three
    }[]
  }[]
}

export type IReviewsApi = {
  results: {
    id: number
    submitted_at: string
    answers: {
      question: number
      choice: number
    }[]
  }[]
}
