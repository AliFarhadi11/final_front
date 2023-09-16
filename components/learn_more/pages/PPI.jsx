import ContentTitle from "../components/ContentTitle";
import Select from "../components/Select";

const Ppi = () => {
    const defensiveList = [
        { id: 1, text: "Tackle" },
        { id: 2, text: "Block" },
        { id: 3, text: "..." },
    ];

    const offensiveList = [
        { id: 1, text: "Dribble" },
        { id: 2, text: "Goals" },
        { id: 3, text: "..." },
    ];

    const passingList = [
        { id: 1, text: "Assists" },
        { id: 2, text: "Cross" },
        { id: 3, text: "..." },
    ];

    return (
        <div>
            <ContentTitle text={"Add PPI"} />

            <div className="learn-more-selects-wrapper">
                <Select label={"Defensive Action"} optionsList={defensiveList} defaultValue={"Block"} />
                <Select label={"Offensive Action"} optionsList={offensiveList} defaultValue={"Goals"} />
                <Select label={"Passing"} optionsList={passingList} defaultValue={"Cross"} />
            </div>
        </div>
    );
};

export default Ppi;
