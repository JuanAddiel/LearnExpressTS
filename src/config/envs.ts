import 'dotenv/config';
import {get} from 'env-var';
export const envs ={
    //PORT IS FOR LISTEN MY APP
    PORT:get('PORT').required().asPortNumber(),
    //PUBLIC IS FOR CARPETA CONTAINER FOR HTML
    PUBLIC_PATH:get('PUBLIC_PATH').default('public').asString()
}