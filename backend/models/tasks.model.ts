export default interface TaskModel {
    task_id? : number,
    name: string,
    description: string,
    priority: number,
    main_task_id?: number,
    expiration_date?: Date,
    project_id: number,
    section_id?: number,
    level: number
}