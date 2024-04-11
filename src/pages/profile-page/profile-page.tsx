import {ProfileForm} from '@pages/profile-page/profile-form';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {selectProfileInfo} from '@redux/slices/profile-slice.ts';
import {useEffect} from 'react';
import {useLazyGetCurrentUserQuery} from '@redux/api/profile-api.ts';

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
