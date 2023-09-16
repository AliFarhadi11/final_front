import Head from "next/head";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumbSearchBox from "../../components/layout/BreadCrumbSearchBox";
import { useEffect, useRef, useState } from "react";
import arrow_down from "../../public/images/arrow_down.svg";
import checkbox from "../../public/images/checkbox.svg";
import checked_checkbox from "../../public/images/checked_checkbox.svg";

import RangeSlider from "../../components/layout/RangeSlider";
import { Button, Grid, Pagination, Stack, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
    addLeagues,
    addInfoInputs,
    addSeasons,
    addClubs,
    addInfoData,
    addContorlers,
} from "../../redux/reducers";
import { requestPlayerInfoSystem, requestPreData } from "../../request_services/PlayersService";
import {
    ClubSelection,
    CountrySelection,
    PlayerCard,
    PlayersTable,
    ViewModeSelection,
} from "../../components";
import { isEmpty, toInteger } from "lodash";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { countries } from "../../countries";

function PlayerInformationSystem() {
    const dispatch = useDispatch();
    const contorlers = useSelector((state) => state.contorlers.value);
    const leagues = useSelector((state) => state.leagues.value);
    const clubs = useSelector((state) => state.clubs.value);
    const info_data = useSelector((state) => state.info_data.value);
    const inputs_information = useSelector((state) => state.inputs_information.value);
    const [positionDetail, setPositionDetail] = useState(["All"]);
    const seasons = useSelector((state) => state.seasons.value);
    const [isInterNationalPlay, setIsInterNationalPlay] = useState(true);

    // InternationalCaps States
    const handleInternationalCup = (event) => {
        setIsInterNationalPlay((prev) => !prev);

        if (event.target.id == "No") {
            if (inputs_information.int_caps.have || !inputs_information.int_caps.nohave)
                dispatch(
                    addInfoInputs({
                        int_caps: {
                            have: inputs_information.int_caps.have,
                            nohave: !inputs_information.int_caps.nohave,
                        },
                    })
                );
        }
        if (event.target.id == "Yes") {
            if (inputs_information.int_caps.nohave || !inputs_information.int_caps.have)
                dispatch(
                    addInfoInputs({
                        int_caps: {
                            have: !inputs_information.int_caps.have,
                            nohave: inputs_information.int_caps.nohave,
                        },
                    })
                );
        }
    };

    // League States
    const [isLeagueExpanded, setIsLeagueExpanded] = useState(false);
    // League States
    const [isPositionDetailExpanded, setIsPositionDetailExpanded] = useState(false);
    // Club States
    const [isClubExpanded, setIsClubExpanded] = useState(false);
    // Club States
    const [isSeasonExpanded, setIsSeasonExpanded] = useState(false);
    // Nationality States
    const [isNationalityExpanded, setIsNationalityExpanded] = useState(false);

    const leaguesList = useRef(null);
    const positionDetailList = useRef(null);
    const clubsList = useRef(null);
    const seasonList = useRef(null);
    const nationalityList = useRef(null);

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
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeLeaguesList);
    });
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
            <FormattedMessage id="Information.wellcome1" /> <br />
            <FormattedMessage id="Information.wellcome2" />
        </Typography>
    );
    const handleChangeClub = (e) => {
        if (e.target.value) {
            dispatch(
                addInfoInputs({
                    club: { id: e.target.id, club: e.target.value },
                })
            );
        } else {
            dispatch(
                addInfoInputs({
                    club: { id: "All", club: "All" },
                })
            );
        }
    };

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
            }
        } catch (ex) {}
    };
    useEffect(() => {
        if (leagues.length == 0 || clubs.length == 0 || seasons.length == 0) {
            handleGetPreData();
        }
    }, []);

    //Nationality States
    const handleChangeNation = (e) => {
        if (e.target.value) {
            dispatch(
                addInfoInputs({
                    Nation: { code: e.target.id, tag: e.target.value, label: e.target.value },
                })
            );
        } else {
            dispatch(
                addInfoInputs({
                    Nation: { code: "All", tag: "All", label: "All" },
                })
            );
        }
    };

    const handlePosition = (e) => {
        dispatch(
            addInfoInputs({
                position: {
                    ...inputs_information.position,
                    [e.target.id]: !inputs_information.position[e.target.id],
                },
            })
        );
    };

    useEffect(() => {
        let pos = ["All"];
        if (inputs_information.position.GK) {
            pos = [...pos, "Goalkeeper"];
        }
        if (inputs_information.position.DF) {
            pos = [...pos, "Right Back", "Left Back", "Center Back"];
        }
        if (inputs_information.position.MF) {
            pos = [...pos, "Defensive Midfield", "Central Midfield", "Attacking Midfield"];
        }
        if (inputs_information.position.FW) {
            pos = [...pos, "Right Winger", "Left Winger", "Center Forward", "Second Striker"];
        }
        setPositionDetail(pos);
        dispatch(addInfoInputs({ position_detail: "All" }));
    }, [inputs_information.position]);

    const handleFilter = async (event) => {
        let information = inputs_information;
        try {
            const { status, data } = await requestPlayerInfoSystem(information);
            if (status === 200) {
                let count_page = data.length / 9;
                if (count_page > toInteger(data.length / 9)) {
                    count_page = toInteger(data.length / 9) + 1;
                } else {
                    count_page = toInteger(data.length / 9);
                }
                // set settings of pagination in redux
                dispatch(
                    addContorlers({
                        info_data_length: data.length,
                        info_data_pages: count_page,
                        info_data_current_pages: 1,
                        info_data_start_item: 0,
                        info_data_end_item: 9,
                    })
                );

                dispatch(addInfoData(data));
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
    const handlePageChange = (event, value) => {
        dispatch(
            addContorlers({
                info_data_current_pages: value,
                info_data_start_item: (value - 1) * 9,
                info_data_end_item: value * 9,
            })
        );
    };

    return (
        <>
            <Head>
                <meta name="robots" content="noindex,nofollow" />
                <title>Soccer Player Information System</title>
                <title>
                    {" "}
                    {contorlers.lang === "fa"
                        ? "انتخاب بازیکنان برتر فوتبال"
                        : "Soccer Player Information System"}{" "}
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

            <div className="container-fluid player-system-container">
                <BreadCrumbSearchBox
                    current={"Player Information System"}
                    path={"player-systemrmation-system"}
                    search={true}
                />

                <div className="row gap-3">
                    <aside className="player-system-filters col-lg-3 col-12">
                        <p className="filters-option">Filters Option</p>

                        <div className="filters-section">
                            {/* Filter Option */}
                            <div
                                className="filter-option-wrapper mt-4"
                                style={{
                                    border:
                                        !inputs_information.position.GK &&
                                        !inputs_information.position.DF &&
                                        !inputs_information.position.MF &&
                                        !inputs_information.position.FW
                                            ? "1px solid red"
                                            : "1px solid white",
                                    borderRadius: 11,
                                }}>
                                <h4 className="text-uppercase font-gilroy-semibold ps-3">position</h4>

                                <div className="filter-box py-4 px-4">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="GK"
                                            className="d-flex justify-content-between align-items-center cursor-pointer">
                                            <span className="text-uppercase font-gilroy-medium">
                                                goalkeeper
                                            </span>

                                            <input
                                                type="checkbox"
                                                className="d-none"
                                                checked={inputs_information.position.GK}
                                                id="GK"
                                                // onChange={() => setIsDefenderChecked((prev) => !prev)}
                                                onChange={(e) => handlePosition(e)}
                                            />

                                            {inputs_information.position.GK ? (
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
                                    <div className="mb-3">
                                        <label
                                            htmlFor="DF"
                                            className="d-flex justify-content-between align-items-center cursor-pointer">
                                            <span className="text-uppercase font-gilroy-medium">defender</span>

                                            <input
                                                type="checkbox"
                                                className="d-none"
                                                checked={inputs_information.position.DF}
                                                id="DF"
                                                onChange={(e) => handlePosition(e)}
                                            />

                                            {inputs_information.position.DF ? (
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
                                                type="checkbox"
                                                className="d-none"
                                                checked={inputs_information.position.MF}
                                                id="MF"
                                                onChange={(e) => handlePosition(e)}
                                            />

                                            {inputs_information.position.MF ? (
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
                                                type="checkbox"
                                                className="d-none"
                                                checked={inputs_information.position.FW}
                                                id="FW"
                                                onChange={(e) => handlePosition(e)}
                                            />

                                            {inputs_information.position.FW ? (
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
                                            {inputs_information.position_detail}
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
                                                    dispatch(addInfoInputs({ position_detail: item }));
                                                    setIsPositionDetailExpanded(false);
                                                }}
                                                className={
                                                    item == inputs_information.position_detail ? "active" : ""
                                                }>
                                                <Button>{item}</Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Filter Option */}
                            <div className="filter-option-wrapper mt-4">
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

                            {/* Filter Option */}
                            <div className="filter-option-wrapper mt-4">
                                <h4 className="text-uppercase font-gilroy-semibold ps-3">League</h4>

                                <div className="filter-select" ref={leaguesList}>
                                    <div
                                        className="filter-select-head d-flex justify-content-between align-items-center"
                                        onClick={() => setIsLeagueExpanded((prev) => !prev)}>
                                        <span className="font-gilroy-Medium">
                                            {inputs_information.league.league}
                                        </span>

                                        <Image
                                            src={arrow_down}
                                            width="auto"
                                            height="auto"
                                            unoptimized
                                            className={isLeagueExpanded ? "rotate" : ""}
                                            alt=""
                                        />
                                    </div>
                                    <ul
                                        className={
                                            isLeagueExpanded ? "filter-select-list show" : "filter-select-list"
                                        }>
                                        {leagues.map((item) => (
                                            <li
                                                key={item.id}
                                                onClick={() => {
                                                    dispatch(
                                                        addInfoInputs({
                                                            league: { id: item.id, league: item.league },
                                                        })
                                                    );
                                                    setIsLeagueExpanded(false);
                                                }}
                                                className={
                                                    item.league == inputs_information.league.league
                                                        ? "active"
                                                        : ""
                                                }>
                                                <Button>{item.league}</Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Filter Option */}
                            <div className="filter-option-wrapper mt-4">
                                <h4 className="text-uppercase font-gilroy-semibold ps-3">season</h4>

                                <div className="filter-select" ref={seasonList}>
                                    <div
                                        className="filter-select-head d-flex justify-content-between align-items-center"
                                        onClick={() => setIsSeasonExpanded((prev) => !prev)}>
                                        <span className="font-gilroy-Medium">
                                            {inputs_information.season.title}
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
                                                    dispatch(addInfoInputs({ season: item }));
                                                    setIsSeasonExpanded(false);
                                                }}
                                                className={
                                                    item.title == inputs_information.season ? "active" : ""
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
                                        <span className="font-gilroy-Medium">
                                            {inputs_information.club.club}
                                        </span>

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
                                                    item.club == inputs_information.club.club ? "active" : ""
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
                        <div className="filters-section">
                            {/* Filter Option */}
                            <div className="filter-option-wrapper mt-4">
                                <h4 className="text-uppercase font-gilroy-semibold ps-3">nationality</h4>

                                <div className="filter-select" ref={nationalityList}>
                                    <div
                                        className="filter-select-head d-flex justify-content-between align-items-center"
                                        onClick={() => setIsNationalityExpanded((prev) => !prev)}>
                                        <span className="font-gilroy-Medium d-flex align-items-center gap-2">
                                            {/* {inputs_finding.Nation.label !== "All" && (
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={`https://flagcdn.com/w20/${inputs_finding.Nation.code.toLowerCase()}.png`}
                                                    srcSet={`https://flagcdn.com/w40/${inputs_finding.Nation.code.toLowerCase()}.png 2x`}
                                                    alt={inputs_finding.Nation.code}
                                                />
                                            )} */}
                                            {inputs_information.Nation.label}
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
                                                    item.label == inputs_information.Nation.label
                                                        ? "active"
                                                        : ""
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
                        </div>

                        {/* Filter Option */}
                        <div className="filter-option-wrapper mt-4">
                            <h4 className="text-uppercase font-gilroy-semibold ps-3">International play</h4>

                            <div className="filter-box py-4 px-4">
                                <div className="mb-3 py-2">
                                    <label
                                        htmlFor="Yes"
                                        className="d-flex justify-content-between align-items-center cursor-pointer">
                                        <span className="text-uppercase font-gilroy-medium">Yes</span>

                                        <input
                                            type="radio"
                                            name="internationalPlay"
                                            className="d-none"
                                            checked={isInterNationalPlay}
                                            id="Yes"
                                            onChange={(e) => handleInternationalCup(e)}
                                        />

                                        {isInterNationalPlay ? (
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
                                        htmlFor="No"
                                        className="d-flex justify-content-between align-items-center cursor-pointer">
                                        <span className="text-uppercase font-gilroy-medium">No</span>

                                        <input
                                            type="radio"
                                            name="internationalPlay"
                                            className="d-none"
                                            checked={!isInterNationalPlay}
                                            id="No"
                                            onChange={(e) => handleInternationalCup(e)}
                                        />

                                        {!isInterNationalPlay ? (
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
                            <div className="filter-box py-3 px-4">
                                <h4 className="text-uppercase font-gilroy-semibold">Market Value</h4>
                                <RangeSlider
                                    min={0}
                                    max={200000}
                                    distance={10}
                                    newValue={inputs_information.market_value}
                                    target="market_value"
                                    values={inputs_information.market_value}
                                />
                            </div>
                        </div>

                        {/* Filter Option */}
                        <div className="filter-option-wrapper mt-4">
                            <div className="filter-box py-3 px-4">
                                <h4 className="text-uppercase font-gilroy-semibold">Contract Expire</h4>
                                <div className="d-flex gap-3 align-items-center">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            value={inputs_information.start_date}
                                            onChange={(newDate) =>
                                                dispatch(addInfoInputs({ start_date: newDate }))
                                            }
                                        />
                                    </LocalizationProvider>
                                    <span>-</span>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            value={inputs_information.end_date}
                                            onChange={(newDate) =>
                                                dispatch(addInfoInputs({ end_date: newDate }))
                                            }
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>

                        <Button
                            disabled={
                                (!inputs_information.position.GK &&
                                    !inputs_information.position.DF &&
                                    !inputs_information.position.MF &&
                                    !inputs_information.position.FW) ||
                                !inputs_information.start_date.isValid() ||
                                !inputs_information.end_date.isValid() ||
                                isEmpty(inputs_information.season)
                            }
                            variant="contained"
                            onClick={handleFilter}
                            className="apply-submit">
                            Apply Filters
                        </Button>
                    </aside>
                    <main className="player-system-result container-fluid col-lg-9 col-12">
                        {info_data.length > 0 && (
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="fw-bold ms-0 font-20 font-gilroy-semibold">
                                    {title.position} {title.season}{" "}
                                </span>
                                <ViewModeSelection />
                            </div>
                        )}

                        {info_data.length <= 0 && (
                            <div className="d-flex flex-column welcome-text justify-content-center">
                                {message}
                            </div>
                        )}

                        {info_data.length > 0 && contorlers.systems_view == "list" && (
                            <PlayersTable data={info_data} rating={true} season="0" />
                        )}

                        <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="stretch"
                            mt={3}>
                            {info_data.length > 0 && contorlers.systems_view == "list" && (
                                <PlayersTable data={info_data} rating={false} season={title.season} />
                            )}
                        </Grid>
                        <div className="player-results-wrapper">
                            {contorlers.systems_view == "module" &&
                                info_data
                                    .slice(contorlers.info_data_start_item, contorlers.info_data_end_item)
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
                        {contorlers.systems_view == "module" && contorlers.info_data_pages > 1 && (
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ my: 3 }}>
                                <Stack spacing={2}>
                                    <Pagination
                                        page={contorlers.info_data_current_pages}
                                        showLastButton
                                        showFirstButton
                                        count={contorlers.info_data_pages}
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

export default PlayerInformationSystem;
