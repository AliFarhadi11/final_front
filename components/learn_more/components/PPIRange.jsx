import React from "react";

const PPIRange = ({ title, progress, value }) => {
    return (
        <div className="ppi-range-wrapper">
            <p className="learn-more-font-medium">{title}</p>
            <div className="ppi-range">
                <div style={{ width: `${progress}%` }}>
                    <span className="learn-more-font-medium">{value}</span>
                </div>
            </div>
        </div>
    );
};

export default PPIRange;
