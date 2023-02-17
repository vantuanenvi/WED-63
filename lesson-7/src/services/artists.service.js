import BaseService from "./base.service";
export default class ArtistService extends BaseService {
    constructor() {
        super({ endpoint: 'artists' })
    }
    GetAllArtist = (params) => {
        return this.GetAll(params)
    }
}