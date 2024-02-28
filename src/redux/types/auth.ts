export type LoginResponse = {
    accessToken: string
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = {
    email: string;
    password: string;
    confirmPassword: string;
};

export type CheckEmailResponse = {
    email: string;
    message: string;
};

export type CheckEmailRequest = Pick<CheckEmailResponse, 'email'>;

export type ConfirmEmailResponse = CheckEmailResponse;

export type ConfirmEmailRequest = {
    email: string;
    code: string;
};

export type ChangePasswordResponse = {
    message: string;
};

export type ChangePasswordRequest = {
    password: string;
    confirmPassword: string;
};
