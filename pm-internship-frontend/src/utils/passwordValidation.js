export const passwordRequirements = [
    "Minimum 8 characters",
    "At least one uppercase letter",
    "At least one lowercase letter",
    "At least one digit",
    "At least one special character"
];

export function validatePassword(password) {
    const value = password || "";

    return {
        minLength: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        digit: /\d/.test(value),
        special: /[^A-Za-z0-9]/.test(value)
    };
}

export function isPasswordValid(password) {
    const result = validatePassword(password);
    return Object.values(result).every(Boolean);
}
