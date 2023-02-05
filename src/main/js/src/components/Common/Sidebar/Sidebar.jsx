import Link from "next/link";
import style from "./sidebar.module.css";
import { useContext } from "react";
import { useRouter } from "next/router";
//Assets
import {
    MdHome,
    MdUploadFile,
    MdOutlineNewReleases,
    MdLocalFireDepartment,
    MdLeaderboard,
    MdOutlineHistory,
} from "react-icons/md";
import { HiHeart } from "react-icons/hi";
//context
import { ManagedUI } from "@contexts/ManagedUI";
import Divider from "@/components/Elements/Divider";
const pages = [
    {
        name: "Home",
        icon: <MdHome />,
        link: "/",
    },
    {
        name: "Submit",
        icon: <MdUploadFile />,
        link: "/submit",
    },
    {
        name: "Newly Added",
        icon: <MdOutlineNewReleases />,
        link: "/newlyadded",
    },
];
const adminPages = [
    {
        name: "All Tools",
        link: "/admin",
    },
    {
        name: "Top 10",
        link: "/admin/top10",
    },
    {
        name: "All Hashtags",

        link: "/admin/hashtags",
    },
];
const explore = [
    {
        name: "Trending",
        icon: <MdLocalFireDepartment />,
        link: "/trending",
    },
    {
        name: "Explore Top 10",
        icon: <MdLeaderboard />,
        link: "/top10",
    },
];
const libary = [
    {
        name: "Likes",
        icon: <HiHeart />,
        link: "/likes",
    },
    {
        name: "History",
        icon: <MdOutlineHistory />,
        link: "/history",
    },
];
const sublist = [
    "#imagegenerator",
    "#3Drendering",
    "#contentcreation",
    "#photoediting",
    "#videomaking",
];
function SideBar() {
    const { showSidebar, setShowSidebar } = useContext(ManagedUI);
    const pathName = useRouter().pathname.split("/");
    return (
        //Sidebar for dashboard page
        <div className={`${style.sidebar} ${showSidebar}`}>
            {pathName[1] === "admin" ? (
                <nav
                    className={[style.navigator, style[showSidebar]].join(" ")}
                >
                    <ul>
                        {adminPages.map((entry, key) => (
                            <Tabs key={key} pathName={pathName} data={entry} />
                        ))}
                    </ul>
                </nav>
            ) : (
                <div>
                    <nav
                        className={[style.navigator, style[showSidebar]].join(
                            " "
                        )}
                    >
                        <ul>
                            {pages.map((entry, key) => (
                                <Tabs
                                    key={key}
                                    pathName={pathName}
                                    data={entry}
                                />
                            ))}
                        </ul>
                    </nav>
                    <Divider length={"90%"} thickness="3px" />
                    <p className={style.heading}>Explore</p>
                    <nav
                        className={[style.navigator, style[showSidebar]].join(
                            " "
                        )}
                    >
                        <ul>
                            {explore.map((entry, key) => {
                                if (entry.link === "/top10") {
                                    return (
                                        <Tabs
                                            key={key}
                                            pathName={pathName}
                                            data={entry}
                                            sublist={sublist}
                                        />
                                    );
                                }
                                return (
                                    <Tabs
                                        key={key}
                                        pathName={pathName}
                                        data={entry}
                                        sublist={null}
                                    />
                                );
                            })}
                        </ul>
                    </nav>
                    <Divider length={"90%"} thickness="3px" />
                    <p className={style.heading}>Library</p>
                    <nav
                        className={[style.navigator, style[showSidebar]].join(
                            " "
                        )}
                    >
                        <ul>
                            {libary.map((entry, key) => {
                                return (
                                    <Tabs
                                        key={key}
                                        pathName={pathName}
                                        data={entry}
                                        sublist={null}
                                    />
                                );
                            })}
                        </ul>
                    </nav>
                    <Divider length={"90%"} thickness="3px" />
                    <nav className={style.sitemap}>
                        <ul>
                            <li className={style.sitemap}>
                                <Link href="/aboutus">About Us </Link>
                            </li>
                            <li className={style.sitemap}>
                                <Link href="/privacy">Privacy Policy</Link>
                            </li>
                            <li className={style.sitemap}>
                                <Link href="/contactus">Contact Us </Link>
                            </li>
                        </ul>
                        <p>
                            © 2021 <span>AI Pedia</span>. All Rights Reserved.
                        </p>
                    </nav>
                </div>
            )}
        </div>
    );
}
export default SideBar;
const Tabs = ({ pathName, data, sublist }) => {
    const { setShowSidebar } = useContext(ManagedUI);
    const link = data.link.split("/");
    const clax = pathName[1] === link[1] ? style.active : null;
    return (
        <li className={clax} onClick={() => setShowSidebar(null)}>
            <Link href={data.link}>
                <span>{data.icon}</span>
                {data.name}
            </Link>
            {sublist && (
                <ul className={style.sublist}>
                    {sublist.map((entry, key) => (
                        <li key={key} className={style.sublistItems}>
                            {entry}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};
