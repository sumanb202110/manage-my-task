export type NewTask = {
    id ?: Number,
    task_name: String,
    description: String,
    task_status: String
}

export type User = {
    name: String,
    email: String,
    contact_no: String,
    dob: Date
}