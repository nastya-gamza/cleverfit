import {Route, Routes} from 'react-router-dom';
import {AuthLayout, MainLayout} from '@components/layout';
import {ProtectedRoute} from './protected-route.tsx';
import {MainPage} from '@pages/main-page';
import {AuthPage} from '@pages/auth-page';
import {ResultPage} from '@pages/result-page';
import {ConfirmEmailPage} from '@pages/confirm-email-page';
import {NotFoundPage} from '@pages/not-found-page';
import {ChangePasswordPage} from '@pages/change-password-page';
import {FeedbacksPage} from '@pages/feedbacks-page';
import {RedirectRoute} from './redirect-route.tsx';
import {PublicRoute} from './public-route.tsx';
import {RootRoute} from './root-route.tsx';
import {PATHS} from '@constants/paths.ts';


export const routes = (
    <Routes>
        <Route path={PATHS.root} element={<RootRoute/>}>

            <Route element={<AuthLayout/>}>
                <Route element={<PublicRoute/>}>
                    <Route path={PATHS.auth} element={<AuthPage activeTab='login'/>}/>
                    <Route path={PATHS.register} element={<AuthPage activeTab='register'/>}/>
                </Route>

                <Route element={<RedirectRoute/>}>
                    <Route path={PATHS.result + '/:type'} element={<ResultPage/>}/>
                    <Route path={PATHS.confirmEmail} element={<ConfirmEmailPage/>}/>
                    <Route path={PATHS.changePassword} element={<ChangePasswordPage/>}/>
                </Route>
            </Route>

            <Route element={<ProtectedRoute/>}>
                <Route element={<MainLayout/>}>
                    <Route path={PATHS.main} element={<MainPage/>}/>
                </Route>
                <Route element={<MainLayout/>}>
                    <Route path={PATHS.feedbacks} element={<FeedbacksPage/>}/>
                </Route>
            </Route>

            <Route path='*' element={<NotFoundPage/>}/>
        </Route>
    </Routes>
)
