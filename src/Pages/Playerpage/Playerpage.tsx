import Slider from '../../components/Slider/Slider';
import WatchflixPlayer from '../../components/WatchflixPlayer/WatchflixPlayer';
import './Playerpage.scss';

const Playerpage = () => {
    return (
        <div className="Playerpage">
            <WatchflixPlayer />
            <Slider isLarge={false}></Slider>
        </div>
    )
}

export default Playerpage;