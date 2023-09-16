const ImagesFrame = () => {
    return (
        <div className="learn-more-imgs-frame">
            <img src={'/images/assets/union.svg'} alt="union" className="imgs-frame-union" />
            <img src={'/images/assets/players_table.png'} alt="players_table" className="imgs-frame-img top " />
            <img
                src={'/images/assets/player_general_information.png'}
                alt="player_general_information"
                className="imgs-frame-img mid "
            />
            <img
                src={'/images/assets/player_season_information.png'}
                alt="player_season_information"
                className="imgs-frame-img bottom"
            />
        </div>
    );
};

export default ImagesFrame;
