import {Module} from "@nestjs/common";
import {TrackModule} from './track/track.module';
import {AlbumModule} from './album/album.module';
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from './file/file.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";

@Module({
    imports: [
        TrackModule,
        AlbumModule,
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.jh5fl.mongodb.net/music-app?retryWrites=true&w=majority'),
        FileModule,
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
    ]
})
export class AppModule {

}