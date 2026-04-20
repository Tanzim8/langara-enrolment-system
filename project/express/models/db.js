import {DatabaseSync} from "node:sqlite";
import path from "node:path";

const db = new DatabaseSync(
    path.join(import.meta.dirname, "../../../langara-enrolment.db")
);

export default db;