import BreadCrumbSearchBox from "../../components/layout/BreadCrumbSearchBox";

import Head from "next/head";
import { useSelector } from "react-redux";

import alert_icon from "../../public/images/alert_icon.svg";
import chart_rating from "../../public/images/chart_rating.svg";
import exclamation_mark from "../../public/images/exclamation_mark.svg";
import search from "../../public/images/search.svg";
import sm_arrow_down from "../../public/images/sm_arrow_down.svg";
import union from "../../public/images/union.svg";
import learnmore from "../../public/images/learnmore.png";


import Image from "next/image";
import { useState } from "react";
import { Tooltip, Button } from "@mui/material";

export default function LearnMore() {
    const contorlers = useSelector((state) => state.contorlers.value);
    const [currentTab, setCurrentTab] = useState("");

    const tabsList = [
        { title: "1", state: "" },
        { title: "2", state: "filters " },
        { title: "3", state: "ppi" },
        { title: "4", state: "duels" },
        { title: "5", state: "ppiNumber" },
    ];

    const positionList = [
        { id: 1, text: "Defender" },
        { id: 2, text: "Midfielder" },
        { id: 3, text: "Attacker" },
    ];

    const leagueList = [
        { id: 1, text: "Serie A" },
        { id: 2, text: "La Liga" },
        { id: 3, text: "Bundesliga" },
    ];

    const seasonList = [
        { id: 1, text: "2019-20" },
        { id: 2, text: "2020-21" },
        { id: 3, text: "2021-22" },
    ];

    const defensiveList = [
        { id: 1, text: "Tackle" },
        { id: 2, text: "Block" },
        { id: 3, text: "..." },
    ];

    const offensiveList = [
        { id: 1, text: "Dribble" },
        { id: 2, text: "Goals" },
        { id: 3, text: "..." },
    ];

    const passingList = [
        { id: 1, text: "Assists" },
        { id: 2, text: "Cross" },
        { id: 3, text: "..." },
    ];

    const defensiveActionsRangesData = [
        {
            id: 1,
            title: "Block",
            progress: "30",
            value: "2",
        },
        {
            id: 2,
            title: "Press",
            progress: "20",
            value: "1",
        },
        {
            id: 3,
            title: "Tackle",
            progress: "50",
            value: "5",
        },
    ];

    const offensiveActionsRangesData = [
        {
            id: 1,
            title: "Goals",
            progress: "50",
            value: "5",
        },
        {
            id: 2,
            title: "Dribble",
            progress: "80",
            value: "8",
        },
        {
            id: 3,
            title: "Penalty Made",
            progress: "25",
            value: "2",
        },
    ];

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

            <div className="learn-more">
                    <div className="learn-more-bc-container">
                        <BreadCrumbSearchBox current={"Learn More"} path={"/learn-more"} />
                    </div>
                <div className="container-md">
                    <div className="learn-more-content-container grid grid-cols-12 gap-3">
                        <nav className="learn-more-navbar">
                            <ul>
                                {tabsList.map((tab, index) => (
                                    <li
                                        key={index}
                                        className={`${
                                            tab.state == currentTab
                                                ? "nav-tab font-gilroy-Medium active"
                                                : "nav-tab font-gilroy-Medium"
                                        }`}
                                        onClick={() => setCurrentTab(tab.state)}>
                                        {tab.title}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="content-wrapper">
                            {/* Tab */}
                            <div style={{ display: `${currentTab == "" ? "block" : "none"}` }}>
                                <div className="d-flex align-items-center gap-1">
                                    <h2 className="learn-more-content-title font-gilroy-semibold">Select the System</h2>
                                    <Tooltip title="You have 3 diferrence system" arrow className="tool-tip">
                                        <Button>
                                            <Image src={alert_icon} alt="tip" width="18" height="18"/>
                                        </Button>
                                    </Tooltip>
                                </div>

                                <div className="search-type-title">
                                    {/* <h3 className="font-gilroy-semibold">Search Type</h3> */}
                                    <div className="search-type-cards-wrapper">
                                        {/* Card */}
                                        <div className={`search-type-card white transition-03`}>
                                            <div className={`circle-light`}>
                                                <Image
                                                    src={exclamation_mark}
                                                    alt="Player_information_system"
                                                    width="auto"
                                                    height="auto"
                                                />
                                            </div>
                                            <p className="learn-more-font-medium">Player Information System</p>
                                        </div>
                                        {/* Card */}
                                        <div className={`search-type-card gradient transition-03`}>
                                            <div className={`circle-transparent`}>
                                                <Image
                                                    src={chart_rating}
                                                    alt="Player_Rating_System"
                                                    width="auto"
                                                    height="auto"
                                                />
                                            </div>
                                            <p className="learn-more-font-medium">Player Rating System</p>
                                        </div>
                                        {/* Card */}
                                        <div className={`search-type-card white transition-03`}>
                                            <div className={`circle-light`}>
                                                <Image
                                                    src={search}
                                                    alt="Player_Finding_System"
                                                    width="auto"
                                                    height="auto"
                                                />
                                            </div>
                                            <p className="learn-more-font-medium">Player Finding System</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Tab */}
                            <div style={{ display: `${currentTab == "filters " ? "block" : "none"}` }}>
                                <div className="d-flex align-items-center gap-1">
                                    <h2 className="learn-more-content-title font-gilroy-semibold">
                                        Add basic filters option
                                    </h2>
                                    <Tooltip title="Test Text , Test Text" arrow className="tool-tip">
                                        <Button>
                                            <Image src={alert_icon} alt="tip" width="18" height="18" />
                                        </Button>
                                    </Tooltip>
                                </div>

                                <div className="learn-more-selects-wrapper">
                                    {/* Select */}
                                    <div className="learn-more-select">
                                        <p className="font-gilroy-semibold">Position: </p>
                                        <div>
                                            <span className="font-gilroy-medium">Midfielder</span>
                                            <Image
                                                src={sm_arrow_down}
                                                alt="arrow_down"
                                                width="auto"
                                                height="auto"
                                            />
                                        </div>

                                        <ul>
                                            {positionList.map((position) => (
                                                <li
                                                    key={position.id}
                                                    className="option-item font-gilroy-medium">
                                                    {position.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Select */}
                                    <div className="learn-more-select">
                                        <p className="font-gilroy-semibold">League: </p>
                                        <div>
                                            <span className="font-gilroy-medium">La Liga</span>
                                            <Image
                                                src={sm_arrow_down}
                                                alt="arrow_down"
                                                width="auto"
                                                height="auto"
                                            />
                                        </div>

                                        <ul>
                                            {leagueList.map((league) => (
                                                <li key={league.id} className="option-item font-gilroy-medium">
                                                    {league.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Select */}
                                    <div className="learn-more-select">
                                        <p className="font-gilroy-semibold">Season: </p>
                                        <div>
                                            <span className="font-gilroy-medium">2020-2021</span>
                                            <Image
                                                src={sm_arrow_down}
                                                alt="arrow_down"
                                                width="auto"
                                                height="auto"
                                            />
                                        </div>

                                        <ul>
                                            {seasonList.map((season) => (
                                                <li key={season.id} className="option-item font-gilroy-medium">
                                                    {season.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Tab */}
                            <div style={{ display: `${currentTab == "ppi" ? "block" : "none"}` }}>
                                <div className="d-flex align-items-center gap-1">
                                    <h2 className="learn-more-content-title font-gilroy-semibold">
                                        Add Player Performance Indexes
                                    </h2>
                                    <Tooltip title="Test Text , Test Text" arrow className="tool-tip">
                                        <Button>
                                            <Image src={alert_icon} alt="tip" width="18" height="18" />
                                        </Button>
                                    </Tooltip>
                                </div>

                                <div className="learn-more-selects-wrapper">
                                    {/* Select */}
                                    <div className="learn-more-select">
                                        <p className="font-gilroy-semibold">Defensive Action: </p>
                                        <div>
                                            <span className="font-gilroy-medium">Block</span>
                                            <Image
                                                src={sm_arrow_down}
                                                alt="arrow_down"
                                                width="auto"
                                                height="auto"
                                            />
                                        </div>

                                        <ul>
                                            {defensiveList.map((defensive) => (
                                                <li
                                                    key={defensive.id}
                                                    className="option-item font-gilroy-medium">
                                                    {defensive.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Select */}
                                    <div className="learn-more-select">
                                        <p className="font-gilroy-semibold">Offensive Action: </p>
                                        <div>
                                            <span className="font-gilroy-medium"> Goals</span>
                                            <Image
                                                src={sm_arrow_down}
                                                alt="arrow_down"
                                                width="auto"
                                                height="auto"
                                            />
                                        </div>

                                        <ul>
                                            {offensiveList.map((offensive) => (
                                                <li
                                                    key={offensive.id}
                                                    className="option-item font-gilroy-medium">
                                                    {offensive.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Select */}
                                    <div className="learn-more-select">
                                        <p className="font-gilroy-semibold">Passing: </p>
                                        <div>
                                            <span className="font-gilroy-medium">Cross</span>
                                            <Image
                                                src={sm_arrow_down}
                                                alt="arrow_down"
                                                width="auto"
                                                height="auto"
                                            />
                                        </div>

                                        <ul>
                                            {passingList.map((passing) => (
                                                <li
                                                    key={passing.id}
                                                    className="option-item font-gilroy-medium">
                                                    {passing.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Tab */}
                            <div style={{ display: `${currentTab == "duels" ? "block" : "none"}` }}>
                                <div className="d-flex align-items-center gap-1">
                                    <h2 className="learn-more-content-title font-gilroy-semibold">
                                        Preference your decision by selecting a value
                                    </h2>
                                    <Tooltip title="Test Text , Test Text" arrow className="tool-tip">
                                        <Button>
                                            <Image src={alert_icon} alt="tip" width="18" height="18" />
                                        </Button>
                                    </Tooltip>
                                </div>

                                <div className="learn-more-duels">
                                    <div>
                                        <h2>Aerial Duels</h2>

                                        <div className="importance-wrapper">
                                            <div>
                                                <p className="learn-more-font-medium">Most Importance</p>
                                                <p className="learn-more-font-medium">1</p>
                                            </div>
                                            <div>
                                                <p className="learn-more-font-medium">Least Importance</p>
                                                <p className="learn-more-font-medium">9</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Tab */}
                            <div style={{ display: `${currentTab == "ppiNumber" ? "block" : "none"}` }}>
                                <div className="d-flex align-items-center gap-1">
                                    <h2 className="learn-more-content-title font-gilroy-semibold">
                                        Preference your decision by selecting a PPI and number
                                    </h2>
                                    <Tooltip title="Test Text , Test Text" arrow className="tool-tip">
                                        <Button>
                                            <Image src={alert_icon} alt="tip" width="18" height="18" />
                                        </Button>
                                    </Tooltip>
                                </div>

                                <div className="learn-more-ppinumber pb-8">
                                    <div className="ppi-wrapper">
                                        <div className="ppi-wrapper-title">
                                            <h3 className="learn-more-font-semibold">Defensive Action</h3>
                                            <span>-</span>
                                        </div>
                                        {defensiveActionsRangesData.map((range,index) => (
                                            <div key={index} className="ppi-range-wrapper">
                                                <p className="learn-more-font-medium">{range.title}</p>
                                                <div className="ppi-range">
                                                    <div style={{ width: `${range.progress}%` }}>
                                                        <span className="learn-more-font-medium">
                                                            {range.value}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="ppi-wrapper">
                                        <div className="ppi-wrapper-title">
                                            <h3 className="learn-more-font-semibold">Offensive Action</h3>
                                            <span>-</span>
                                        </div>
                                        {offensiveActionsRangesData.map((range,index) => (
                                            <div key={index} className="ppi-range-wrapper">
                                                <p className="learn-more-font-medium">{range.title}</p>
                                                <div className="ppi-range">
                                                    <div style={{ width: `${range.progress}%` }}>
                                                        <span className="learn-more-font-medium">
                                                            {range.value}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="learn-more-imgs-frame"
                        style={{ display: `${currentTab == "ppiNumber" ? "block" : "none"}` }}>
                        <Image
                            src={union}
                            alt="union"
                            className="imgs-frame-union"
                            width="auto"
                            heigh="auto"
                        />
                        <Image src={learnmore} alt="learnmore" className="imgs-learn-img" />
                    </div>
                </div>
            </div>
        </>
    );
}
