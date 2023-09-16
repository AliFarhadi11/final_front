import Image from "next/image";
import { Button, } from "@mui/material";
import NextLink from "next/link";
import Dialogs from "./Dialogs";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import call_icon from "../../../public/images/call_icon.svg";
import footer_divider from "../../../public/images/footer_divider.svg";
import instagram_icon from "../../../public/images/instagram_icon.svg";
import twitter_icon from "../../../public/images/twitter_icon.svg";

export default function Footer() {

    const [show, setShow] = useState(false);
    const [mode, setMode] = useState("FAQ");
    const handleDialogs = (mymode) => {
        setMode(mymode);

        setShow(true);
    };

    return (
        <>
            <Dialogs mode={mode} show={show} setShow={setShow} />
            <footer className="bg-special-dark footer">
                <Image
                    src={footer_divider}
                    width="auto"
                    height="auto"
                    alt="footer_divider"
                    className="divider footer-divider"
                />
                <div className="container-fuild pt-4 px-4">
                    {/* BrandName Row */}
                    <div className="row">
                        <div className="col text-center">
                            <NextLink href="/" className="footer-brandname">
                                PlayersCube
                            </NextLink>
                        </div>
                    </div>
                    {/* Form Row */}
                    <div className="row">
                        <div className="col d-flex justify-content-center mt-4">
                            <form className="footer-email-form font-gilroy-medium">
                                <input type="email" placeholder="Enter your email" />
                                <button type="submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                    {/* Useful Liks Row */}
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-lg-8 col-xl-5 d-flex justify-content-between flex-wrap gap-3 mt-5">
                            {/* Home */}
                            <NextLink href="/">
                                <Button sx={{ borderRadius: 3, color: "#e4ff2b52", fontSize: "16px" }}>
                                    <FormattedMessage id="Footer.home" />
                                </Button>
                            </NextLink>
                            {/* About */}
                            <NextLink href="/about">
                                <Button sx={{ borderRadius: 3, color: "#6c6d6f", fontSize: "16px" }}>
                                    <FormattedMessage id="Footer.about" />
                                </Button>
                            </NextLink>
                            {/* FAQs Modal */}
                            <Button
                                onClick={() => handleDialogs("FAQ")}
                                sx={{
                                    borderRadius: 3,
                                    color: "#6c6d6f",
                                    fontSize: "16px",
                                }}>
                                <FormattedMessage id="Footer.faq" />
                            </Button>
                            {/* Privacy and Policy Modal */}
                            <Button
                                onClick={() => handleDialogs("Privacy Policy")}
                                sx={{
                                    borderRadius: 3,
                                    color: "#6c6d6f",
                                    fontSize: "16px",
                                }}>
                                <FormattedMessage id="Footer.polici" />
                            </Button>
                            {/* Term of Use Modal */}
                            <Button
                                onClick={() => handleDialogs("Term of Use")}
                                sx={{
                                    borderRadius: 3,
                                    color: "#6c6d6f",
                                    fontSize: "16px",
                                }}>
                                <FormattedMessage id="Footer.term" />
                            </Button>
                        </div>
                    </div>
                    {/* Copyright Row */}
                    <div className="row pt-4 pb-2 border-top mt-4">
                        {/* <div className="col">
                            <div className="d-flex justify-content-sm-start align-items-center gap-2 justify-content-center">
                                <button className="font-gilroy-medium footer-lang-btn active">English</button>
                                <button className="font-gilroy-medium footer-lang-btn">Persian</button>
                                <button className="font-gilroy-medium footer-lang-btn">German</button>
                            </div>
                        </div> */}
                        <div className="col d-flex justify-content-center align-items-center gap-2 mt-4 mt-sm-0">
                            <div className="social">
                                <NextLink href="#">
                                    <Image src={call_icon} alt="call" width="auto" height="auto" unoptimized />
                                </NextLink>
                            </div>
                            <div className="social">
                                <NextLink href="#">
                                    <Image
                                        src={twitter_icon}
                                        alt="Twitter"
                                        width="auto"
                                        height="auto"
                                        unoptimized
                                    />
                                </NextLink>
                            </div>
                            <div className="social">
                                <NextLink target="_blank" rel="noreferrer" href="https://www.instagram.com/playerscube/">
                                    <Image
                                        src={instagram_icon}
                                        alt="Instagram"
                                        width="auto"
                                        height="auto"
                                        unoptimized
                                    />
                                </NextLink>
                            </div>
                        </div>
                        <div className="col-12 col-lg text-center text-white d-flex align-items-center justify-content-center justify-content-lg-end mt-5 mt-lg-0">
                            <p className="mb-0">Non Copyrighted © 2022 Upload by rich technologies</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
