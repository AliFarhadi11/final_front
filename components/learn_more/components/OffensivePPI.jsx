import PPIRange from "./PPIRange";

const DefensivePPI = () => {
    const rangesData = [
        {
            id: 1,
            title: "Goals",
            progress: "50",
            value: "5",
        },
        {
            id: 2,
            title: "Dribble",
            progress: "80",
            value: "8",
        },
        {
            id: 3,
            title: "Penalty Made",
            progress: "25",
            value: "2",
        },
    ];

    return (
        <div className="ppi-wrapper">
            <div className="ppi-wrapper-title">
                <h3 className="learn-more-font-semibold">Offensive Action</h3>
                <span>-</span>
            </div>
            {rangesData.map((range) => (
                <PPIRange title={range.title} progress={range.progress} value={range.value} key={range.id} />
            ))}
        </div>
    );
};

export default DefensivePPI;
