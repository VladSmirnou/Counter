import { Repo } from "../components/counterSettings/repoInterface";

export class LocalStorageRepo implements Repo {
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }
    
    setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
