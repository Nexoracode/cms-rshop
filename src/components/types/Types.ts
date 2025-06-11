export type Role = "customer" | "admin" | "staff" | "tasker" | "all_roles"

export type EditType = "DESCRIPTION" | "UPDATE" | "CREATE" | "NULL"

export type Description = {
    id?: number,
    description: string,
    isValid: boolean
}