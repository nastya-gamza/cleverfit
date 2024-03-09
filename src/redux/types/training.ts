export type UserTrainingItem = {
    _id: string,
    name: string,
    date: Date,
    isImplementation: boolean,
    userId: string,
    parameters: {
        repeat: boolean,
        period: number,
        jointTraining: boolean,
        participants: string[]
    },
    exercises: Exercises[],
}

export type Exercises = {
    _id: string,
    name: string,
    replays: number,
    weight: number,
    approaches: number,
    isImplementation: boolean
}

export type TrainingItem = {
    name: string,
    key: string
}
