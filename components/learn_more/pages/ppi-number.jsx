import ContentTitle from "../components/ContentTitle";
import DefensivePPI from "../components/DefensivePPI";
import OffensivePPI from "../components/OffensivePPI";

const PPINumber = () => {
    return (
        <div>
            <ContentTitle text={"Preference your decision by selecting a PPI and number"} />

            <div className="learn-more-ppinumber pb-8">
                <DefensivePPI />
                <OffensivePPI />
            </div>
        </div>
    );
};

export default PPINumber;
