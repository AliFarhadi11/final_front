import StarIcon from "@mui/icons-material/Star";
import { Avatar, Button, Grid, Typography, Tooltip, Link } from "@mui/material";
import { isEmpty } from "lodash";
import Skeleton from "@mui/material/Skeleton";
import { FormattedMessage } from "react-intl";
import Image from "next/image";

export default function PlayerCard({ index, player, rating, season }) {
    return (
        <div className="player-card" key={index}>
            {/* image */}
            <div className="d-flex justify-content-center">
                <Image
                    src={
                        isEmpty(player)
                            ? "/images/plyicon2.png"
                            : `https://playerscubestore.storage.iran.liara.space/players/${player.Player}.jpg`
                    }
                    className="card-image"
                    loading="lazy"
                    width="125"
                    height="125"
                    alt={player.Player}
                />
            </div>
            <div className="d-flex align-items-center justify-content-center gap-3 player-card_rating">
                <div className="d-flex align-items-center justify-content-between px-2 py-1">
                    <span>Rank</span>
                    <span>{player?.ranking}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between px-2 py-1">
                    <span>Rate</span>
                    <span className="d-flex aling-items-center">
                        <StarIcon fontSize="small" color="ranking" />
                        {Number(player?.rating).toFixed(2)}
                    </span>
                </div>
            </div>
            <h5 className="mt-3 text-center">{player?.Player}</h5>
            <div className="d-flex align-items-center justify-content-center gap-2">
                <Tooltip title={player?.Nation}>
                    <Image
                        width="25"
                        height="25"
                        alt={player?.Nation}
                        className="player-nation_club"
                        src={`https://playerscubestore.storage.iran.liara.space/nations/${player?.Nation}.png`}
                        unoptimized
                    />
                </Tooltip>
                <Tooltip title={player?.club}>
                    <Image
                        width="25"
                        height="25"
                        alt={player?.club}
                        className="player-nation_club"
                        src={`https://playerscubestore.storage.iran.liara.space/leagues/${player?.League}.png`}
                    />
                </Tooltip>
            </div>
            <h6 className="text-center mt-3">{player?.Club}</h6>
            <div className="d-flex gap-3 align-items-center justify-content-center player-card_posage">
                <span className="py-1 px-2">Age: {player?.Age}</span>
                <span className="py-1 px-2">{player?.Position}</span>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Button className="view-profile">
                    <Link
                        target="_blank"
                        rel="noreferrer"
                        href={`player-report/${player?.player.id}/${season}/${player?.Player}`}>
                        View Profile
                    </Link>
                </Button>
            </div>
        </div>
    );
}

