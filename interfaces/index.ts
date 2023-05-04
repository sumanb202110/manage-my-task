export type NewTask = {
    id ?: Number,
    task_name: String,
    description: String,
    task_status: String
}

export type User = {
    name: string,
    email: string,
    contact_no: string,
    dob: Date
}