import Image from "next/image";
import { useState } from "react";
import style from "@/styles/submit.module.css";
import { PostCard } from "@/components/Elements/Cards";

export default function Home() {
    const [formData, setFormData] = useState({
        batch_name: "",
        centre_id: null,
        start_date: "",
        variant_id: null,
        batch_slots: [
            {
                day_id: "",
                start_time: "",
                duration_in_minutes: "",
            },
            {
                day_id: "",
                start_time: "",
                duration_in_minutes: "",
            },
            {
                day_id: "",
                start_time: "",
                duration_in_minutes: "",
            },
        ],
    });
    return (
        <main className={style.main}>
            <p className={style.heading}>Submit a Tool</p>
            <div className={style.center}>
                <div className={style.tint}></div>
                <div className={["input-box", style.Input].join(" ")}>
                    <label>Your Full Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                name: event.target.value,
                            })
                        }
                    />
                </div>
                <div className={["input-box", style.Input].join(" ")}>
                    <label>Email ID</label>
                    <input
                        type="email"
                        placeholder="email@gmail.com"
                        value={formData.email}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                email: event.target.value,
                            })
                        }
                    />
                </div>
                <div className={["input-box",].join(" ")}>
                    <label>Tool Name</label>
                    <input
                        type="email"
                        placeholder="email@gmail.com"
                        value={formData.email}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                email: event.target.value,
                            })
                        }
                    />
                </div>
                <div className={["input-box",  style.textArea].join(" ")}>
                    <label>Tool Description</label>
                    <input
                        type="textarea"
                        placeholder="email@gmail.com"
                        value={formData.email}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                email: event.target.value,
                            })
                        }
                    />
                </div>
                <div className={["input-box", style.Input].join(" ")}>
                    <label>Website URL</label>
                    <input
                        type="email"
                        placeholder="email@gmail.com"
                        value={formData.email}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                email: event.target.value,
                            })
                        }
                    />
                </div>
                <div className={["input-box", style.Input].join(" ")}>
                    <label>Select Categories</label>
                    <input
                        type="email"
                        placeholder="email@gmail.com"
                        value={formData.email}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                email: event.target.value,
                            })
                        }
                    />
                </div>
                <div className={["input-box", style.Input].join(" ")}>
                    <label>Select Features</label>
                    <input
                        type="email"
                        placeholder="email@gmail.com"
                        value={formData.email}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                email: event.target.value,
                            })
                        }
                    />
                </div>
                <div className={["input-box", style.Input].join(" ")}>
                    <label>Do you own this tool?</label>
                    <input
                        type="email"
                        placeholder="email@gmail.com"
                        value={formData.email}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                email: event.target.value,
                            })
                        }
                    />
                </div>
            </div>
        </main>
    );
}
