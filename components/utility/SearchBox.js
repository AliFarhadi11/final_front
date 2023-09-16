import React, { useEffect, useRef, useState, useTransition } from "react";
import { requestPlayerSearching } from "../../request_services/PlayersService";
import search_icon from "../../public/images/search_icon.svg";
import Image from "next/image";
import { Button } from "@mui/material";
import Link from "next/link";

function SearchBox({ styles }) {
    const [isPending, startTransition] = useTransition();
    const [searchList, setSearchList] = useState([]);
    const [inputValue, setInputValue] = useState("");


    const handleSearching = async (name) => {
        try {
            const { status, data } = await requestPlayerSearching({ name: name });
            if (status === 200) {
                setSearchList(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);

        if (!isPending)
            startTransition(() => {
                if (inputValue.length > 2) {
                    handleSearching(inputValue);
                } else {
                    setSearchList([]);
                }
            });
    };

    const searchForm = useRef(null);

    const closeSearchResult = (e) => {
        if (searchForm.current && searchList.length > 0 && !searchForm.current.contains(e.target)) {
            setSearchList([]);
            setInputValue("")
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeSearchResult);
    });

    return (
        <form
            className={
                searchList.length > 0
                    ? `${styles} header-search-form searching`
                    : `${styles} header-search-form`
            }
            ref={searchForm}>
            <input
                type="text"
                placeholder="Search player..."
                onChange={(e) => handleChange(e)}
                value={inputValue}
            />
            <button>
                <Image src={search_icon} width="auto" height="auto" alt="search_icon" />
            </button>

            <ul className={searchList.length > 0 ? `search-result show` : `search-result`}>
                {searchList.length > 0 &&
                    searchList.map((item) => (
                        <li key={item.id}>
                            <Link
                                target="_blank"
                                rel="noreferrer"
                                href={`/player-report/${item.id}/0/${item.name}`}>
                                <Button>{item.name}</Button>
                            </Link>
                        </li>
                    ))}
            </ul>
        </form>
    );
}

export default SearchBox;

