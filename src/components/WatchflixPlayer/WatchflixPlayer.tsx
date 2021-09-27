import { Button } from "@material-ui/core";
import PlayerContainer from "griffith";
import { Movie } from "../../models/movie.interface";
import { logEvent } from "../../utils/utils";
import './WatchflixPlayer.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../redux/rootReducer";
import { addToWatchlistAsync, removeFromWatchlistAsync } from "../../redux/watchlist/watchlist.actions";
import SkeletonElement from "../SkeletonElement/SkeletonElement";

interface IWatchflixPlayerProps {
    playerData: {
        loading: boolean;
        error: string;
        data: Movie | null;
    };
}

const WatchflixPlayer: React.FunctionComponent<IWatchflixPlayerProps> = (props) => {
    const dispatch = useDispatch();

    const watchlist = useSelector(
        (state: RootState) => state.watchlist
    );
    const hasAddedinWatchlist = watchlist.filter(w => w.entityId === props.playerData.data?._id).length > 0

    const handleAdd = (event: any) => {
        event.stopPropagation();
        dispatch(addToWatchlistAsync('/watch-list/', { entityId: props.playerData.data?._id, user: localStorage.getItem("user"), entity: 'movies' }));
    };
    const handleRemove = (event: any) => {
        event.stopPropagation();
        const addedList = watchlist.find((w) => w.entityId === props.playerData.data?._id)
        dispatch(removeFromWatchlistAsync(`/watch-list/${addedList._id}`, addedList._id))
    };
    if (props.playerData.data) {
        const { title, rated, imdbRating, yearOfRelease, plot, images, videoMain, genres } = (props.playerData.data as Movie)
        const thumbNail = images[0].location.cloudFrontUrl
        const autoVideoUrl = videoMain.destinationLocation.location.cloudFrontUrl

        const sources = {
            Auto: {
                format: 'm3u8',
                play_url: autoVideoUrl,
            },
            hd: {
                format: 'm3u8',
                play_url:
                    'https://d3dr7atq7iqw02.cloudfront.net/48626d63-e362-4233-9f2f-f2c3f4c916b1/AppleHLS1/videoplayback_Ott_Hls_Ts_Avc_Aac_16x9_1280x720p_6.0Mbps_qvbr.m3u8',
            },

        }

        const playerProps = {
            id: 'test-hls-video',
            title: `WatchFlix - ${title}`,
            standalone: true,
            cover: thumbNail,
            sources,
            shouldObserveResize: true,
            autoplay: false,
            onEvent: logEvent,
        }

        return (
            <div className="WatchflixPlayer">
                <div className="WatchflixPlayer__Player">
                    <PlayerContainer {...playerProps} />
                </div>
                <div className="WatchflixPlayer__Info">
                    <div className="WatchflixPlayer__Info--title">
                        <h3>{title}</h3>
                    </div>
                    <div className="WatchflixPlayer__Info--genres">
                        {genres && genres.map(genre => (
                            <span key={`Genre--id_${genre._id}`} className="genre-title">{genre.title}</span>
                        ))}
                        <span className="genre-title">{yearOfRelease}</span>
                        <span className="genre-title">{rated}</span>
                        <span className="genre-title">Rating: {imdbRating}</span>
                    </div>
                    <p>{plot}</p>
                </div>
                <div className="WatchflixPlayer__MovieOptions">
                    {!hasAddedinWatchlist ?
                        <Button variant="outlined" color="primary" onClick={handleAdd} >+ Add to my list</Button> :
                        <Button variant="contained" color="primary" onClick={handleRemove} >- Remove from my list</Button>}
                </div>
            </div>
        )
    } else {
        return (
            <div className="Skeleton__Player">
                <SkeletonElement type="player"></SkeletonElement>
                <SkeletonElement type="title"></SkeletonElement>
                <SkeletonElement type="text"></SkeletonElement>
                <SkeletonElement type="text"></SkeletonElement>
                <SkeletonElement type="button"></SkeletonElement>
            </div>
        )
    }
}

export default WatchflixPlayer