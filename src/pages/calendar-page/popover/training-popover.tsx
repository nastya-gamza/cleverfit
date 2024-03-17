import {Dispatch, SetStateAction} from 'react';
import {PopoverProps} from 'antd';
import {Moment} from 'moment';
import {CellPopover} from '@pages/calendar-page/popover/cell-popover.tsx';
import {CreateTrainingCard} from '@pages/calendar-page/training-cards/create-training-card';

type TrainingPopoverProps = PopoverProps & {
    isLeft: boolean,
    addNewWorkout: boolean,
    value: Moment,
    setAddNewWorkout: Dispatch<SetStateAction<boolean>>,
    setCreateWorkout: Dispatch<SetStateAction<boolean>>,
}

export const TrainingPopover = ({
                                    isLeft,
                                    addNewWorkout,
                                    setAddNewWorkout,
                                    setCreateWorkout,
                                    value,
                                }: TrainingPopoverProps) => {
    return (
        <CellPopover
            isLeft={isLeft}
            isOpen={addNewWorkout}
            onOpenChange={setAddNewWorkout}
            content={
                <CreateTrainingCard
                    selectedDate={value}
                    isLeft={isLeft}
                    setAddNewWorkout={setAddNewWorkout}
                    setCreateWorkout={setCreateWorkout}
                />
            }
        >
            <div
                onClick={() => setAddNewWorkout(true)}
                style={{height: '100%', width: '100%'}}
            />
        </CellPopover>
    )
}
