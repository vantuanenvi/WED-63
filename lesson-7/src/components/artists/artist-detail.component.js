import { Component } from "react";
import artists from "./artist.data";
class ArtistDetailComponent extends Component {
    constructor(props) {
        //super(props)
        this.state = {id: props.match.params._id}
        console.log(props.match.params)
        // this.artistId = props.artistId
        // console.log('Artist Detail Page', props.match.params)
    }
    render() {
        // const detailArtist = artists.find(t => t._id === this.artistId)
        return (<h1>Chi tiết artist</h1>)
    }
}

export default ArtistDetailComponent