import React, {useEffect} from 'react';
import {ErrorModal} from '@components/error-modal';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {PageFooter} from '@pages/main-page/page-footer';
import {PageMainContent} from '@pages/main-page/page-main-content';
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


