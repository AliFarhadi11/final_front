import ContentTitle from "../components/ContentTitle";
import DuelsWrapper from "../components/DuelsWrapper";

const Duels = () => {
    return (
        <div>
            <ContentTitle text={"Preference your decision by selecting a number"} />

            <div className="learn-more-duels">
                <div>
                    <h2>Aerial Duels</h2>

                    <div className="importance-wrapper">
                        <div>
                            <p className="learn-more-font-medium">Most Importance</p>
                            <p className="learn-more-font-medium">1</p>
                        </div>
                        <div className="bg-white px-3 rounded-lg md:w-[148px] w-full h-[148px] flex flex-col items-center justify-start py-5 cursor-pointer hover:bg-slate-200 transition-all">
                            <p className="learn-more-font-medium">Least Importance</p>
                            <p className="learn-more-font-medium">9</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Duels;
