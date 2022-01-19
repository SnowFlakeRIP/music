import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {Logger} from "@nestjs/common";

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)
        await app.listen(PORT, () => {
            Logger.verbose(`server has been started on address http://localhost:${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()