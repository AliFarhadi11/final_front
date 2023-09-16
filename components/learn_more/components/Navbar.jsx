import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    let router = useRouter()
    const linksList = [
        { title: "1", path: "/learn-more" },
        { title: "2", path: "/learn-more/filters" },
        { title: "3", path: "/learn-more/ppi" },
        { title: "4", path: "/learn-more/duels" },
        { title: "5", path: "/learn-more/ppi-number" },
    ];

    return (
        <nav className="learn-more-navbar">
            <ul>
                {linksList.map((link, index) => (
                    <li key={index}>
                        <Link isActive
                            href={link.path}
                            className={link.path === router.pathname  ? "navbar-link active" : "navbar-link"}
                            >
                            {link.title}
                        </Link> 
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
