import 'dotenv/config';
import {get} from 'env-var';
export const envs ={
    //PORT IS FOR LISTEN MY APP
    PORT:get('PORT').required().asPortNumber(),
    //PUBLIC IS FOR CARPETA CONTAINER FOR HTML
    PUBLIC_PATH:get('PUBLIC_PATH').default('public').asString(),
    DATABASE_URL: get('DATABASE_URL').required().asString(),
    POSTGRES_DB: get('POSTGRES_DB').required().asString(),
    POSTGRES_USER: get('POSTGRES_USER').required().asString(),
    POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').required().asString(),
}