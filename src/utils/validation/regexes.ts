export const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;
    const isValid: boolean = regex.test(email);
    return isValid;
}

export const contains_upper_lower_number = (str: string): boolean => /[a-z]/.test(str) && /[A-Z]/.test(str) && /[0-9]/.test(str);

export const containsNumber = (str: string): boolean => /[A-Z]/.test(str)

export const containsSpecialChar = (str: string): boolean => /[!@#$%^&*(),.?":{}|<>]/.test(str)

export const containsSpace = (str: string): boolean => / /.test(str)