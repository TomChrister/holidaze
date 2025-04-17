// Login data types
export type LoginFormData = {
    email: string;
    password: string;
};

// Register data types
export type RegisterFormData = {
    name: string;
    email: string;
    password: string;
    venueManager?: boolean;
};