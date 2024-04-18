import {useEffect} from 'react';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {ProfileForm} from '@pages/profile-page/profile-form';
import {useLazyGetCurrentUserQuery} from '@redux/api/profile-api.ts';
import {selectProfileInfo} from '@redux/slices/profile-slice.ts';

export const ProfilePage = () => {
    const profileInfo = useAppSelector(selectProfileInfo);
    const [getUserTraining] = useLazyGetCurrentUserQuery();

    useEffect(() => {
        if (!profileInfo.email) {
            getUserTraining();
        }
    }, [getUserTraining, profileInfo.email]);

    return (
        <ProfileForm/>
    )
}
