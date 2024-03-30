import {useState} from 'react';
import {useAppDispatch} from '@hooks/typed-react-redux-hooks.ts';
import {setExerciseData} from '@redux/slices/training-slice.ts';
import {Exercise} from '@redux/types/training.ts';
import {Checkbox, Form, Input, InputNumber, Space, Typography} from 'antd';

import styles from './exercises-form.module.less';

type ExercisesFormProps = {
    weight: number | null;
    approaches: number | null;
    name: string;
    replays: number | null;
    index: number;
    isCheckbox: boolean;
    addDeletedExercise: (id: number) => void,
    excludeDeletedExercise: (id: number) => void,
};

export const ExercisesForm = ({
                                  weight,
                                  approaches,
                                  name,
                                  replays,
                                  index,
                                  isCheckbox,
                                  addDeletedExercise,
                                  excludeDeletedExercise,
                              }: ExercisesFormProps) => {

    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isChecked, setIsChecked] = useState(false)

    const onChange = () => {
        if (!isChecked) {
            addDeletedExercise(index);
        } else {
            excludeDeletedExercise(index)
        }
        setIsChecked(!isChecked);
    };

    const handleChange = (_, exercise: Exercise) => {
        dispatch(setExerciseData({exercise, index}));
    };

    return (
        <Form
            form={form}
            initialValues={{
                name,
                approaches,
                weight,
                replays
            }}
            onValuesChange={handleChange}
            layout='vertical'
            size='small'
            className={styles.exerciseForm}
            colon={false}
        >
            <Form.Item name='name' className={styles.exerciseField}>
                <Input
                    value={name}
                    placeholder='Упражнения'
                    maxLength={32}
                    width='100%'
                    data-test-id={`modal-drawer-right-input-exercise${index}`}
                    addonAfter={
                        isCheckbox && (
                            <Checkbox
                                checked={isChecked}
                                data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                onChange={onChange}
                            />
                        )
                    }
                />
            </Form.Item>
            <Space direction='horizontal' align='end' size={3}>
                <Form.Item name='approaches'
                           label='Подходы'
                           className={styles.approachesField}
                >
                    <InputNumber
                        value={approaches}
                        placeholder='1'
                        min={1}
                        addonBefore='+'
                        data-test-id={`modal-drawer-right-input-approach${index}`}
                    />
                </Form.Item>
                <Form.Item
                    name='weight'
                    label='Вес, кг'
                    className={styles.field}
                >
                    <InputNumber
                        value={weight}
                        placeholder='0'
                        min={0}
                        data-test-id={`modal-drawer-right-input-weight${index}`}
                    />
                </Form.Item>
                <Form.Item><Typography.Text type='secondary'>x</Typography.Text></Form.Item>
                <Form.Item
                    name='replays'
                    label='Количество'
                    className={styles.field}>
                    <InputNumber
                        value={replays}
                        placeholder='1'
                        min={1}
                        data-test-id={`modal-drawer-right-input-quantity${index}`}
                    />
                </Form.Item>
            </Space>
        </Form>
    )
}
