import { User } from "@prisma/client";

export interface userWithTokens { email : string , id : string , tokens: { accessToken: string, refreshToken: string } }

export interface userWithAcceseToken { email : string , id : string , accessToken: string}

export interface userWithRefreshToken { email : string , id : string , refreshToken:string }