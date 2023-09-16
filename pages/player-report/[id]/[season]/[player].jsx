import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
    Select,
    MenuItem,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Grid,
} from "@mui/material";
import Skeleton from '@mui/material/Skeleton';


import { Tooltip as Materialtooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumbSearchBox from "../../../../components/layout/BreadCrumbSearchBox";

import alert_icon from "../../../../public/images/alert_icon.svg";
import instagram_outline_icon from "../../../../public/images/instagram_outline_icon.svg";
import twitter_outline_icon from "../../../../public/images/twitter_outline_icon.svg";

import { useEffect, useState } from "react";
// import RadarChart from "../../../../components/charts/radarChart";
import PlayerPerformanceChart from "../../../../components/charts/PlayerPerformanceChart";
import AVGRatingChart from "../../../../components/charts/AVGRatingChart";
import { useRouter } from "next/router";
import { requestPlayerInformation } from "../../../../request_services/PlayersService";
import { addPlayerReport } from "../../../../redux/reducers";
import { isEmpty } from "lodash";

import {
    Chart as ChartJs,
    LineElement,
    PointElement,
    Tooltip,
    RadialLinearScale,
    Filler,
} from "chart.js";
import { Radar } from "react-chartjs-2";
ChartJs.register(LineElement, PointElement, Tooltip, RadialLinearScale, Filler);

function createData(data) {
    return (
        {
            labels: ["DEF", "CRE", "TAC", "xG", "ATT"],
            datasets: [
                {
                    label: "",
                    data: data,
                    fill: true,
                    backgroundColor: "rgba(2, 99, 255, 0.16)",
                    borderColor: "rgba(2, 99, 255, 0.3)",
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#A10000",
                },
            ],
        }
    )
}

const RadarChart = ({ radar_data, }) => {
    const options = {
        elements: {
            line: {
                borderWidth: 2,
            },
        },

        responsive: true,
    };

    return <Radar options={options} data={createData(radar_data)} ></Radar>
}

function PlayerReport() {
    const contorlers = useSelector((state) => state.contorlers.value);
    const player_report = useSelector((state) => state.player_report.value);
    const router = useRouter()
    const [season, setSeason] = useState("2022");
    const [detail, setDetail] = useState("2022");
    const [isExpanded, setIsExpanded] = useState(false);
    const [activePageView, setActivePageView] = useState("playOverview");
    const [isPlay, setIsPlay] = useState(false);
    const dispatch = useDispatch()
    const [seasonList, setSeasonList] = useState([])
    const [history, setHistory] = useState([])
    const [radarData, setRadarData] = useState([0, 0, 0, 0, 0])
    const [barChartData, setBarChartData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [ratingsData, setRatingsData] = useState({
        labels: ['',],
        data: [0,]
    })

    const marketValue = (MarketValue) => {
        if (MarketValue < 999999)
            return ('€' + (MarketValue / 1000).toFixed(0) + 'k')
        if (MarketValue > 999999)
            return ('€' + (MarketValue / 1000000).toFixed(2) + 'm')

    }
    const handleGetPlayerInfo = async event => {
        try {
            const { status, data } = await requestPlayerInformation(router.query)
            if (status === 200) {
                dispatch(addPlayerReport(data))
                const list = []
                const hist = []
                const rating_hist = []
                data.details.forEach((item) => {
                    list.push(item.Season)
                    hist.push({ season: item.Season, joined: item.Club, marketValue: item.MarketValue, fee: item.Fee, })

                })
                list.sort()
                list.forEach((ses) => {
                    data.details.forEach((item) => {
                        if (item.Season === ses)
                            rating_hist.push(item.rating)

                    })

                })
                setRatingsData({
                    labels: list,
                    data: rating_hist
                })
                setSeasonList(list)
                setHistory(hist)
                if (router.query.season == 0)
                    setSeason(list[list.length - 1])
                else
                    setSeason(router.query.season)

            }
        }
        catch (ex) {

        }
    }

    useEffect(() => {
        if (!isEmpty(player_report) && player_report.details.length > 0)
            player_report.details.forEach((item) => {
                if (item.Season === season) {
                    setDetail(item)
                    let ATT = (Number(item.Sgls) + Number(item.Sast) + Number(item.Spk) + Number(item.Sxa) + Number(item.Sxg) + Number(item.Sxag) + Number(item.Ssh) + Number(item.Scrs)) / 8
                    let CRE = (Number(item.Sxa) + Number(item.Sxg) + Number(item.Sxag) + Number(item.Spass) + Number(item.Sdrb) + Number(item.Scri) + Number(item.Srec)) / 7
                    let TEC = (Number(item.Sxa) + Number(item.Sxg) + Number(item.Sxag) + Number(item.Ssh) + Number(item.Spass) + Number(item.Sdrb) + Number(item.Stch) + Number(item.Scri) + Number(item.Scrs) + Number(item.Srec)) / 10
                    let DEF = (Number(item.Stkl) + Number(item.Sblk) + Number(item.Sint) + Number(item.Sclr) + Number(item.Srec) + Number(item.Sarl) + Number(item.Sprs)) / 7

                    setRadarData([(DEF * 100).toFixed(0), (CRE * 100).toFixed(0), (TEC * 100).toFixed(0), (Number(item.xG)).toFixed(0), (ATT * 100).toFixed(0)])
                    setBarChartData([
                        item.Sast,
                        item.Spk,
                        item.Sgls,
                        item.Ssh,
                        item.Spass,
                        item.Scrs,
                        item.Stkl,
                        item.Sprs,
                        item.Sblk,
                        item.Sint,
                        item.Sclr,
                        item.Stch,
                        item.Sdrd,
                        item.Scri,
                        item.Srecov,
                        item.Sarl,
                        item.Sfls,
                    ])
                }
            })
    }, [season])



    useEffect(() => {
        if (router.query.id)
            handleGetPlayerInfo()
    }, [router.query])


    const handleChange = (event) => {
        setSeason(event.target.value);
    };


    return (
        <>
            <Head>
                <meta name="robots" content="noindex,nofollow" />
                <title>Soccer Player Information System</title>
                <title>
                    {" "}
                    {contorlers.lang === "fa" ? "انتخاب بازیکنان برتر فوتبال" : "Soccer Player Report"}{" "}
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


            {(!isEmpty(player_report) && player_report.details.length > 0) ?

                <main className="player-system-container container-fluid">
                    <BreadCrumbSearchBox current={"Player Report"} path={"player-report"} />

                    <div className="report-section-links my-4 d-md-flex d-none">
                        <a
                            href="#play-overview"
                            className={activePageView == "playOverview" ? "active" : ""}
                            onClick={() => setActivePageView("playOverview")}>
                            Ply Overview
                        </a>
                        <a
                            href="#transfer-history"
                            className={activePageView == "transferHistory" ? "active" : ""}
                            onClick={() => setActivePageView("transferHistory")}>
                            Transfer History
                        </a>
                        <a
                            href="#play-stats"
                            className={activePageView == "playStats" ? "active" : ""}
                            onClick={() => setActivePageView("playStats")}>
                            Ply Stats
                        </a>
                        <a
                            href="#play-rating"
                            className={activePageView == "playRating" ? "active" : ""}
                            onClick={() => setActivePageView("playRating")}>
                            Ply Rating
                        </a>
                        <a
                            href="#video"
                            className={activePageView == "video" ? "active" : ""}
                            onClick={() => setActivePageView("video")}>
                            Video
                        </a>
                    </div>

                    <div className="player-report">
                        <div className="row gap-lg-0 gap-4 mb-3" id="play-overview">
                            <div className="col-12 col-lg">
                                <div className="report-title d-flex align-items-center">
                                    <h4>General Information</h4>
                                </div>

                                <div className="report-wrapper general-info mt-3">
                                    <div className="info-wrapper">
                                        <div>
                                            {/* <div className="player-image-wrapper mb-3 mt-3"></div> */}
                                            <img
                                                src={`https://playerscubestore.storage.iran.liara.space/players/${detail.Player}.jpg`}
                                                loading="lazy"
                                                className="player-info-img"
                                                alt={detail.Player} />

                                            <div
                                                id="playerRank"
                                                className="py-1 px-2 d-flex justify-content-between align-items-center mt-4 mb-2">
                                                <span className="font-gilroy-Medium">Rank</span>
                                                <span className="font-gilroy-Medium">{Number(detail.ranking).toFixed(0)}</span>
                                            </div>
                                            <div
                                                id="playerRate"
                                                className="py-1 px-2 d-flex justify-content-between align-items-center mb-3">
                                                <span className="font-gilroy-Medium">Rate</span>
                                                <span className="font-gilroy-Medium">{Number(detail.rating).toFixed(2)}</span>
                                            </div>

                                            <div className="mb-3 d-flex justify-content-between align-items-center mt-4">
                                                <span>Height:</span>
                                                <span>{player_report.player.Height}</span>
                                            </div>
                                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                                <span>Foot:</span>
                                                <span>{player_report.player.Foot}</span>
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center mt-4">
                                                {!isEmpty(player_report.player.Instagram) && player_report.player.Instagram !=' ' && <Link
                                                    target="_blank" rel="noreferrer"
                                                    href={player_report.player.Instagram} >
                                                    <Image
                                                        src={instagram_outline_icon}
                                                        width="auto"
                                                        height="auto"
                                                        alt="Instagram"
                                                    />
                                                </Link>}
                                                {!isEmpty(player_report.player.Twitter) && player_report.player.Twitter !=' ' && <Link
                                                    target="_blank" rel="noreferrer"
                                                    href={"https://www.twitter.com/" + player_report.player.Twitter}>
                                                    <Image
                                                        src={twitter_outline_icon}
                                                        width="auto"
                                                        height="auto"
                                                        alt="twiiter"
                                                    />
                                                </Link>}
                                                {!isEmpty(player_report.player.Facebook) && player_report.player.Facebook !=' '  && <Link
                                                    target="_blank" rel="noreferrer"
                                                    href={"https://www.facebook.com/" + player_report.player.Twitter}>
                                                    <Image
                                                        src={twitter_outline_icon}
                                                        width="auto"
                                                        height="auto"
                                                        alt="facebook"
                                                    />
                                                </Link>}
                                            </div>
                                        </div>

                                        <div>
                                            {/* Info */}
                                            <div className="row mb-4 mt-3">
                                                <span className="cold-md-7 col text-capitilize">Name:</span>
                                                <span className="col font-gilroy-semibold text-end text-md-start">
                                                    {player_report.player.name}
                                                </span>
                                            </div>
                                            {/* Info */}
                                            <div className="row mb-4">
                                                <span className="cold-md-7 col text-capitilize">
                                                    Date Of Birth:
                                                </span>
                                                <span className="col font-gilroy-semibold text-end text-md-start">
                                                    {player_report.player.Birthday}
                                                </span>
                                            </div>
                                            {/* Info */}
                                            <div className="row mb-4">
                                                <span className="cold-md-7 col text-capitilize">Nation:</span>
                                                <span className="col font-gilroy-semibold text-end text-md-start">
                                                    {player_report.player.Citizenship}
                                                </span>
                                            </div>
                                            {/* Info */}
                                            <div className="row mb-4">
                                                <span className="cold-md-7 col text-capitilize">
                                                    Main Position:
                                                </span>
                                                <span className="col font-gilroy-semibold text-end text-md-start">
                                                    {detail.MainPositon}
                                                </span>
                                            </div>
                                            {/* Info */}
                                            <div className="row mb-4">
                                                <span className="cold-md-7 col text-capitilize">Current Club:</span>
                                                <span className="col font-gilroy-semibold text-end text-md-start">
                                                    {" "}
                                                    {detail.Club}
                                                </span>
                                            </div>
                                            {/* Info */}
                                            <div className="row mb-4">
                                                <span className="cold-md-7 col text-capitilize">
                                                    Nation Ply/Gls:
                                                </span>
                                                <span className="col font-gilroy-semibold text-end text-md-start">
                                                    {" "}
                                                    {detail.Caps}/{detail.CapsGoals}
                                                </span>
                                            </div>
                                            {/* Info */}
                                            <div className="row mb-4">
                                                <span className="cold-md-7 col text-capitilize">
                                                    Current Market value:
                                                </span>
                                                <span className="col font-gilroy-semibold text-end text-md-start">
                                                    {" "}
                                                    {marketValue(detail.MarketValue)}
                                                </span>
                                            </div>
                                            {/* Info */}
                                            <div className="row mb-4">
                                                <span className="cold-md-7 col text-capitilize">Contract Exp:</span>
                                                <span className="col font-gilroy-semibold text-end text-md-start">
                                                    {detail.ContractExpires}
                                                </span>
                                            </div>
                                            {/* Info */}
                                            <div className="row mb-4">
                                                <span className="cold-md-7 col text-capitilize">Agent:</span>
                                                <span className="col font-gilroy-semibold text-end text-md-start">
                                                    {detail.Agent}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg">
                                <div className="d-flex justify-content-between align-items-center report-title">
                                    <h4>Player Season Information</h4>

                                    <FormControl
                                        sx={{ width: 120 }}
                                        className={isExpanded ? "season-dropdown active" : "season-dropdown"}
                                        size="small">
                                        <Select value={season} onChange={handleChange}>
                                            {seasonList.map((item) =>
                                            (<MenuItem key={item} className="menu-item" value={item}>
                                                {item}
                                            </MenuItem>)
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="report-wrapper season-info mt-3">
                                    <div className="row justify-content-between">
                                        <div className="col-12 col-lg-6">
                                            {/* Info */}
                                            <div className="d-flex justify-content-between align-items-center mt-3 px-2 mb-4-5">
                                                <span className="text-capitilize">Match Played:</span>
                                                <span className="font-gilroy-semibold Text-end Text-md-Start">{detail.MP}</span>
                                            </div>
                                            {/* Info */}
                                            <div className="d-flex justify-content-between align-items-center px-2 mb-4-5">
                                                <span className="text-capitilize">Minute Played:</span>
                                                <span className="font-gilroy-semibold">{detail.Min}</span>
                                            </div>
                                            {/* Info */}
                                            <div className="d-flex justify-content-between align-items-center mb-4-5 px-2">
                                                <span className="text-capitilize">Goals:</span>
                                                <span className="font-gilroy-semibold">{detail.Gls}</span>
                                            </div>
                                            {/* Info */}
                                            <div className="d-flex justify-content-between align-items-center mb-4-5 px-2">
                                                <span className="text-capitilize">Assists:</span>
                                                <span className="font-gilroy-semibold">{detail.Ast}</span>
                                            </div>
                                            {/* Info */}
                                            <div className="d-flex justify-content-between align-items-center mb-4-5 px-2">
                                                <span className="text-capitilize">xG:</span>
                                                <span className="font-gilroy-semibold">{Number(detail.xG).toFixed(1)}</span>
                                            </div>
                                            {/* Info */}
                                            <div className="d-flex justify-content-between align-items-center mb-4-5 px-2">
                                                <span className="text-capitilize">xA:</span>
                                                <span className="font-gilroy-semibold">{Number(detail.xA).toFixed(1)}</span>
                                            </div>
                                            {/* Info */}
                                            <div className="d-flex justify-content-between align-items-center mb-4-5 px-2">
                                                <span className="card yellow"></span>
                                                <span className="font-gilroy-semibold">{detail.CrdY}</span>
                                            </div>
                                            {/* Info */}
                                            <div className="d-flex justify-content-between align-items-center mb-4-5 px-2">
                                                <span className="card red"></span>
                                                <span className="font-gilroy-semibold">{detail.CrdR}</span>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-5 chart-wrapper">
                                            <Materialtooltip title="Tip, Tip" arrow className="tool-tip">
                                                <Button>
                                                    <Image src={alert_icon} alt="tip" width="auto" height="auto" />
                                                </Button>
                                            </Materialtooltip>
                                            <RadarChart radar_data={radarData} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3 mt-4" id="transfer-history">
                            <div className="col-12">
                                <div className="report-wrapper info-table">
                                    <div className="d-flex mb-4 mt-2 px-2">
                                        <h4 className="mb-1 mt-2">Transfer History</h4>
                                    </div>
                                    <TableContainer
                                        component={Paper}
                                        sx={{ background: "transparent", boxShadow: "unset" }}
                                        className="report-table">
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Season</TableCell>
                                                    <TableCell align="left">Joined</TableCell>
                                                    <TableCell align="left">Market Value</TableCell>
                                                    <TableCell align="left">Fee</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ fontFamily: "Gilroy-semiBold" }}>
                                                {history.map((row, idx) => (
                                                    <TableRow
                                                        key={idx}
                                                        sx={{
                                                            "&:last-child td, &:last-child th": { border: 0 },
                                                        }}>
                                                        <TableCell>{row.season}</TableCell>
                                                        <TableCell align="left">{row.joined}</TableCell>
                                                        <TableCell align="left">{marketValue(row.marketValue)}</TableCell>
                                                        <TableCell align="left">{row.fee}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3 mt-4" id="play-stats">
                            <div className="col-12">
                                <div className="report-wrapper stats-info">
                                    <h4 className="text-center mb-4 mt-3">Player Performance Report</h4>

                                    <PlayerPerformanceChart barChartData={barChartData} />
                                </div>
                            </div>
                        </div>
                        <div className="row gap-lg-0 gap-4 mt-4">
                            <div className="col-12 col-lg-6" id="video">
                                <div className="report-wrapper video-highlights">
                                    <h4 className="gradient-title">Video Highlights</h4>

                                    <div className="video-wrapper">
                                        <iframe
                                            width="853" height="480"
                                            src={player_report.player.Video}
                                            title="YouTube video player"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowfullscreen></iframe>
                                            {/* <iframe width="853" height="480" 
                                            src="https://www.youtube.com/embed/CkGe56FMJxw" 
                                            title="Vincenzo Grifo is so Underrated.." frameborder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                                        <div
                                            className="thumbnail"
                                            style={{ display: `${isPlay} ` ? "none" : "flex" }}>
                                            <h5>Video Title</h5>
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
                                                tenetur.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6" id="play-rating">
                                <div className="report-wrapper avg-rating">
                                    <h4 className="gradient-title">Rating History</h4>

                                    <AVGRatingChart ratingsData={ratingsData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                :
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                >


                    <Skeleton variant="rectangular" width='90%' height={410} sx={{ borderRadius: 5, my: 10 }} />
                </Grid>
            }

        </>
    );
}

export default PlayerReport;
