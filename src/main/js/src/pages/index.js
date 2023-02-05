import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { PostCard } from "@/components/Elements/Cards";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.videoContainer}>video will here</div>
            <div className={styles.center}>
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </main>
    );
}
