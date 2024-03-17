import {Form, Input, InputNumber, Space, Typography} from 'antd';
import styles from './exercises-form.module.less';
import {useAppDispatch, useAppSelector} from '@hooks/typed-react-redux-hooks.ts';
import {setExercisesData} from '@redux/slices/training-slice.ts';
import {Exercises} from '@redux/types/training.ts';

type ExercisesFormProps = {
    weight: number;
    approaches: number;
    name: string;
    replays: number;
    index: number;
};

export const ExercisesForm = ({weight, approaches, name, replays, index}: ExercisesFormProps) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const training = useAppSelector(state => state.training.createdTraining);

    const handleChange = (_, allValues: Exercises) => {
        dispatch(setExercisesData({exercise: allValues, index}));
    };

    return (
        <Form
            form={form}
            onValuesChange={handleChange}
            layout='vertical'
            size='small'
            className={styles.exerciseForm}
            colon={false}
        >
            <Form.Item name='name' style={{marginBottom: '8px'}}>
                <Input
                    value={name}
                    placeholder='Упражнения'
                    maxLength={32}
                    width='100%'
                    data-test-id={`modal-drawer-right-input-exercise${index}`}
                />
            </Form.Item>
            <Space direction='horizontal' align={'end'} size={3}>
                <Form.Item name='approaches' label='Подходы'
                           style={{maxWidth: '120px', marginRight: '28px'}}>
                    <InputNumber
                        value={approaches}
                        placeholder='0'
                        min={1}
                        addonBefore='+'
                        data-test-id={`modal-drawer-right-input-approach${index}`}
                    />
                </Form.Item>
                <Form.Item name='weight' label='Вес, кг' style={{maxWidth: '89px'}}>
                    <InputNumber
                        value={weight}
                        placeholder='0'
                        min={0}
                        data-test-id={`modal-drawer-right-input-weight${index}`}
                    />
                </Form.Item>
                <Form.Item className='item-separator'><Typography.Text
                    type='secondary'>x</Typography.Text></Form.Item>
                <Form.Item name='replays' label='Количество' style={{maxWidth: '89px'}}>
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
