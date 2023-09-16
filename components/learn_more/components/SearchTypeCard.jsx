const SearchTypeCard = ({ icon, className, text, iconBg }) => {
    return (
        <div className={`search-type-card ${className} transition-03`}>
            <div className={`${iconBg}`}>
                <img src={icon} alt={text} />
            </div>
            <p className="learn-more-font-medium">{text}</p>
        </div>
    );
};

export default SearchTypeCard;
