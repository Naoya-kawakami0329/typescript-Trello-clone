import { DataSource } from "typeorm";
import { User } from "./user.entity.js";

export const AppDataSource=new DataSource({
type:'sqlite',
database:'database.sqlite',
logging:false,
synchronize:true,
entities:[User],
});

