// For zod error
export const requiredMessage = (text: string) => {
    return { required_error: `${text} is required` };
};
