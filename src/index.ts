import { Server } from "./server";
import * as dotenv from 'dotenv';

dotenv.config();

const app = new Server();

app.run();