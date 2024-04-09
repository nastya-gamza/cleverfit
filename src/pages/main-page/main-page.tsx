import React, {useEffect} from 'react';
import {PageFooter} from '@components/page-footer';
import {PageMainContent} from '@components/page-main-content';
import {ErrorModal} from '@components/shared/error-modal';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {useGetInviteListQuery} from '@redux/api/invite-api.ts';
import {useLazyGetCurrentUserQuery} from '@redux/api/profile-api.ts';
import {selectIsError} from '@redux/slices/app-slice.ts';
import {selectProfileInfo} from '@redux/slices/profile-slice.ts';

export const MainPage = () => {
    const isError = useAppSelector(selectIsError);
    const profileInfo = useAppSelector(selectProfileInfo);
    const [getUserTraining] = useLazyGetCurrentUserQuery();

    useGetInviteListQuery();

    useEffect(() => {
        if (!profileInfo.email) {
            getUserTraining();
        }
    }, [getUserTraining, profileInfo.email]);

    return (
        <React.Fragment>
            {isError && <ErrorModal/>}
            <PageMainContent/>
            <PageFooter/>
        </React.Fragment>
    );
}


