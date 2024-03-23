import {Feedback} from '@redux/types/feedback.ts';

export const sortByDate = (items: Feedback[]) => (
    [...items].sort((a: Feedback, b: Feedback) => +new Date(b.createdAt) - +new Date(a.createdAt))
);
