import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import login_icon from "../../public/images/login_icon.svg";
import signup_icon from "../../public/images/signup_icon.svg";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UserMenu from "../user_profile/UserMenu";

import logo from "../../public/images/logo.png";
import text_logo from "../../public/images/text_logo.png";
import SelectLang from "./SelectLang";

export default function Header() {
    let router = useRouter();
    const [isToggled, setIsToggled] = useState(false);
    const user = useSelector((state) => state.user.value);

    return (
        <>
            <header className={`${router.pathname == "/learn-more" ? "header mb-0 position-relative" : "header position-relative"}`}>
                <nav className="header-nav d-flex justify-content-between align-items-center">
                    {/* BrandName */}
                    <Link href="/" className="brandname">
                        <Image
                            src={text_logo}
                            width="147"
                            height="auto"
                            alt="playersCube"
                            className="d-lg-block d-none"
                        />
                        <Image
                            src={logo}
                            width="40"
                            height="auto"
                            alt="playersCube"
                            className="d-lg-none d-block"
                        />
                    </Link>

                    {/* NavbarRight - SearchForm & SignUp-SignIn & SetLanguage */}
                    <div className="nav-right-links d-flex align-items-center d-lg-flex d-none">
                        {isEmpty(user) && (
                            <>
                                <div className="nav-right d-flex align-items-center">
                                    <Link href="/signin" className="gradient-cta signup">
                                        <span>SIGN IN</span>
                                        <Image src={login_icon} alt="login" width={18} height={18} />
                                    </Link>
                                    <Link href="/signup" className="gradient-cta signup">
                                        <span>SIGN UP</span>
                                        <Image src={signup_icon} alt="signup" width={16} height={16} />
                                    </Link>
                                </div>
                            </>
                        )}
                        {!isEmpty(user) && (
                            <>
                                <Grid2
                                    item
                                    container
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    sx={{ mx: 0 }}>
                                    <UserMenu user={user} />
                                </Grid2>
                            </>
                        )}
                        <SelectLang />
                    </div>
                    {/* Mobile Nav */}
                    <div
                        className="d-block d-lg-none cursor-pointer"
                        onClick={() => setIsToggled((prev) => !prev)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="18"
                            viewBox="0 0 26 18"
                            fill="none">
                            <path d="M1 1H25" stroke="#1252C6" strokeWidth="2" strokeLinecap="round" />
                            <path d="M1 9H25" stroke="#1252C6" strokeWidth="2" strokeLinecap="round" />
                            <path d="M1 17H25" stroke="#1252C6" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                        <div className={isToggled ? "menu active" : "menu"}>
                            {isEmpty(user) && (
                                <>
                                    <div className="nav-right d-flex align-items-center flex-column">
                                        <Link href="/signin" className="gradient-cta signup">
                                            <span>SIGN IN</span>
                                            <Image src={login_icon} alt="login" width={18} height={18} />
                                        </Link>
                                        <Link href="/signup" className="gradient-cta signup">
                                            <span>SIGN UP</span>
                                            <Image src={signup_icon} alt="signup" width={16} height={16} />
                                        </Link>
                                    </div>
                                </>
                            )}

                            {!isEmpty(user) && (
                                <>
                                    <Grid2
                                        item
                                        container
                                        justifyContent="flex-end"
                                        alignItems="center"
                                        sx={{ mx: 0 }}>
                                        <UserMenu user={user} />
                                    </Grid2>
                                </>
                            )}
                            <SelectLang />
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
