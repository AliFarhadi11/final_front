import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import { HomeBtn, MyMessages } from "../components";
import "../styles/index.module.css";
import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { controllers } from "chart.js";
import { dellUser } from "../redux/reducers";
import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SliderNavigation from "../components/SliderNavigation";

import "swiper/css";
import hero_divider from "../public/images/hero_divider.svg";
import player_rating_icon from "../public/images/player_rating_icon.svg";
import player_info_icon from "../public/images/player_info_icon.svg";
import player_search_icon from "../public/images/player_search_icon.svg";
import players_icon from "../public/images/players_icon.svg";
import coach_icon from "../public/images/coach_icon.svg";
import club_icon from "../public/images/club_icon.svg";
import agent_icon from "../public/images/agent_icon.svg";
import fans_icon from "../public/images/fans_icon.svg";
import more_icon from "../public/images/more_icon.svg";
import login_icon from "../public/images/dark_login_icon.svg";
import threed_info_system from "../public/images/3d_info_system.png";
import dark_login_icon from "../public/images/dark_login_icon.svg";
import threed_finding_system from "../public/images/3d_finding_system.png";
import feedback_divider from "../public/images/feedback_divider.svg";
import feedback from "../public/images/feedback.png";
import filled_star from "../public/images/filled_star.svg";



import threed_rating_system from "../public/images/3d_rating_system.png";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";

export default function Home() {
    const contorlers = useSelector((state) => state.contorlers.value);
    const dispatch = useDispatch();
    let router = useRouter();

    const myLoader = ({ src }) => {
        return `${contorlers.url}${src}`
    }

    const [show_email_changed, setShow_email_changed] = useState(false)
    useEffect(() => {
        if (router.query['email_chabged'] && router.query['email_chabged'] === 'successfully') {

            setShow_email_changed(true)
            dispatch(dellUser())
        }
    }, [router])

    return (
        <>
            <Head>
                <meta name="robots" content="noindex,nofollow" />
                <title>NEW ERA TO FIND THE BEST PLAYER</title>
                <title>
                    {" "}
                    {contorlers.lang === "fa"
                        ? "انتخاب بازیکنان برتر فوتبال"
                        : "NEW ERA TO FIND THE BEST PLAYER"}{" "}
                </title>
                <meta
                    name="description"
                    content={
                        contorlers.lang === "fa"
                            ? "انتخاب بازیکنان برتر فوتبال"
                            : "NEW ERA TO FIND THE BEST PLAYER"
                    }
                />
                <meta property="og:url" content="https://playerscube.com/" />
            </Head>

            <main>



                {/* Hero Section - New ERA */}
                <section className="hero">
                    <MyMessages
                        transition='f'
                        max_width='sm'
                        full_screen={false}
                        hide_backdrop={false}
                        title={<FormattedMessage id='authentication.email_changed' />}
                        setShowMessage={setShow_email_changed}
                        showMessage={show_email_changed}

                    >
                        <Grid2 item xs={12}   >
                            <Typography variant='h6' align="justify"
                                sx={{ m: 2, }}  >
                                <FormattedMessage id='authentication.email_changed1' />
                                <FormattedMessage id='authentication.email_changed2' />
                            </Typography>
                        </Grid2>
                    </MyMessages>
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1 className="font-gilroy-semibold">new era to find the best player</h1>
                        <p className="font-gilroy-medium">
                            {/* Join us and let’s take Football into the future together */}
                            Join us and let's together propel football into the future
                        </p>
                        <div className="text-animation mt-3 d-flex align-items-center justify-content-center gap-4">
                            {/* <p className="font-gilroy-medium">Player</p> */}
                            <div className="changing-text-container">
                                <div className="changing-text-inner">
                                    <p className="font-gilroy-bold">Player Information System</p>
                                    <p className="font-gilroy-bold">Player Rating System</p>
                                    <p className="font-gilroy-bold">Player Finding System</p>
                                </div>
                            </div>
                        </div>
                        <div className="cta-wrapper mt-4 mb-3 d-flex align-items-center justify-content-center ">
                            <Link href="learn-more" className="cta-link">
                                <span>Learn More</span>
                                <Image src={more_icon} alt="more" width="auto" height="auto" />
                            </Link>
                        </div>
                    </div>

                    <div className="player-systems px-2">
                        <div className="player-system-box">
                            <h5>PlayersCube</h5>
                            <Image
                                src={threed_info_system}
                                alt="3d_info_system"
                                className="box-img"
                                width="auto"
                                height="auto"
                            />
                            <p>Player Information System</p>

                            <Link href="player-information-system" className="box-cta">
                                <span>Get Started</span>
                                <Image src={dark_login_icon} alt="get_started" width="auto" height="auto" />
                            </Link>
                        </div>
                        <div className="player-system-box">
                            <h5>PlayersCube</h5>
                            <Image
                                src={threed_rating_system}
                                alt="3d_rating_system"
                                className="box-img"
                                width="auto"
                                height="auto"
                            />
                            <p>Player Rating System</p>

                            <Link href="player-rating-system" className="box-cta">
                                <span>Get Started</span>
                                <Image src={dark_login_icon} alt="get_started" width="auto" height="auto" />
                            </Link>
                        </div>
                        <div className="player-system-box">
                            <h5>PlayersCube</h5>
                            <Image
                                src={threed_finding_system}
                                alt="3d_info-threed_finding_system"
                                className="box-img"
                                width="auto"
                                height="auto"
                            />
                            <p>Player Finding System</p>

                            <Link href="player-finding-system" className="box-cta">
                                <span>Get Started</span>
                                <Image src={dark_login_icon} alt="get_started" width="auto" height="auto" />
                            </Link>
                        </div>
                    </div>

                    {/* Divider */}
                    <Image
                        src={hero_divider}
                        alt="hero_divider"
                        className="divider hero-divider"
                        width="auto"
                        height="auto"
                    />
                </section>
                {/* Features Section - Best FEATURES */}
                <section className="features">
                    <h2 className="section-title font-gilroy-bold text-center">Some of the best features</h2>

                    <div className="features-cards container-sm">
                        <div className="feature-card">
                            <Image
                                src={player_rating_icon}
                                alt="player_rating_icon"
                                width="auto"
                                height="auto"
                            />
                            <h3 className="font-gilroy-semibold">Player Rating System</h3>
                            <p className="font-gilroy-medium">
                                {/* This platform compares players based on their pitch position and their
                                performance statistics. */}
                                "This platform individually assesses players by considering their field position and performance statistics, delivering an equitable rating."
                            </p>
                        </div>
                        <div className="feature-card">
                            <Image src={player_info_icon} alt="player_info_icon" width="auto" height="auto" />
                            <h3 className="font-gilroy-semibold">Player Information system</h3>
                            <p className="font-gilroy-medium">
                                {/* Get complete professional Reports including all the statics you need. */}
                                "To locate the desired player, simply apply your filters and view the players that match your criteria."
                            </p>
                        </div>
                        <div className="feature-card">
                            <Image
                                src={player_search_icon}
                                alt="player_search_icon"
                                width="auto"
                                height="auto"
                            />
                            <h3 className="font-gilroy-semibold">Player Finding System</h3>
                            <p className="font-gilroy-medium">
                                {/* Based on your expertise and needs, player performances are categorized and will
                                find the best results. */}
                                "Discover players tailored to your needs. Simply input the criteria important for your selection into the system, and find players closely aligned with your preferences."
                            </p>
                        </div>
                    </div>

                </section>
                {/* HowWork Section */}
                <section className="how-work">
                    {/* Divider */}

                    <div className="how-work-content container-sm">
                        {/* Content */}
                        <div className="content">
                            <h2 className="font-gilroy-bold content-title">
                                {/* How Work Player System? */}
                                How Does the Player System Work?
                            </h2>
                            <p className="font-gilroy-medium">
                                {/* Know your needs and use our systems. You can view General player information or
                                compare players based on your desired filters. You can see the new Rating
                                evaluation and find the best. In the finding system preference important
                                performance index and find your favorite player among thousands of players. It
                                is an intelligent system that provides advanced search. Welcome to the world of
                                football with us. */}
                                1. Identify Your Needs: Understand your requirements and preferences.<br/>
                                2. System Usage: Utilize our platform to its full potential.<br/>
                                3. General Player Information: Access comprehensive player profiles.<br/>
                                4. Player Comparison: Compare players using your preferred filters.<br/>
                                5. New Rating Evaluation: Explore our latest rating system.<br/>
                                6. Finding the Best: Identify top players with ease.<br/>
                                7. Preferences Matter: Prioritize the performance index in your search.<br/>
                                8. Find Your Favorite: Select from thousands of players.<br/>
                                9. Advanced Search: Benefit from our intelligent search capabilities.<br/>
                                Join us in the exciting world of football
                            </p>
                            <div className="cta-wrapper mt-4 mb-4 d-flex align-items-center justify-content-center gap-4">
                                <Link href="#" className="cta-link">
                                    <span>Get Started</span>
                                    <Image src={login_icon} alt="get_started" width="20" height="20" />
                                </Link>
                                <Link href="learn-more" className="cta-link">
                                    <span>Learn More</span>
                                    <Image src={more_icon} alt="more" width="20" height="20" />
                                </Link>
                            </div>
                        </div>
                        {/* Image */}
                        <Image
                            src='https://playerscubestore.storage.iran.liara.space/images/how_work_final.png'
                            alt="how_work"
                            width="525"
                            height="525"
                            className="how-work-img"
                        />
                    </div>
                </section>
                {/* HowFind Section */}
                <section className="how-find">
                    <div className="how-find-content container-sm">
                        {/* 3D Carousel */}
                        <div className="carousel-container">
                            <div className="carousel">
                                <div className="carousel-image"></div>
                                <div className="carousel-image"></div>
                                <div className="carousel-image"></div>
                                <div className="carousel-image"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="content">
                            <h2 className="font-gilroy-bold content-title">
                                {/* how can you find? */}
                                What can you discover?
                                </h2>
                            <p className="font-gilroy-medium">
                                {/* Know your needs and use our systems. You can view General player information or
                                compare players based on your desired filters. You can see the new Rating
                                evaluation and find the best. In the finding system preference important
                                performance index and find your favorite player among thousands of players. It
                                is an intelligent system that provides advanced search. Welcome to the world of
                                football with us. */}
                                "Explore what the player system offers: Understand your needs and utilize our system.
                                You can access general player information or compare players using your preferred filters.
                                Discover our new rating evaluation to find the best matches. Within the system, prioritize
                                important performance indices to locate your favorite player from our extensive database of thousands.
                                Our intelligent system offers advanced search capabilities. Welcome to the world of football with us."
                            </p>
                            <div className="cta-wrapper mt-4 mb-4 d-flex align-items-center justify-content-start gap-4">
                                <Link href="#" className="cta-link">
                                    <span>Get Started</span>
                                    <Image src={login_icon} alt="get_started" width="auto" height="auto" />
                                </Link>
                                <Link href="learn-more" className="cta-link">
                                    <span>Learn More</span>
                                    <Image src={more_icon} alt="more" width="auto" height="auto" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/* DesignedFor Section */}
                <section className="designed-for">
                    <h2 className="section-title font-gilroy-bold text-center">DESIGNED FOR</h2>

                    <div className="designed-for-content container-sm">
                        <div className="designed-for-item">
                            <Image src={players_icon} alt="players_icon" width="auto" height="auto" />
                            <p className="font-gilroy-medium">player</p>
                        </div>
                        <div className="designed-for-item">
                            <Image src={coach_icon} alt="coach_icon" width="auto" height="auto" />
                            <p className="font-gilroy-medium">coach</p>
                        </div>
                        <div className="designed-for-item">
                            <Image src={club_icon} alt="club_icon" width="auto" height="auto" />
                            <p className="font-gilroy-medium">club</p>
                        </div>
                        <div className="designed-for-item">
                            <Image src={agent_icon} alt="agent_icon" width="auto" height="auto" />
                            <p className="font-gilroy-medium">agent</p>
                        </div>
                        <div className="designed-for-item">
                            <Image src={fans_icon} alt="fans_icon" width="auto" height="auto" />
                            <p className="font-gilroy-medium">football fan</p>
                        </div>
                    </div>
                </section>
                {/* FeedBack Section */}
                <section className="feedbacks">
                    <h2 className="section-title text-center font-gilroy-semibold text-white text-uppercase mb-5">
                        Your Feedback
                    </h2>

                    <div className="container-md">
                        <Swiper
                            modules={[Navigation, A11y]}
                            breakpoints={{
                                480: {
                                    slidesPerView: 2,
                                },
                                680: {
                                    slidesPerView: 3,
                                },
                                968: {
                                    slidesPerView: 4,
                                },
                            }}
                            spaceBetween={50}
                            slidesPerView={1}
                            centeredSlides={false}
                            navigation
                        >
                            <SwiperSlide>
                                <Image src={feedback} alt="feedback" width="auto" height="auto" />
                                <h6>Nina Kari</h6>

                                <div className="d-flex justify-content-center align-items-center gap-1">
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image src={feedback} alt="feedback" width="auto" height="auto" />
                                <h6>Nina Kari</h6>

                                <div className="d-flex justify-content-center align-items-center gap-1">
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image src={feedback} alt="feedback" width="auto" height="auto" />
                                <h6>Nina Kari</h6>

                                <div className="d-flex justify-content-center align-items-center gap-1">
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image src={feedback} alt="feedback" width="auto" height="auto" />
                                <h6>Nina Kari</h6>

                                <div className="d-flex justify-content-center align-items-center gap-1">
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image src={feedback} alt="feedback" width="auto" height="auto" />
                                <h6>Nina Kari</h6>

                                <div className="d-flex justify-content-center align-items-center gap-1">
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image src={feedback} alt="feedback" width="auto" height="auto" />
                                <h6>Nina Kari</h6>

                                <div className="d-flex justify-content-center align-items-center gap-1">
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image src={feedback} alt="feedback" width="auto" height="auto" />
                                <h6>Nina Kari</h6>

                                <div className="d-flex justify-content-center align-items-center gap-1">
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Image src={feedback} alt="feedback" width="auto" height="auto" />
                                <h6>Nina Kari</h6>

                                <div className="d-flex justify-content-center align-items-center gap-1">
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                    <Image src={filled_star} alt="filled_star" width="auto" height="auto" />
                                </div>
                            </SwiperSlide>

                            <SliderNavigation />
                        </Swiper>
                    </div>

                    {/* Divider */}
                    <Image
                        src={feedback_divider}
                        alt="feedback_divider"
                        className="divider feedbacks-divider"
                        width="auto"
                        height="auto"
                    />
                </section>
            </main>
        </>
    );
}
