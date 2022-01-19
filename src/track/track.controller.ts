import {Body, Controller, Get, Post} from '@nestjs/common';
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/create-track.dto";

@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) {
    }

    @Post('/create_track')
    create(@Body() dto: CreateTrackDto) {
        return this.trackService.create(dto)
    }

    @Get('/get_all_tracks')
    getAll() {
        return this.trackService.getAll()
    }

    getOne() {

    }

    delete() {

    }
}
