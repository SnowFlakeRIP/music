import {Module} from "@nestjs/common";
import {TrackModule} from './track/track.module';
import {AlbumModule} from './album/album.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        TrackModule,
        AlbumModule,
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.jh5fl.mongodb.net/music-app?retryWrites=true&w=majority')
    ]
})
export class AppModule {

}