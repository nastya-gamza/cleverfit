import {Navigate, Route, Routes} from 'react-router-dom';
import {AuthLayout, MainLayout} from '@components/layout';
import {ProtectedRoute} from './protected-route.tsx';
import {MainPage} from '@pages/main-page';
import {AuthPage} from '@pages/auth-page';
import {ResultPage} from '@pages/result-page';
import {ConfirmEmailPage} from '@pages/confirm-email-page';
import {NotFoundPage} from '@pages/not-found-page';
import {ChangePasswordPage} from "@pages/change-password-page";
import {RedirectRoute} from './redirect-route.tsx';
import {PublicRoute} from './public-route.tsx';
import {PATHS} from '@constants/paths.ts';

export const routes = (
    <Routes>
        <Route path={PATHS.root} element={<Navigate to={PATHS.main}/>}/>

        <Route element={<AuthLayout/>}>
            <Route element={<PublicRoute/>}>
                <Route path={PATHS.auth} element={<AuthPage activeTab={'login'}/>}/>
                <Route path={PATHS.register} element={<AuthPage activeTab={'register'}/>}/>
            </Route>

            <Route element={<RedirectRoute/>}>
                <Route path={PATHS.result + '/:type'} element={<ResultPage/>}/>
                <Route path={PATHS.confirmEmail} element={<ConfirmEmailPage/>}/>
                <Route path={PATHS.changePassword} element={<ChangePasswordPage/>}/>
            </Route>
        </Route>

        <Route element={<ProtectedRoute/>}>
            <Route path={PATHS.main} element={<MainLayout/>}>
                <Route index element={<MainPage/>}/>
            </Route>
        </Route>

        <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
)
