export enum Statuses {
    accepted = 'accepted',
    pending = 'pending',
    rejected = 'rejected',
}

export const STATUSES_MAP: Record<Statuses, string> = {
    [Statuses.accepted]: 'тренировка одобрена',
    [Statuses.pending]: 'ожидает подтверждения',
    [Statuses.rejected]: 'тренировка отклонена',
};
