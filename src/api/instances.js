import axios from "axios";
import {burgerApiUrl} from "./apiUrl";


export const burgerInstance = axios.create({
    baseURL: burgerApiUrl
})