import {Dispatch, SetStateAction, useEffect} from 'react';
import {PopoverProps} from 'antd';
import {Moment} from 'moment';
import {CellPopover} from '@pages/calendar-page/popover/cell-popover';
import {CreateTrainingCard} from '@pages/calendar-page/training-cards/create-training-card';
import {resetCreatedTraining} from '@redux/slices/training-slice.ts';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';

type TrainingPopoverProps = PopoverProps & {
    isLeft: boolean,
    isFullScreen: boolean,
    addNewWorkout: boolean,
    value: Moment,
    setAddNewWorkout: Dispatch<SetStateAction<boolean>>,
    setCreateWorkout: Dispatch<SetStateAction<boolean>>,
    setEditingTrainingName: Dispatch<SetStateAction<string | null>>,
}

export const TrainingPopover = ({
                                    isLeft,
                                    isFullScreen,
                                    addNewWorkout,
                                    setAddNewWorkout,
                                    setCreateWorkout,
                                    setEditingTrainingName,
                                    value,
                                }: TrainingPopoverProps) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetCreatedTraining());
        setEditingTrainingName(null);
    }, [])

    return (
        <CellPopover
            isLeft={isLeft}
            isFullScreen={isFullScreen}
            isOpen={addNewWorkout}
            onOpenChange={setAddNewWorkout}
            content={
                <CreateTrainingCard
                    selectedDate={value}
                    isLeft={isLeft}
                    setAddNewWorkout={setAddNewWorkout}
                    setCreateWorkout={setCreateWorkout}
                    setEditingTrainingName={setEditingTrainingName}
                />
            }
        >
            <div
                onClick={() => setAddNewWorkout(true)}
                style={{height: '100%', width: '100%', left: 0}}
            />
        </CellPopover>
    )
}
