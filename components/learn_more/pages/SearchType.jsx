import ContentTitle from "../components/ContentTitle";
import SearchTypeCard from "../components/SearchTypeCard";

const SearchType = () => {
    return (
        <div>
            <ContentTitle text={"Open the system"} />
            <div className="search-type-title">
                <h3 className="learn-more-font-semibold">Please Select Search Type</h3>
                <div className="search-type-cards-wrapper">
                    <SearchTypeCard
                        icon={'/images/assets/exclamation_mark.svg'}
                        text={"Player Informatin System"}
                        iconBg={"circle-light"}
                        className={"white"}
                    />
                    <SearchTypeCard
                        icon={'/images/assets/chart_rating.svg'}
                        text={"Player Rating System"}
                        className={"gradient"}
                        iconBg={"circle-transparent"}
                    />
                    <SearchTypeCard
                        icon={'/images/assets/search.svg'}
                        text={"Player Finding System"}
                        iconBg={"circle-light"}
                        className={"white"}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchType;
