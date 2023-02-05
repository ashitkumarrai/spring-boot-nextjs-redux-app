import Link from "next/link";
import style from "./smbar.module.css";
import Image from "next/image";

const pages = [
    {
        name: "Facebook",
        icon: "/icons/fb_icon.ico",
        link: "/",
    },
    {
        name: "Twitter",
        icon: "/icons/tw.ico",
        link: "/",
    },
    {
        name: "Instagram",
        icon: "/icons/insta.ico",
        link: "/",
    },
    {
        name: "Whatsapp",
        icon: "/icons/sup.ico",
        link: "/",
    },
    {
        name: "YouTube",
        icon: "/icons/yt.ico",
        link: "/",
    },
];
function SmBar() {
    return (
        <div className={style.sidebar}>
            <ul>
                {pages.map((entry, key) => (
                    <li key={entry.link}>
                        <Link href={entry.link}>
                            <Image
                                src={entry.icon}
                                alt={entry.name}
                                width={32}
                                height={32}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SmBar;
