import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addInfoInputs, } from "../../redux/reducers";

const RangeSlider = ({ distance, min, max, target, values }) => {
    const dispatch = useDispatch()

    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < distance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 1000 - distance);
                dispatch(addInfoInputs({ [target]: [clamped, clamped + distance] }))
            } else {
                const clamped = Math.max(newValue[1], distance);
                dispatch(addInfoInputs({ [target]: [clamped - distance, clamped] }))

            }
        } else {
            dispatch(addInfoInputs({ [target]: newValue }))

        }

    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                <input
                    className="form-control"
                    type="number"
                    value={values[0]}
                    min={min}
                    max={max}
                    onChange={(e) => dispatch(addInfoInputs({ [target]: [parseInt(e.target.value), values[1]] }))}
                />
                -
                <input
                    className="form-control"
                    type="number"
                    value={values[1]}
                    min={min}
                    max={max}
                    onChange={(e) => dispatch(addInfoInputs({ [target]: [values[0], parseInt(e.target.value)] }))}

                />
            </div>

            <Slider
                getAriaLabel={() => "Minimum distance shift"}
                value={values}
                onChange={handleChange2}
                min={min}
                max={max}
                valueLabelDisplay="auto"
                disableSwap
            />
        </>
    );
};

export default RangeSlider;
