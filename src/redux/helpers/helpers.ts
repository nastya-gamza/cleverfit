import {FetchBaseQueryError} from '@reduxjs/toolkit/query/react';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => (
    typeof error === 'object' && error !== null && 'status' in error
);
