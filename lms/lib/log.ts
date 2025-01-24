import { showToast } from "./toast";

export class Log{
    static info(message?: any, ...optionalParams: any[]): void {
        showToast(message.message || message);
        console.log(message, optionalParams);
    }
    static error(message?: any, ...optionalParams: any[]): void {
        console.error(message, optionalParams);
    }
}