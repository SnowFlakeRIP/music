import {Injectable, Logger} from '@nestjs/common';
import {Track, TrackDocument} from "./schemas/track.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Comment, CommentDocument} from "./schemas/comment.schema";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileService, FileType} from "../file/file.service";

@Injectable()
export class TrackService {

    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileService: FileService
    ) {
    }

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        try {
            const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
            const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
            const track = await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
            return track
        } catch (e) {
            Logger.error(e)
        }
    }

    async getAll(): Promise<Track[]> {
        try {
            const tracks = await this.trackModel.find()
            return tracks
        } catch (e) {
            Logger.error(e)
        }

    }

    async getOne(id: ObjectId): Promise<Track> {
        try {
            const track = await this.trackModel.findById(id).populate('comments')
            return track
        } catch (e) {
            Logger.error(e)
        }
    }

    async delete(id: ObjectId): Promise<Object> {
        try {
            const track = await this.trackModel.findByIdAndDelete(id)
            return {message: `Удален трек с id ${track._id}`}
        } catch (e) {
            Logger.error(e)
        }
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        try {
            const track = await this.trackModel.findById(dto.trackId)
            const comment = await this.commentModel.create({...dto})
            track.comments.push(comment._id)
            await track.save()
            return comment
        } catch (e) {
            Logger.error(e)
        }
    }
}
