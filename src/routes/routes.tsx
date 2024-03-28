import {Route, Routes} from 'react-router-dom';
import {AuthLayout, MainLayout} from '@components/layout';
import {PATHS} from '@constants/paths.ts';
import {AuthPage} from '@pages/auth-page';
import {CalendarPage} from '@pages/calendar-page';
import {ChangePasswordPage} from '@pages/change-password-page';
import {ConfirmEmailPage} from '@pages/confirm-email-page';
import {FeedbacksPage} from '@pages/feedbacks-page';
import {MainPage} from '@pages/main-page';
import {NotFoundPage} from '@pages/not-found-page';
import {ProfilePage} from '@pages/profile-page';
import {ResultPage} from '@pages/result-page';
import {SettingsPage} from '@pages/settings-page';

import {ProtectedRoute} from './protected-route.tsx';
import {PublicRoute} from './public-route.tsx';
import {RedirectRoute} from './redirect-route.tsx';
import {RootRoute} from './root-route.tsx';


export const routes = (
    <Routes>
        <Route path={PATHS.root} element={<RootRoute/>}>

            <Route element={<AuthLayout/>}>
                <Route element={<PublicRoute/>}>
                    <Route path={PATHS.auth} element={<AuthPage activeTab='login'/>}/>
                    <Route path={PATHS.register} element={<AuthPage activeTab='register'/>}/>
                </Route>

                <Route element={<RedirectRoute/>}>
                    <Route path={`${PATHS.result  }/:type`} element={<ResultPage/>}/>
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
                    <Route path={PATHS.calendar} element={<CalendarPage/>}/>
                    <Route path={PATHS.profile} element={<ProfilePage/>}/>
                    <Route path={PATHS.settings} element={<SettingsPage/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Route>
            </Route>
        </Route>
    </Routes>
)
