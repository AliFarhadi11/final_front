import PPIRange from "./PPIRange";

const DefensivePPI = () => {
    const rangesData = [
        {
            id: 1,
            title: "Block",
            progress: "30",
            value: "2",
        },
        {
            id: 2,
            title: "Press",
            progress: "20",
            value: "1",
        },
        {
            id: 3,
            title: "Tackle",
            progress: "50",
            value: "5",
        },
    ];

    return (
        <div className="ppi-wrapper">
            <div className="ppi-wrapper-title">
                <h3 className="learn-more-font-semibold">Defensive Action</h3>
                <span>-</span>
            </div>
            {rangesData.map((range) => (
                <PPIRange title={range.title} progress={range.progress} value={range.value} key={range.id} />
            ))}
        </div>
    );
};

export default DefensivePPI;
