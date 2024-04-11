import {UserJointTrainingList} from '@redux/types/invite.ts';

export const sortJointTrainingList = (arr: UserJointTrainingList[]) => {
    const statusOrder: Record<string, number> = {
        accepted: 1,
        pending: 2,
        null: 3,
        rejected: 4,
    };

    if (!arr || arr.length === 0) {
        return [];
    }

    return [...arr].sort((a, b) => {
        const getStatusValue = (status: string | null): number => statusOrder[status || 'null'] || 3;

        const statusComparison = getStatusValue(a.status) - getStatusValue(b.status);

        if (statusComparison !== 0) {
            return statusComparison;
        }

        const [firstNameA, lastNameA] = (a.name || '')?.toLowerCase().split(' ');
        const [firstNameB, lastNameB] = (b.name || '')?.toLowerCase().split(' ');

        const nameComparison = firstNameA?.localeCompare(firstNameB);

        return nameComparison === 0 ? lastNameA?.localeCompare(lastNameB) : nameComparison;
    });
}
