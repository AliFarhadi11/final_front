import { useSwiper } from "swiper/react";
import Image from "next/image";
import prev_icon from "../public/images/prev_icon.svg";
import next_icon from "../public/images/next_icon.svg";

const SliderNavigation = () => {
    const swiper = useSwiper();

    return (
        <div className="d-flex align-items-center gap-2 mt-3">
            <button onClick={() => swiper.slidePrev()} className="slider-navigation prev">
                <Image src={prev_icon} width="auto" height="auto" alt="prev" />
            </button>
            <button onClick={() => swiper.slideNext()} className="slider-navigation next">
                <Image src={next_icon} width="auto" height="auto" alt="next" />
            </button>
        </div>
    );
};

export default SliderNavigation;
