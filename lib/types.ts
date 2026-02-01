// Type definitions for role and enums since SQLite doesn't support native enums
export type Role = "SUPER_ADMIN" | "ADMIN" | "INSTRUCTOR" | "STUDENT"
export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED"

export const Role = {
    SUPER_ADMIN: "SUPER_ADMIN" as const,
    ADMIN: "ADMIN" as const,
    INSTRUCTOR: "INSTRUCTOR" as const,
    STUDENT: "STUDENT" as const,
}

export const CourseLevel = {
    BEGINNER: "BEGINNER" as const,
    INTERMEDIATE: "INTERMEDIATE" as const,
    ADVANCED: "ADVANCED" as const,
}

export const CourseStatus = {
    DRAFT: "DRAFT" as const,
    PUBLISHED: "PUBLISHED" as const,
    ARCHIVED: "ARCHIVED" as const,
}
