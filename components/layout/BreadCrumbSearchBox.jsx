import React from "react";
import Link from "next/link";
import Image from "next/image";
import breadcrumb_chevron from "../../public/images/breadcrumb_chevron.svg";
import SearchBox from "../utility/SearchBox";

const BreadCrumbSearchBox = ({ current, path, search = true }) => {
    return (
        <div className="mt-4 mb-3">
            <div className="row">
                <div className="col breadcrumb d-none d-lg-flex">
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <Image src={breadcrumb_chevron} alt="chevron" width="auto" height="auto" unoptimized />
                        <li className="active">
                            <Link href={path}>{current}</Link>
                        </li>
                    </ul>

                    <div className="col d-flex justify-content-end px-0"></div>
                    {search && <SearchBox styles={"bc"}/>}
                    <div />
                </div>
            </div>
        </div>
    );
};

export default BreadCrumbSearchBox;
