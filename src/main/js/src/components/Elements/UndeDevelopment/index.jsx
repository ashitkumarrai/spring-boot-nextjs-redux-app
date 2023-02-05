import style from "./underDev.module.css";
//components
import Link from "next/link";

export default function UnderDevelopment() {
    return (
        <div className={style.wrap}>
            <h2 className={style.mainText}>
                <Link href="/" passHref>
                    {" "}
                    IMS Samay
                </Link>
            </h2>
            <div className={style.logo}>This page is under development</div>

            <footer className={style.siteFooter}>
                <span>We are extremely thankful for your patience.</span>
            </footer>
        </div>
    );
}
