export type Feedback = {
    id: string,
    fullName: string | null,
    image: string | null,
    message: string | null,
    rating: number,
    createdAt: string,
}

export type FeedbackRequest = {
    message: string,
    rating: number,
}
