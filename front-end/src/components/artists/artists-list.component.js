import { Component } from "react";
import { Link } from "react-router-dom";
import artists from "./artist.data";
import ArtistService from '../../services/artists.service'
export default class ArtistListComponent extends Component {
    constructor(props) {
        super(props);
        this.service = new ArtistService()
        //this.artists = artists;
        this.artists = [];
        this.selectedRows = []
        this.state = {
            loading: false,
            _count: 0,
            _length: 0,
            _artists: []
        }
    }

    componentDidMount() {
        this.service.Count().then(res => {
            this.setState({
                loading: this.state.loading,
                _count: res.data.count,
                _length: this.state._length,
                _artists: this.state._artists
            })
        })
        this.service.GetAllArtist({ skip: 0, take: 5, orderBy: '-year_born' }).then(res => {
            console.log(res.data)
            //setState data
            this.setState({
                loading: true,
                _length: res.data.length,
                _artists: res.data.data
            })
        });
    }

    navigate(params) {
        this.setState({
            loading: false,
            _count: this.state._count,
            _length: this.state._length,
            _artists: this.state._artists
        })
        this.service.GetAllArtist({ skip: params.skip, take: params.take, orderBy: 'last_name' }).then(res => {
            console.log(res.data)
            //setState data
            this.setState({
                loading: true,
                _count: this.state._count,
                _length: res.data.length,
                _artists: res.data.data
            })
        });
    }
    onSelectedRow = (rows) => {
        console.log("console from parent component", rows)
    }
    render() {
        const { loading, _length, _artists, _count } = this.state;
        if (!loading) {
            return (
                <h1>Loading...</h1>
            )
        }
        var pages = [1];
        if (_count > 5) {
            while (pages.length <= Math.round(_count / 5)) {
                pages.push(pages.length + 1)
            }
            console.log(pages)
        }
        return (
            <div>
                <h1>Danh sách artists</h1>
                <table>
                    <thead>
                        <tr><th>#</th><th></th><th>First Name</th><th>Last Name</th><th>Nationality</th><th>Born</th><th>Died</th><th>Age</th></tr>
                    </thead>
                    <tbody>
                        <ArtistRow data={_artists} onSelectedRow={(rows) => {
                            console.log(`console from property${new Date()}`)
                            this.onSelectedRow(rows)
                        }} />
                    </tbody>
                    <tfoot><tr>
                        <th colSpan={2}><h4>{_length}/{_count} artists</h4></th>
                        <th colSpan={6}>
                            {
                                pages.map((p) => {
                                    return <input type={'button'} onClick={(e) => this.navigate({ skip: (p - 1) * 5, take: 5 })} value={p} />
                                })
                            }
                            {/* <input type={'button'} onClick={(e) => this.navigate({ skip: 0, take: 5 })} value="1" />
                            <input type={'button'} onClick={(e) => this.navigate({ skip: 5, take: 5 })} value="2" /> */}
                        </th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

class ArtistRow extends Component {
    constructor(props) {
        super(props)
        this.data = props.data;
        this.selectedRows = []
        this.onSelectedRow = props.onSelectedRow
    }
    selectRow = (r) => {
        if (this.selectedRows.indexOf(r) >= 0) this.selectedRows = this.selectedRows.filter(t => t !== r)
        else this.selectedRows.push(r)
        console.log("console from children component", this.selectedRows)
        this.onSelectedRow(this.selectedRows)
    }
    render() {
        return this.data.map((row) =>
            <tr key={`${row._id}`}>
                <td><Link to={`/artists/details/${row._id}/${row.year_born}`} id={`${row._id}`}>{this.data.indexOf(row) + 1}</Link></td><td><input type="checkbox" onChange={(e) => {
                    this.selectRow(row);
                }}></input></td><td>{row.first_name}</td><td>{row.last_name}</td><td>{row.nationality}</td><td>{row.year_born}</td><td>{row.year_died}</td><td>{row.year_died ? row.year_died - row.year_born : 102}</td>
            </tr>
        );
    }
}