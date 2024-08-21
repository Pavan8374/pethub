import { environment } from "../../environments/environment.dev";


export class Global{

    //public static WebUrl: string = "https://freetestapi.com/api/v1/";
    //public static WebUrl: string = "https://localhost:44344/v1/";
    public static WebUrl: string = environment.apiUrl
}