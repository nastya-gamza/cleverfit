import {ENDPOINTS} from '@constants/endpoints.ts';
import {baseApi} from '@redux/api/base-api.ts';
import {setIsLoading} from '@redux/slices/app-slice.ts';
import {setShowSuccessModal, setTariffList} from '@redux/slices/settings-slice.ts';
import {NewTariff, TariffItem} from '@redux/types/settings.ts';

export const settingsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getTariffList: build.query<TariffItem[], void>({
            query: () => ENDPOINTS.tariffList,
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    const {data} = await queryFulfilled;

                    dispatch(setIsLoading(false));
                    dispatch(setTariffList(data));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
        }),
        buyNewTariff: build.mutation<void, NewTariff>({
            query: body => ({
                url: ENDPOINTS.newTariff,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    dispatch(setIsLoading(true));
                    await queryFulfilled;
                    dispatch(setShowSuccessModal(true));
                    dispatch(setIsLoading(false));
                } catch {
                    dispatch(setIsLoading(false));
                }
            },
        }),
    }),
});

export const {
    useGetTariffListQuery,
    useBuyNewTariffMutation,
} = settingsApi;
