import React from "react";
import Link from "next/link";
import Image from "next/image";
import breadcrumb_chevron from "../../public/images/breadcrumb_chevron.svg";
import SearchBox from "../utility/SearchBox";

const BreadCrumbSearchBox = ({ current, path, search = true }) => {
    return (
        <div className="mt-4 mb-3">
            <div className="row gy-4 px-3 px-md-0">
                <div className="col-md-6 col-12 breadcrumb d-flex">
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <Image src={breadcrumb_chevron} alt="chevron" width="auto" height="auto" unoptimized />
                        <li className="active">
                            <Link href={path}>{current}</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-md-6 col-12 d-flex justify-content-center justify-content-md-end">{search && <SearchBox styles={"bc"} />}</div>
            </div>
        </div>
    );
};

export default BreadCrumbSearchBox;
