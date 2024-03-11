import {Popover} from 'antd';
import {Dispatch, SetStateAction} from 'react';
import {AddWorkoutModal} from '@pages/calendar-page/modals/add-workout-modal/add-workout-modal.tsx';
import {Moment} from 'moment/moment';

type CellPopoverProps = {
    isLeft: boolean,
    addNewWorkout: boolean,
    setAddNewWorkout: Dispatch<SetStateAction<boolean>>,
    value: Moment
}

export const CellPopover = ({isLeft, addNewWorkout, setAddNewWorkout, value}: CellPopoverProps) => {
    return (
        <Popover
            placement={isLeft ? 'topLeft' : 'topRight'}
            overlayInnerStyle={{width: 0, height: 0}}
            open={addNewWorkout}
            onOpenChange={(visible) => setAddNewWorkout(visible)}
            content={(
                <AddWorkoutModal
                    selectedDate={value}
                    isLeft={isLeft}
                    setAddNewWorkout={setAddNewWorkout}
                />
            )}
            trigger='focus'
        >
            <div style={{height: '100%', width: '100%'}}></div>
        </Popover>
    )
}
