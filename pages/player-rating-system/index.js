import React, { useEffect, useState } from "react";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Slider,
    Select,
    MenuItem,
    Button,
    Grid,
    Stack,
    Pagination,
    Typography,
    Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { requestPreData, requestPlayerRating } from "../../request_services/PlayersService";
import {
    addRatingInputs,
    addLeagues,
    addSeasons,
    addClubs,
    addPlayerRating,
    addContorlers,
} from "../../redux/reducers";
import { isNumber, toInteger } from "lodash";
import {
    PlayersTable,
    PlayerCard,
    ViewModeSelection,
    StyledFormControl,
    CountrySelection,
    SiteRoad,
    ClubSelection,
} from "../../components";
import Head from "next/head";
import { FormattedMessage } from "react-intl";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useRouter } from "next/router";
import BreadCrumbSearchBox from "../../components/layout/BreadCrumbSearchBox";
import checkbox from "../../public/images/checkbox.svg";
import checked_checkbox from "../../public/images/checked_checkbox.svg";
import arrow_down from "../../public/images/arrow_down.svg";
import { useRef } from "react";
import RangeSlider from "../../components/layout/RangeSlider";
import { countries } from "../../countries.js";
import Image from "next/image";

export default function PlayerRatingSystem() {
    let router = useRouter();
    const dispatch = useDispatch();
    const player_rating = useSelector((state) => state.player_rating.value);
    const leagues = useSelector((state) => state.leagues.value);
    const seasons = useSelector((state) => state.seasons.value);
    const clubs = useSelector((state) => state.clubs.value);
    const inputs_rating = useSelector((state) => state.inputs_rating.value);
    const inputs_information = useSelector((state) => state.inputs_information.value);
    const contorlers = useSelector((state) => state.contorlers.value);
    const [locale, setLocal] = useState(router.locale);
    const [league_type, setLeague_type] = useState("League");
    const [title, setTitle] = useState({
        position: "",
        season: "",
    });
    const [positionDetail, setPositionDetail] = useState(["All"]);
    const [position, setPosition] = useState("DF");

    console.log(inputs_rating);

    const [message, setMessage] = useState(
        <Typography
            variant="title6"
            sx={{
                fontFamily: "title1",
                fontSize: "26px",
                mt: "30vh",
                mb: "71vh",
                lineHeight: 1.57,
                letterSpacing: "0.00714em",

                background: "linear-gradient(92.82deg, #2c97de 1.47%, #14459f 99.06%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                BackgroundClip: "text",
                "-webkit-text-fill-color": "transparent",
                TextShadow: "5px 5px 5px rgba(22, 37, 63, 0.25)",
            }}
            align="center"
            // sx={styles.title}
        >
            <FormattedMessage id="PRS.wellcome1" /> <br />
            <FormattedMessage id="PRS.wellcome2" />
        </Typography>
    );
    useEffect(() => {
        let pos = ["All"];
        if (inputs_rating.position === "DF") {
            pos = [...pos, "Right Back", "Left Back", "Center Back"];
        }
        if (inputs_rating.position === "MF") {
            pos = [...pos, "Defensive Midfield", "Central Midfield", "Attacking Midfield"];
        }
        if (inputs_rating.position === "FW") {
            pos = [...pos, "Right Winger", "Left Winger", "Center Forward", "Second Striker"];
        }
        setPositionDetail(pos);
        dispatch(addRatingInputs({ position_detail: "All" }));
    }, [inputs_rating.position]);

    // send parameters to backend for create list
    const handleFilter = () => {
        //check to null season
        if (isNumber(inputs_rating.season.id)) {
            const inputs = {
                position: inputs_rating.position,
                position_detail: inputs_rating.position_detail,
                league: inputs_rating.league,
                club: inputs_rating.club.id,
                min_age: inputs_rating.min_age,
                max_age: inputs_rating.max_age,
                season: inputs_rating.season.id,
                Nation: inputs_rating.Nation.tag,
            };
            handleGetDetails(inputs);
        } else {
            dispatch(
                addContorlers({
                    snackbar: {
                        state: true,
                        message: "Please select a season",
                        severity: "warning",
                    },
                })
            );
        }
    };

    const handlePageChange = (event, value) => {
        dispatch(
            addContorlers({
                rating_data_current_pages: value,
                rating_data_start_item: (value - 1) * 9,
                rating_data_end_item: value * 9,
            })
        );
    };

    const handleGetDetails = async (inputs) => {
        try {
            const { status, data } = await requestPlayerRating(inputs);
            if (status === 200) {
                //set position and season in title of searching
                let position = "";
                let ses = "";
                if (inputs_rating.position == "DF") position = <FormattedMessage id="PRS.title20" />;
                else if (inputs_rating.position == "MF") position = <FormattedMessage id="PRS.title21" />;
                else if (inputs_rating.position == "FW") position = <FormattedMessage id="PRS.title22" />;
                seasons.map((item) => {
                    if (item.id == inputs_rating.season) ses = item.title;
                });
                setTitle({
                    ...title,
                    position: position,
                    season: ses,
                });

                let count_page = data.length / 9;
                if (count_page > toInteger(data.length / 9)) {
                    count_page = toInteger(data.length / 9) + 1;
                } else {
                    count_page = toInteger(data.length / 9);
                }
                // set settings of pagination in redux
                dispatch(
                    addContorlers({
                        rating_data_length: data.length,
                        rating_data_pages: count_page,
                        rating_data_current_pages: 1,
                        rating_data_start_item: 0,
                        rating_data_end_item: 9,
                    })
                );
                // set Player Rating list in redux
                dispatch(addPlayerRating(data));
                if (data.length <= 0) {
                    setMessage(
                        <>
                            <Typography
                                variant="title6"
                                sx={{
                                    fontSize: "30px",
                                    mt: "30vh",
                                    mb: "1vh",
                                    lineHeight: 1.57,
                                    letterSpacing: "0.00714em",
                                    background: "linear-gradient(92.82deg, #2c97de 1.47%, #14459f 99.06%)",
                                    "-webkit-background-clip": "text",
                                    "-webkit-text-fill-color": "transparent",
                                    BackgroundClip: "text",
                                    "-webkit-text-fill-color": "transparent",
                                    TextShadow: "5px 5px 5px rgba(22, 37, 63, 0.25)",
                                }}
                                align="center">
                                <FormattedMessage id="PRS.notfound1" />
                            </Typography>
                            <Typography
                                variant="title6"
                                sx={{
                                    fontSize: "30px",
                                    mt: "2vh",
                                    mb: "65vh",
                                    lineHeight: 1.57,
                                    letterSpacing: "0.00714em",
                                    background: "linear-gradient(92.82deg, #2c97de 1.47%, #14459f 99.06%)",
                                    "-webkit-background-clip": "text",
                                    "-webkit-text-fill-color": "transparent",
                                    BackgroundClip: "text",
                                    "-webkit-text-fill-color": "transparent",
                                    TextShadow: "5px 5px 5px rgba(22, 37, 63, 0.25)",
                                }}
                                align="center">
                                <FormattedMessage id="PRS.notfound2" />
                            </Typography>
                        </>
                    );
                }
            }
        } catch (ex) {}
    };

    const handleChangeClub = (e) => {
        if (e.target.value) {
            dispatch(
                addRatingInputs({
                    club: { id: e.target.id, club: e.target.value },
                })
            );
        } else {
            dispatch(
                addRatingInputs({
                    club: { id: "All", club: "All" },
                })
            );
        }
    };

    const handleChangeNation = (e) => {
        if (e.target.value) {
            dispatch(
                addRatingInputs({
                    Nation: { code: e.target.id, tag: e.target.value, label: e.target.value },
                })
            );
        } else {
            dispatch(
                addRatingInputs({
                    Nation: { code: "All", tag: "All", label: "All" },
                })
            );
        }
    };

    const handleInputsData = (e) => {
        dispatch(
            addRatingInputs({
                [e.target.dataset.name]: e.target.value,
            })
        );
    };

    // Pre data is contain: seasons and leagues and Clubs
    const handleGetPreData = async (event) => {
        try {
            const { status, data } = await requestPreData();
            if (status === 200) {
                dispatch(addLeagues(data.leagues));
                dispatch(
                    addSeasons(
                        data.seasons.sort(function (a, b) {
                            return b.id - a.id;
                        })
                    )
                );
                dispatch(addClubs(data.clubs));
                dispatch(
                    addRatingInputs({
                        season: data.seasons[0].id,
                    })
                );
            }
        } catch (ex) {}
    };

    const minDistance = 3;
    const handleChangeAge = (event) => {
        if (event.target.id === "max_age") {
            if (event.target.value > inputs_rating.min_age + minDistance)
                dispatch(
                    addRatingInputs({
                        max_age: event.target.value,
                    })
                );
        }
        if (event.target.id === "min_age") {
            if (event.target.value < inputs_rating.max_age - minDistance)
                dispatch(
                    addRatingInputs({
                        min_age: event.target.value,
                    })
                );
        }
    };

    // this checking for empty one of seasons and leagues and Clubs
    useEffect(() => {
        if (leagues.length == 0 || clubs.length == 0 || seasons.length == 0) {
            handleGetPreData();
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            let local_lang = localStorage.getItem("lang");
            if (local_lang) {
                dispatch(addContorlers({ lang: local_lang }));
                setLocal(local_lang);
            } else {
                localStorage.setItem("lang", locale);
                dispatch(addContorlers({ lang: locale }));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setLocal(contorlers.lang);
        }
    }, [contorlers.lang]);

    // League States
    const [isLeagueExpanded, setIsLeagueExpanded] = useState(false);
    // Position Detail States
    const [isPositionDetailExpanded, setIsPositionDetailExpanded] = useState(false);
    // Club States
    const [isClubExpanded, setIsClubExpanded] = useState(false);
    // Season States
    const [isSeasonExpanded, setIsSeasonExpanded] = useState(false);
    // League Type States
    const [isLeagueTypeExpanded, setIsLeagueTypeExpanded] = useState(false);
    // Nationality States
    const [isNationalityExpanded, setIsNationalityExpanded] = useState(false);

    const leaguesList = useRef(null);
    const positionDetailList = useRef(null);
    const clubsList = useRef(null);
    const seasonList = useRef(null);
    const nationalityList = useRef(null);
    const leagueTypeList = useRef(null);

    const closeLeaguesList = (e) => {
        if (seasonList.current && isSeasonExpanded && !seasonList.current.contains(e.target)) {
            setIsSeasonExpanded(false);
        }

        if (
            positionDetailList.current &&
            isPositionDetailExpanded &&
            !positionDetailList.current.contains(e.target)
        ) {
            setIsPositionDetailExpanded(false);
        }

        if (leaguesList.current && isLeagueExpanded && !leaguesList.current.contains(e.target)) {
            setIsLeagueExpanded(false);
        }

        if (clubsList.current && isClubExpanded && !clubsList.current.contains(e.target)) {
            setIsClubExpanded(false);
        }

        if (nationalityList.current && isNationalityExpanded && !nationalityList.current.contains(e.target)) {
            setIsNationalityExpanded(false);
        }

        if (leagueTypeList.current && isLeagueTypeExpanded && !leagueTypeList.current.contains(e.target)) {
            setIsLeagueTypeExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeLeaguesList);
    });

    useEffect(() => {
        router.push(router.pathname, router.pathname, { locale: locale });
    }, []);

    return (
        <>
            <Head>
                <meta name="robots" content="noindex,nofollow" />
                <title>Player Rating System</title>
            </Head>

            <div className="container-fluid player-system-container">
                <BreadCrumbSearchBox
                    current={"Player Finding System"}
                    path={"player-finding-system"}
                    search={true}
                />

                <div className="row gap-3">
                    <aside className="player-system-filters col-lg-3 col-12">
                        <p className="filters-option">Filters Option</p>

                        <div className="filters-section">
                            {/* Filter Option */}
                            <div className="filter-option-wrapper mt-4">
                                <h4 className="text-uppercase font-gilroy-semibold ps-3">position</h4>

                                <div className="filter-box py-4 px-4">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="DF"
                                            className="d-flex justify-content-between align-items-center cursor-pointer">
                                            <span className="text-uppercase font-gilroy-medium">defender</span>

                                            <input
                                                className="d-none"
                                                name="position"
                                                type="radio"
                                                checked={position === "DF"}
                                                id="DF"
                                                onChange={(e) => handlePosition(e)}
                                            />

                                            {position === "DF" ? (
                                                <Image
                                                    src={checked_checkbox}
                                                    alt="checkbox"
                                                    width="auto"
                                                    height="auto"
                                                    unoptimized
                                                />
                                            ) : (
                                                <Image
                                                    src={checkbox}
                                                    alt="checkbox"
                                                    width="auto"
                                                    height="auto"
                                                    unoptimized
                                                />
                                            )}
                                        </label>
                                    </div>
                                    <div className="mb-3 py-2">
                                        <label
                                            htmlFor="MF"
                                            className="d-flex justify-content-between align-items-center cursor-pointer">
                                            <span className="text-uppercase font-gilroy-medium">
                                                midfielder
                                            </span>

                                            <input
                                                className="d-none"
                                                name="position"
                                                type="radio"
                                                checked={position === "MF"}
                                                id="MF"
                                                onChange={(e) => handlePosition(e)}
                                            />

                                            {position === "MF" ? (
                                                <Image
                                                    src={checked_checkbox}
                                                    alt="checkbox"
                                                    width="auto"
                                                    height="auto"
                                                    unoptimized
                                                />
                                            ) : (
                                                <Image
                                                    src={checkbox}
                                                    alt="checkbox"
                                                    width="auto"
                                                    height="auto"
                                                    unoptimized
                                                />
                                            )}
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="FW"
                                            className="d-flex justify-content-between align-items-center cursor-pointer">
                                            <span className="text-uppercase font-gilroy-medium">forward</span>

                                            <input
                                                className="d-none"
                                                name="position"
                                                type="radio"
                                                checked={position === "FW"}
                                                id="FW"
                                                onChange={(e) => handlePosition(e)}
                                            />

                                            {position === "FW" ? (
                                                <Image
                                                    src={checked_checkbox}
                                                    alt="checkbox"
                                                    width="auto"
                                                    height="auto"
                                                    unoptimized
                                                />
                                            ) : (
                                                <Image
                                                    src={checkbox}
                                                    alt="checkbox"
                                                    width="auto"
                                                    height="auto"
                                                    unoptimized
                                                />
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* Filter Option */}
                            <div className="filter-option-wrapper mt-4">
                                <h4 className="text-uppercase font-gilroy-semibold ps-3">position detail</h4>

                                <div className="filter-select" ref={positionDetailList}>
                                    <div
                                        className="filter-select-head d-flex justify-content-between align-items-center"
                                        onClick={() => setIsPositionDetailExpanded((prev) => !prev)}>
                                        <span className="font-gilroy-Medium">
                                            {inputs_rating.position_detail}
                                        </span>

                                        <Image
                                            src={arrow_down}
                                            width="auto"
                                            height="auto"
                                            unoptimized
                                            className={isPositionDetailExpanded ? "rotate" : ""}
                                            alt=""
                                        />
                                    </div>
                                    <ul
                                        className={
                                            isPositionDetailExpanded
                                                ? "filter-select-list show"
                                                : "filter-select-list"
                                        }>
                                        {positionDetail.map((item) => (
                                            <li
                                                key={item}
                                                onClick={() => {
                                                    dispatch(addRatingInputs({ position_detail: item }));
                                                    setIsPositionDetailExpanded(false);
                                                }}
                                                className={
                                                    item == inputs_rating.position_detail ? "active" : ""
                                                }>
                                                <Button>{item}</Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="filters-section">
                            {/* Filter Option */}
                            <div className="filter-option-wrapper mt-1">
                                <div className="filter-box py-4 px-4">
                                    <h4 className="text-uppercase font-gilroy-semibold">Age</h4>

                                    <RangeSlider
                                        min={10}
                                        max={100}
                                        distance={5}
                                        newValue={inputs_information.age}
                                        target="age"
                                        values={inputs_information.age}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="filters-section">
                            {/* Filter Option */}
                            <div className="filter-option-wrapper mt-4">
                                <div className="d-flex align-items-center gap-3 ps-3 flex-wrap">
                                    <label
                                        htmlFor="League"
                                        className="d-flex gap-3 align-items-center cursor-pointer">
                                        <span className="text-uppercase font-gilroy-bold">TOP LEAGUE</span>

                                        <input
                                            type="radio"
                                            className="d-none"
                                            value={league_type}
                                            checked={league_type === "League"}
                                            name="league_type"
                                            id="League"
                                            onChange={(event) => {
                                                setLeague_type(event.target.id);

                                                dispatch(
                                                    addRatingInputs({
                                                        league: "All",
                                                    })
                                                );
                                            }}
                                        />

                                        {league_type === "League" ? (
                                            <Image
                                                src={checked_checkbox}
                                                alt="checkbox"
                                                width="auto"
                                                height="auto"
                                                unoptimized
                                            />
                                        ) : (
                                            <Image
                                                src={checkbox}
                                                alt="checkbox"
                                                width="auto"
                                                height="auto"
                                                unoptimized
                                            />
                                        )}
                                    </label>
                                    <label
                                        htmlFor="International"
                                        className="d-flex gap-2 align-items-center cursor-pointer">
                                        <span className="text-uppercase font-gilroy-bold">International</span>

                                        <input
                                            type="radio"
                                            className="d-none"
                                            value={league_type}
                                            checked={league_type === "International"}
                                            name="league_type"
                                            id="International"
                                            onChange={(event) => {
                                                setLeague_type(event.target.id);

                                                dispatch(
                                                    addRatingInputs({
                                                        league: "All",
                                                    })
                                                );
                                            }}
                                        />

                                        {league_type === "International" ? (
                                            <Image
                                                src={checked_checkbox}
                                                alt="checkbox"
                                                width="auto"
                                                height="auto"
                                                unoptimized
                                            />
                                        ) : (
                                            <Image
                                                src={checkbox}
                                                alt="checkbox"
                                                width="auto"
                                                height="auto"
                                                unoptimized
                                            />
                                        )}
                                    </label>
                                </div>
                                <div className="filter-option-wrapper mt-4">
                                    <div className="filter-select" ref={leagueTypeList}>
                                        <div
                                            className="filter-select-head d-flex justify-content-between align-items-center"
                                            onClick={() => setIsLeagueTypeExpanded((prev) => !prev)}>
                                            <span className="font-gilroy-Medium">{inputs_rating.league}</span>

                                            <Image
                                                src={arrow_down}
                                                width="auto"
                                                height="auto"
                                                unoptimized
                                                className={isLeagueTypeExpanded ? "rotate" : ""}
                                                alt=""
                                            />
                                        </div>
                                        <ul
                                            className={
                                                isLeagueTypeExpanded
                                                    ? "filter-select-list show"
                                                    : "filter-select-list"
                                            }>
                                            {leagues.map(
                                                (item) =>
                                                    item.id == "All" && (
                                                        <li
                                                            key={item.id}
                                                            className={
                                                                item == inputs_rating.league ? "active" : ""
                                                            }>
                                                            <Button
                                                                value={item.league}
                                                                data-name="league"
                                                                onClick={(e) => {
                                                                    handleInputsData(e);
                                                                    setIsLeagueTypeExpanded(false);
                                                                }}>
                                                                {item.league}
                                                            </Button>
                                                        </li>
                                                    )
                                            )}
                                            {leagues.map(
                                                (item) =>
                                                    item.id != "All" &&
                                                    item.top_league &&
                                                    item.international &&
                                                    league_type == "International" && (
                                                        <li
                                                            key={item.id}
                                                            className={
                                                                item == inputs_rating.league ? "active" : ""
                                                            }>
                                                            <Button
                                                                value={item.league}
                                                                data-name="league"
                                                                onClick={(e) => {
                                                                    handleInputsData(e);
                                                                    setIsLeagueTypeExpanded(false);
                                                                }}>
                                                                {item.league}
                                                            </Button>
                                                        </li>
                                                    )
                                            )}

                                            {leagues.map(
                                                (item) =>
                                                    item.id != "All" &&
                                                    item.top_league &&
                                                    !item.international &&
                                                    league_type == "League" && (
                                                        <li
                                                            key={item.id}
                                                            className={
                                                                item == inputs_rating.league ? "active" : ""
                                                            }>
                                                            <Button
                                                                value={item.league}
                                                                data-name="league"
                                                                onClick={(e) => {
                                                                    handleInputsData(e);
                                                                    setIsLeagueTypeExpanded(false);
                                                                }}>
                                                                {item.league}
                                                            </Button>
                                                        </li>
                                                    )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filters-section">
                            {/* Filter Option */}
                            <div className="filter-option-wrapper mt-4">
                                <h4 className="text-uppercase font-gilroy-semibold ps-3">season</h4>

                                <div className="filter-select" ref={seasonList}>
                                    <div
                                        className="filter-select-head d-flex justify-content-between align-items-center"
                                        onClick={() => setIsSeasonExpanded((prev) => !prev)}>
                                        <span className="font-gilroy-Medium">
                                            {inputs_rating.season.title}
                                        </span>

                                        <Image
                                            src={arrow_down}
                                            width="auto"
                                            height="auto"
                                            unoptimized
                                            className={isSeasonExpanded ? "rotate" : ""}
                                            alt=""
                                        />
                                    </div>
                                    <ul
                                        className={
                                            isSeasonExpanded ? "filter-select-list show" : "filter-select-list"
                                        }>
                                        {seasons.map((item) => (
                                            <li
                                                key={item.id}
                                                onClick={() => {
                                                    dispatch(addRatingInputs({ season: item}));
                                                    setIsSeasonExpanded(false);
                                                }}
                                                className={
                                                    item.title == inputs_rating.season.title ? "active" : ""
                                                }>
                                                <Button>{item.title}</Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="filters-section">
                            {/* Filter Option */}
                            <div className="filter-option-wrapper mt-4">
                                <h4 className="text-uppercase font-gilroy-semibold ps-3">club</h4>

                                <div className="filter-select" ref={clubsList}>
                                    <div
                                        className="filter-select-head d-flex justify-content-between align-items-center"
                                        onClick={() => setIsClubExpanded((prev) => !prev)}>
                                        <span className="font-gilroy-Medium">{inputs_rating.club.club}</span>

                                        <Image
                                            src={arrow_down}
                                            width="auto"
                                            height="auto"
                                            unoptimized
                                            className={isClubExpanded ? "rotate" : ""}
                                            alt=""
                                        />
                                    </div>
                                    <ul
                                        className={
                                            isClubExpanded ? "filter-select-list show" : "filter-select-list"
                                        }>
                                        {clubs.map((item) => (
                                            <li
                                                key={item.id}
                                                className={
                                                    item.club == inputs_rating.club.club ? "active" : ""
                                                }>
                                                <Button
                                                    value={item.club}
                                                    id={item.id}
                                                    data-name="club"
                                                    onClick={(e) => {
                                                        handleChangeClub(e);
                                                        setIsClubExpanded(false);
                                                    }}>
                                                    {item.club}
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Filter Option */}
                        <div className="filter-option-wrapper mt-4">
                            <h4 className="text-uppercase font-gilroy-semibold ps-3">nationality</h4>

                            <div className="filter-select" ref={nationalityList}>
                                <div
                                    className="filter-select-head d-flex justify-content-between align-items-center"
                                    onClick={() => setIsNationalityExpanded((prev) => !prev)}>
                                    <span className="font-gilroy-Medium d-flex align-items-center gap-2">
                                        {/* {inputs_rating.Nation.label !== "All" && (
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={`https://flagcdn.com/w20/${inputs_rating.Nation.code.toLowerCase()}.png`}
                                                    srcSet={`https://flagcdn.com/w40/${inputs_rating.Nation.code.toLowerCase()}.png 2x`}
                                                    alt={inputs_rating.Nation.code}
                                                />
                                            )} */}
                                        {inputs_rating.Nation.label}
                                    </span>

                                    <Image
                                        src={arrow_down}
                                        width="auto"
                                        height="auto"
                                        unoptimized
                                        className={isNationalityExpanded ? "rotate" : ""}
                                        alt=""
                                    />
                                </div>
                                <ul
                                    className={
                                        isNationalityExpanded
                                            ? "filter-select-list show"
                                            : "filter-select-list"
                                    }>
                                    {countries.map((item) => (
                                        <li
                                            key={item.code}
                                            className={
                                                item.label == inputs_rating.Nation.label ? "active" : ""
                                            }>
                                            <Button
                                                className="d-flex align-items-center gap-2"
                                                value={item.label}
                                                id={item.code}
                                                data-tag={item.tag}
                                                onClick={(e) => {
                                                    handleChangeNation(e);
                                                    setIsNationalityExpanded(false);
                                                }}>
                                                {item.label !== " All" && (
                                                    <img
                                                        loading="lazy"
                                                        width="20"
                                                        src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                                                        srcSet={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png 2x`}
                                                        alt={item.code}
                                                    />
                                                )}
                                                {item.label}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <Button variant="contained" onClick={handleFilter} className="apply-submit">
                            Apply Filters
                        </Button>
                    </aside>
                    <main className="player-system-result container-fluid col-lg-9 col-12">
                        {player_rating.length > 0 && (
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="fw-bold ms-0 font-20 font-gilroy-semibold">
                                    {title.position} {title.season}{" "}
                                </span>
                                <ViewModeSelection />
                            </div>
                        )}

                        {player_rating.length <= 0 && (
                            <div className="d-flex flex-column welcome-text justify-content-center">
                                {message}
                            </div>
                        )}

                        {player_rating.length > 0 && contorlers.systems_view == "list" && (
                            <PlayersTable data={player_rating} rating={true} season="0" />
                        )}

                        <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="stretch"
                            mt={3}>
                            {player_rating.length > 0 && contorlers.systems_view == "list" && (
                                <PlayersTable data={player_rating} rating={false} season={title.season} />
                            )}
                        </Grid>
                        <div className="player-results-wrapper">
                            {contorlers.systems_view == "module" &&
                                player_rating
                                    .slice(contorlers.rating_data_start_item, contorlers.rating_data_end_item)
                                    .map((player, index) => (
                                        <PlayerCard
                                            key={index}
                                            index={index}
                                            player={player}
                                            rating={true}
                                            season={title.season}
                                        />
                                    ))}
                        </div>
                        {contorlers.systems_view == "module" && contorlers.rating_data_pages > 1 && (
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ my: 3 }}>
                                <Stack spacing={2}>
                                    <Pagination
                                        page={contorlers.rating_data_current_pages}
                                        showLastButton
                                        showFirstButton
                                        count={contorlers.rating_data_pages}
                                        onChange={handlePageChange}
                                        variant="outlined"
                                        color="primary"
                                        shape="rounded"
                                    />
                                </Stack>
                            </Grid>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
