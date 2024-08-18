export interface Repo {
    getItem(key: string): string | null
    setItem(key: string, value: any): void
}