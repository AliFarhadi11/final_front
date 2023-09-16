import ContentTitle from "../components/ContentTitle";
import Select from "../components/Select";

const FilterOptions = () => {
    const positionList = [
        { id: 1, text: "Defender" },
        { id: 2, text: "Midfielder" },
        { id: 3, text: "Attacker" },
    ];

    const leagueList = [
        { id: 1, text: "Serie A" },
        { id: 2, text: "La Liga" },
        { id: 3, text: "Bundesliga" },
    ];

    const seasonList = [
        { id: 1, text: "2019-20" },
        { id: 2, text: "2020-21" },
        { id: 3, text: "2021-22" },
    ];

    return (
        <div>
            <ContentTitle text={"Add basic filters option"} />

            <div className="learn-more-selects-wrapper">
                <Select label={"Position"} optionsList={positionList} defaultValue={"Defender"} />
                <Select label={"League"} optionsList={leagueList} defaultValue={"Serie A"} />
                <Select label={"Season"} optionsList={seasonList} defaultValue={"2019-20"} />
            </div>
        </div>
    );
};

export default FilterOptions;
