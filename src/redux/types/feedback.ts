import {Nullable} from '@typings/nullable.ts';

export type Feedback = {
    id: string,
    fullName: Nullable<string>,
    imageSrc: Nullable<string>,
    message: Nullable<string>,
    rating: number,
    createdAt: string,
}

export type FeedbackRequest = {
    message: string,
    rating: number,
}
