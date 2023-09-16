import { home, chevron_right } from "../assets";

const BreadCrumb = () => {
    return (
        <div className="learn-more-bread-crumb">
            <img src={home} alt="home" />
            <span className="bread-crumb-gray">Home</span>
            <img src={chevron_right} alt="chevron_right" />
            <span className="bread-crumb-blue">learn more</span>
        </div>
    );
};

export default BreadCrumb;
