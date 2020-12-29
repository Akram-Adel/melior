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

export type IReviewAnswer = {
  question: number
  choice: number
}
export type IReviewsApi = {
  line_chart_data: {
    submitted_at: string
    answers: IReviewAnswer[]
  }[] | undefined
}
