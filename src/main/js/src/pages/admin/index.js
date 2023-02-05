import React, { useState, useEffect } from "react";
import { calculateRange, sliceData } from "../../utils/table-pagination";

import style from "@styles/admin.module.css";
import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import RefundedIcon from "../../assets/icons/refunded.svg";

function Orders() {
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        setPagination(calculateRange([], 5));
        setOrders(sliceData([], page, 5));
    }, []);

    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== "") {
            let search_results = orders.filter(
                (item) =>
                    item.first_name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.last_name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.product.toLowerCase().includes(search.toLowerCase())
            );
            setOrders(search_results);
        } else {
            __handleChangePage(1);
        }
    };

    // Change Page
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setOrders(sliceData([], new_page, 5));
    };

    return (
        <div className={style.dashboard}>
            <div className={style.dashboardContentContainer}>
                <div className={style.dashboardcontentheader}>
                    <h2>Tools List</h2>
                    <div className={style.dashboardcontentsearch}>
                        <input
                            type="text"
                            value={search}
                            placeholder="Search.."
                            className={style.dashboardcontentinput}
                            onChange={(e) => __handleSearch(e)}
                        />
                    </div>
                </div>

                <table className={style.table}>
                    <thead>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>HASHTAGS</th>
                        <th>TYPE</th>
                        <th>ACTION</th>
                    </thead>

                    {orders.length !== 0 ? (
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>
                                        <span>{order.id}</span>
                                    </td>
                                    <td>
                                        <span>{order.date}</span>
                                    </td>
                                    <td>
                                        <div>
                                            {order.status === "Paid" ? (
                                                <img
                                                    src={DoneIcon}
                                                    alt="paid-icon"
                                                    className={
                                                        style.dashboardcontentavatar
                                                    }
                                                />
                                            ) : order.status === "Canceled" ? (
                                                <img
                                                    src={CancelIcon}
                                                    alt="canceled-icon"
                                                    className={
                                                        style.dashboardcontentavatar
                                                    }
                                                />
                                            ) : order.status === "Refunded" ? (
                                                <img
                                                    src={RefundedIcon}
                                                    alt="refunded-icon"
                                                    className={
                                                        style.dashboardcontentavatar
                                                    }
                                                />
                                            ) : null}
                                            <span>{order.status}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <img
                                                src={order.avatar}
                                                className={
                                                    style.dashboardcontentavatar
                                                }
                                                alt={
                                                    order.first_name +
                                                    " " +
                                                    order.last_name
                                                }
                                            />
                                            <span>
                                                {order.first_name}{" "}
                                                {order.last_name}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span>{order.product}</span>
                                    </td>
                                    <td>
                                        <span>${order.price}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : null}
                </table>

                {orders.length !== 0 ? (
                    <div className={style.dashboardcontentfooter}>
                        {pagination.map((item, index) => (
                            <span
                                key={index}
                                className={
                                    item === page
                                        ? "active-pagination"
                                        : "pagination"
                                }
                                onClick={() => __handleChangePage(item)}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className={style.dashboardcontentfooter}>
                        <span className={style.emptytable}>No data</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;
