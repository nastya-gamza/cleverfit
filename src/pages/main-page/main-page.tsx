import {PageMainContent} from '@components/page-main-content';
import {PageFooter} from '@components/page-footer';
import {ErrorModal} from '@components/shared/error-modal';
import {useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {selectIsError} from '@redux/slices/app-slice.ts';


export const MainPage = () => {
    const isError = useAppSelector(selectIsError);

    return (
        <>
            {isError && <ErrorModal/>}
            <PageMainContent/>
            <PageFooter/>
        </>
    );
}


