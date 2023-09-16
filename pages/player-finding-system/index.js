import React, { useEffect, useState } from "react";
import Image from "next/image";
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
    Pagination,
    Stack,
    Typography,
    Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { requestPreData, requestPlayerFinding } from "../../request_services/PlayersService";
import { isNumber, toInteger, isEmpty } from "lodash";
import {
    PerformanceIndex,
    PlayersTable,
    CountrySelection,
    PlayerCard,
    ViewModeSelection,
    StyledFormControl,
    SiteRoad,
    ClubSelection,
} from "../../components";
import {
    addRatingInputs,
    addLeagues,
    addSeasons,
    addClubs,
    addFindingInputs,
    addPlayerFinding,
    addContorlers,
    addInfoData,
    addInfoInputs,
} from "../../redux/reducers";
import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import BreadCrumbSearchBox from "../../components/layout/BreadCrumbSearchBox";
import checkbox from "../../public/images/checkbox.svg";
import checked_checkbox from "../../public/images/checked_checkbox.svg";
import arrow_down from "../../public/images/arrow_down.svg";
import { useRef } from "react";
import RangeSlider from "../../components/layout/RangeSlider";
import { countries } from "../../countries.js";

export default function PlayerFindingSystem() {
    const dispatch = useDispatch();
    let router = useRouter();
    const player_finding = useSelector((state) => state.player_finding.value);
    const leagues = useSelector((state) => state.leagues.value);
    const seasons = useSelector((state) => state.seasons.value);
    const clubs = useSelector((state) => state.clubs.value);
    const info_data = useSelector((state) => state.info_data.value);
    const inputs_finding = useSelector((state) => state.inputs_finding.value);
    const inputs_information = useSelector((state) => state.inputs_information.value);
    const [showIndex, setShowIndex] = useState(false);
    const contorlers = useSelector((state) => state.contorlers.value);
    const [locale, setLocal] = useState(router.locale);
    const [positionDetail, setPositionDetail] = useState(["All"]);
    const [league_type, setLeague_type] = useState("League");
    const [title, setTitle] = useState({
        position: "",
        season: "",
    });

    console.log(inputs_finding);
    const [position, setPosition] = useState("DF");
    const [message, setMessage] = useState(
        <>
            <Typography
                variant="title6"
                sx={{
                    fontSize: "30px",
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
                <FormattedMessage id="PRS.wellcome1" />
            </Typography>
            <Typography
                variant="title6"
                sx={{
                    fontSize: "30px",
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
                <FormattedMessage id="PRS.wellcome2" />
            </Typography>
        </>
    );

    const handlePosition = (e) => {
        setPosition(e.target.id);

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
        if (inputs_finding.position === "DF") {
            pos = [...pos, "Right Back", "Left Back", "Center Back"];
        }
        if (inputs_finding.position === "MF") {
            pos = [...pos, "Defensive Midfield", "Central Midfield", "Attacking Midfield"];
        }
        if (inputs_finding.position === "FW") {
            pos = [...pos, "Right Winger", "Left Winger", "Center Forward", "Second Striker"];
        }
        setPositionDetail(pos);
        dispatch(addFindingInputs({ position_detail: "All" }));
    }, [inputs_finding.position]);

    // send parameters to backend for create list
    const handleFilter = () => {
        //check to null season
        if (isNumber(inputs_finding.season)) {
            const inputs = {
                position: inputs_finding.position,
                position_detail: inputs_finding.position_detail,
                league: inputs_finding.league,
                club: inputs_finding.club.id,
                min_age: Number(inputs_finding.min_age),
                max_age: Number(inputs_finding.max_age),
                season: inputs_information.season.id,
                Nation: inputs_finding.Nation.tag,
                wight_parameters: {
                    wint: Number(inputs_finding.wint),
                    warl: Number(inputs_finding.warl),
                    wast: Number(inputs_finding.wast),
                    wblk: Number(inputs_finding.wblk),
                    wtkl: Number(inputs_finding.wtkl),
                    wfls: Number(inputs_finding.wfls),
                    wcri: Number(inputs_finding.wcri),
                    wdrb: Number(inputs_finding.wdrb),
                    wpk: Number(inputs_finding.wpk),
                    wcrs: Number(inputs_finding.wcrs),
                    wpass: Number(inputs_finding.wpass),
                    wtch: Number(inputs_finding.wtch),
                    wclr: Number(inputs_finding.wclr),
                    wprs: Number(inputs_finding.wprs),
                    wrec: Number(inputs_finding.wrec),
                    wgls: Number(inputs_finding.wgls),
                    wsh: Number(inputs_finding.wsh),
                },
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
                finding_data_current_pages: value,
                finding_data_start_item: (value - 1) * 9,
                finding_data_end_item: value * 9,
            })
        );
    };

    const handleGetDetails = async (inputs) => {
        try {
            const { status, data } = await requestPlayerFinding(inputs);
            if (status === 200) {
                //set position and season in title of searching
                let position = "";
                let ses = "";
                if (inputs_finding.position == "DF") position = <FormattedMessage id="PRS.title20" />;
                else if (inputs_finding.position == "MF") position = <FormattedMessage id="PRS.title21" />;
                else if (inputs_finding.position == "FW") position = <FormattedMessage id="PRS.title22" />;
                seasons.map((item) => {
                    if (item.id == inputs_finding.season) ses = item.title;
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
                        finding_data_length: data.length,
                        finding_data_pages: count_page,
                        finding_data_current_pages: 1,
                        finding_data_start_item: 0,
                        finding_data_end_item: 9,
                    })
                );
                // set Player Finding list in redux
                dispatch(
                    addPlayerFinding(
                        data.sort(function (a, b) {
                            return b.rating - a.rating;
                        })
                    )
                );

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
                                    mb: "53vh",
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
        } catch (err) {
            console.log(err);
        }
    };

    const handleChangeClub = (e) => {
        if (e.target.value) {
            dispatch(
                addFindingInputs({
                    club: { id: e.target.id, club: e.target.value },
                })
            );
        } else {
            dispatch(
                addFindingInputs({
                    club: { id: "All", club: "All" },
                })
            );
        }
    };

    const handleChangeNation = (e) => {
        if (e.target.value) {
            dispatch(
                addFindingInputs({
                    Nation: { code: e.target.id, tag: e.target.value, label: e.target.value },
                })
            );
        } else {
            dispatch(
                addFindingInputs({
                    Nation: { code: "All", tag: "All", label: "All" },
                })
            );
        }
    };

    const handleInputsData = (e) => {
        dispatch(
            addFindingInputs({
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
                // dispatch(addSeasons(data.seasons))
                dispatch(addClubs(data.clubs));
                dispatch(
                    addFindingInputs({
                        season: data.seasons[0].id,
                    })
                );
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
            if (event.target.value > inputs_finding.min_age + minDistance)
                dispatch(
                    addFindingInputs({
                        max_age: event.target.value,
                    })
                );
        }
        if (event.target.id === "min_age") {
            if (event.target.value < inputs_finding.max_age - minDistance)
                dispatch(
                    addFindingInputs({
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

    let styles = {
        title: {
            // mb:10,
            ml: 1,
        },
    };
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
                <title>Learn More</title>
                <title> {locale === "fa" ? "سیستم جستجوی بازیکنان" : "Player Finding System"} </title>
                <meta
                    name="description"
                    content={locale === "fa" ? "سیستم جستجوی بازیکنان" : "Player Finding System"}
                />
                <meta property="og:url" content="https://playerscube.com/learn-more" />
            </Head>

            <div className="container-fluid player-system-container">
                <BreadCrumbSearchBox
                    current={"Player Finding System"}
                    path={"player-finding-system"}
                    search={true}
                />

                <PerformanceIndex showIndex={showIndex} setShowIndex={setShowIndex} />

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
                                                    addFindingInputs({
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
                                                    addFindingInputs({
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
                                            <span className="font-gilroy-Medium">{inputs_finding.league}</span>

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
                                                                item == inputs_information.league
                                                                    ? "active"
                                                                    : ""
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
                                                                item == inputs_information.league
                                                                    ? "active"
                                                                    : ""
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
                                                                item == inputs_information.league
                                                                    ? "active"
                                                                    : ""
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
                                                    item.title == inputs_information.season.title
                                                        ? "active"
                                                        : ""
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
                                        <span className="font-gilroy-Medium">{inputs_finding.club.club}</span>

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
                                                    item.club == inputs_finding.club.club ? "active" : ""
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
                                            {inputs_finding.Nation.label}
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
                                                    item.label == inputs_finding.Nation.label ? "active" : ""
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
                            <h4 className="text-uppercase font-gilroy-semibold ps-3">
                                Player Performance Indexes
                            </h4>

                            <div className="indexes-btn">
                                <Button onClick={() => setShowIndex(true)}>
                                    <FormattedMessage id="PRS.index" />
                                </Button>
                            </div>
                        </div>

                        <Button variant="contained" onClick={handleFilter} className="apply-submit">
                            Apply Filters
                        </Button>
                    </aside>
                    <main className="player-system-result container-fluid col-lg-9 col-12">
                        {player_finding.length <= 0 && (
                            <div className="result-head-wrapper py-2 px-4 text-center font-gilroy-medium mt-3 mx-4">
                                <FormattedMessage id="PRS.per" /> <FormattedMessage id="PRS.your" />{" "}
                                <FormattedMessage id="PRS.them" />
                            </div>
                        )}

                        {player_finding.length > 0 && (
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="fw-bold ms-0 font-20 font-gilroy-semibold">
                                    {title.position} {title.season}{" "}
                                </span>
                                <ViewModeSelection />
                            </div>
                        )}

                        {player_finding.length <= 0 && (
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
                            {player_finding.length > 0 && contorlers.systems_view == "list" && (
                                <PlayersTable data={player_finding} rating={false} season={title.season} />
                            )}
                        </Grid>
                        <div className="player-results-wrapper">
                            {contorlers.systems_view == "module" &&
                                player_finding
                                    .slice(
                                        contorlers.finding_data_start_item,
                                        contorlers.finding_data_end_item
                                    )
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
                        {contorlers.systems_view == "module" && contorlers.finding_data_pages > 1 && (
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
                                        count={contorlers.finding_data_pages}
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
