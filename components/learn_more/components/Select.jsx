
import { useSelector } from "react-redux";


const Select = ({ label, optionsList, defaultValue }) => {
    const contorlers = useSelector((state) => state.contorlers.value)
    return (
        <div
            className="learn-more-select md:col-span-3 relative md:max-w-[205px] col-span-9"
            style={{ marginRight: contorlers.lang === 'fa' ? '100px' : 0 }}
        >
            <p className="learn-more-font-semibold">{label} :</p>
            <div>
                <span className="learn-more-font-medium">{defaultValue}</span>
                <img src={'/images/assets/chevron_down.svg'} alt="chevron_down" />
            </div>

            <ul
                style={{
                    marginLeft: 0,
                    paddingLeft: 0,
                }}

            >
                {optionsList.map((option) => (
                    <li
                        key={option.id}
                        className="option-item learn-more-font-medium"
                    >
                        {option.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;
