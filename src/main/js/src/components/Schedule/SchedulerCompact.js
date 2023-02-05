import React from "react";
import style from "@styles/calendar.module.css";
import Avatar from "@components/Elements/Avatar";
import { MdCheckCircle, MdCircle } from "react-icons/md";

//Assets
import OfflineIcon from "@public/Assets/offline_course.svg";
import OnlineIcon from "@public/Assets/online_course.svg";
import Divider from "@components/Elements/Divider";

const SchedulerCompact = (props) => {
    return (
        <div className={`${style.scheduler}`}>
            {/* loop over the response array */}
            {props.rows.length > 0 ? (
                props.rows.map((d) => {
                    // create date in required format
                    var parts = d.date.split("-");
                    var day = parts[2];
                    var month = parts[1];
                    var year = parts[0];

                    var date = new Date(year, month - 1, day);
                    var formattedDate = date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    });
                    const dateParts = formattedDate.split(",");
                    const finalDate = `${dateParts[0]}, ${dateParts[1]} ${dateParts[2]}`;

                    return (
                        <div key={d.date}>
                            <div className={`${style.dateRow}`}>
                                <span className={`${style.dateLabel}`}>
                                    {finalDate}
                                </span>
                            </div>
                            <table className={`${style.scheduleTable}`}>
                                {/* loop over the header array decalred in scheduler index */}
                                {/* <tr className={`${style.tableHeader}`}>
                                    {props.header.length > 0
                                        ? props.header.map((el) => (
                                              <td
                                                  key={el.value}
                                                  width={el.width}
                                                  style={{ textAlign: "left" ,minWidth:el.minWidth}}
                                              >
                                                  {el.name}
                                              </td>
                                          ))
                                        : null}
                                </tr> */}
                                {/* <tbody> */}

                                {/* loop over the events of a particular date */}
                                {d.items.length > 0
                                    ? d.items.map((el) => {
                                          // give background color to time according to class status
                                          var background =
                                              el.class_status == "NOT_STARTED"
                                                  ? "#E8F8E8"
                                                  : el.class_status ==
                                                    "COMPLETED"
                                                  ? "#F1F6F9"
                                                  : "#FDF2F2";
                                          var iconColor =
                                              el.class_status == "NOT_STARTED"
                                                  ? "#2BAB26"
                                                  : el.class_status ==
                                                    "COMPLETED"
                                                  ? "#B7C3C9"
                                                  : "#FF5858";

                                          return (
                                              <tr
                                                  key={el.id}
                                                  className={`${style.tableRow}`}
                                                  style={{
                                                      alignItems: "center",
                                                  }}
                                              >
                                                  {props.header.map((cell) => {
                                                      // condition for displaying check icon column
                                                      if (
                                                          cell.value == "icon"
                                                      ) {
                                                          var color =
                                                              props.selected.findIndex(
                                                                  (e) =>
                                                                      e.id ==
                                                                      el.id +
                                                                          " " +
                                                                          d.date
                                                              ) != -1
                                                                  ? "#0481fe"
                                                                  : "#F1F6F9";
                                                          return (
                                                              <td
                                                                  key={
                                                                      cell.value
                                                                  }
                                                                  width={
                                                                      cell.width
                                                                  }
                                                                  style={{
                                                                      color: color,
                                                                      fontSize:
                                                                          "1.5rem",
                                                                      justifyContent:
                                                                          "center",
                                                                      minWidth:
                                                                          cell.minWidth,
                                                                  }}
                                                                  className={
                                                                      style.tableCell
                                                                  }
                                                              >
                                                                  <MdCheckCircle
                                                                      onClick={() =>
                                                                          props.handleSelect(
                                                                              el,
                                                                              d.date
                                                                          )
                                                                      }
                                                                  />
                                                              </td>
                                                          );

                                                          //   condition for displaying the conflicts list in avatar component
                                                      } else if (
                                                          cell.value ==
                                                          "conflict"
                                                      ) {
                                                          return (
                                                              <td
                                                                  key={
                                                                      cell.value
                                                                  }
                                                                  width={
                                                                      cell.width
                                                                  }
                                                                  style={{
                                                                      alignItems:
                                                                          "center",
                                                                      minWidth:
                                                                          cell.minWidth,
                                                                  }}
                                                                  className={`${style.conflictVal}`}
                                                              >
                                                                  {el.is_mentor_conflict ? (
                                                                      <span>
                                                                          <Avatar
                                                                              userName="M"
                                                                              background="#FF5858"
                                                                              color="#fff"
                                                                          />
                                                                      </span>
                                                                  ) : null}
                                                                  {el.is_classroom_conflict ? (
                                                                      <span>
                                                                          <Avatar
                                                                              userName="C"
                                                                              background="#FF5858"
                                                                              color="#fff"
                                                                          />
                                                                      </span>
                                                                  ) : null}
                                                                  {el.is_batch_conflict ? (
                                                                      <span>
                                                                          <Avatar
                                                                              userName="B"
                                                                              background="#FF5858"
                                                                              color="#fff"
                                                                          />
                                                                      </span>
                                                                  ) : null}
                                                              </td>
                                                          );

                                                          //   condition for displaying the mentor name with its avatar component
                                                      } else if (
                                                          cell.value ==
                                                          "mentor_name"
                                                      ) {
                                                          return (
                                                              <td
                                                                  key={
                                                                      cell.value
                                                                  }
                                                                  width={
                                                                      cell.width
                                                                  }
                                                                  style={{
                                                                      color: cell.color,
                                                                      fontWeight:
                                                                          cell.fontWeight,
                                                                      minWidth:
                                                                          cell.minWidth,
                                                                  }}
                                                                  className={`${style.tableCell} ${style.noWrap}`}
                                                                  title={
                                                                      el[
                                                                          cell
                                                                              .value
                                                                      ]
                                                                  }
                                                                  onClick={() => {
                                                                      props.showDetails(
                                                                          el.id,
                                                                          d.date
                                                                      );
                                                                  }}
                                                              >
                                                                  {el[
                                                                      cell.value
                                                                  ] !=
                                                                  undefined ? (
                                                                      <div
                                                                          style={{
                                                                              width: "1.3rem",
                                                                              marginRight:
                                                                                  "0.5rem",
                                                                              height: "100%",
                                                                          }}
                                                                      >
                                                                          <Avatar
                                                                              background="#fff"
                                                                              userName={el[
                                                                                  cell
                                                                                      .value
                                                                              ].toUpperCase()}
                                                                          />
                                                                      </div>
                                                                  ) : null}
                                                                  {
                                                                      el[
                                                                          cell
                                                                              .value
                                                                      ]
                                                                  }
                                                              </td>
                                                          );

                                                          //   condition for displaying start_time,end_time and duration
                                                      } else if (
                                                          cell.value ==
                                                          "start_time"
                                                      ) {
                                                          var diff;
                                                          if (
                                                              el[cell.value] !=
                                                                  "" &&
                                                              el[cell.value] !=
                                                                  undefined
                                                          ) {
                                                              diff =
                                                                  el[
                                                                      "duration_in_seconds"
                                                                  ] / 60;
                                                          }
                                                          return (
                                                              <td
                                                                  key={
                                                                      cell.value
                                                                  }
                                                                  width={
                                                                      cell.width
                                                                  }
                                                                  style={{
                                                                      color: cell.color,
                                                                      fontWeight:
                                                                          cell.fontWeight,
                                                                      minWidth:
                                                                          cell.minWidth,
                                                                  }}
                                                                  className={
                                                                      style.tableCell
                                                                  }
                                                                  onClick={() => {
                                                                      props.showDetails(
                                                                          el.id,
                                                                          d.date
                                                                      );
                                                                  }}
                                                              >
                                                                  <div
                                                                      className={`${style.timeCell}`}
                                                                      style={{
                                                                          backgroundColor:
                                                                              background,
                                                                      }}
                                                                  >
                                                                      <MdCircle
                                                                          size={
                                                                              8
                                                                          }
                                                                          color={
                                                                              iconColor
                                                                          }
                                                                      />
                                                                      <span
                                                                          style={{
                                                                              color: "#231F20",
                                                                              fontWeight:
                                                                                  "500",
                                                                              margin: "0 0.5rem 0 0.4rem",
                                                                              display:
                                                                                  "flex",
                                                                              gap: "0.3rem",
                                                                          }}
                                                                      >
                                                                          <span
                                                                              style={{
                                                                                  width: "2rem",
                                                                              }}
                                                                          >
                                                                              {el[
                                                                                  "start_time"
                                                                              ].substr(
                                                                                  0,
                                                                                  5
                                                                              )}
                                                                          </span>
                                                                          -
                                                                          <span
                                                                              style={{
                                                                                  width: "2rem",
                                                                              }}
                                                                          >
                                                                              {el[
                                                                                  "end_time"
                                                                              ].substr(
                                                                                  0,
                                                                                  5
                                                                              )}
                                                                          </span>
                                                                      </span>{" "}
                                                                      <span
                                                                          style={{
                                                                              color: "#7E919A",
                                                                              marginLeft:
                                                                                  "1.5rem",
                                                                          }}
                                                                      >
                                                                          (
                                                                          {diff}{" "}
                                                                          min)
                                                                      </span>
                                                                  </div>
                                                              </td>
                                                          );

                                                          //   condition for displaying batch name along with batch id
                                                      } else if (
                                                          cell.value ==
                                                          "batch_name"
                                                      ) {
                                                          return (
                                                              <td
                                                                  key={
                                                                      cell.value
                                                                  }
                                                                  width={
                                                                      cell.width
                                                                  }
                                                                  style={{
                                                                      color: cell.color,
                                                                      fontWeight:
                                                                          cell.fontWeight,
                                                                      minWidth:
                                                                          cell.minWidth,
                                                                  }}
                                                                  className={
                                                                      style.tableCell
                                                                  }
                                                                  onClick={() => {
                                                                      props.showDetails(
                                                                          el.id,
                                                                          d.date
                                                                      );
                                                                  }}
                                                              >
                                                                  {el[
                                                                      cell.value
                                                                  ] +
                                                                      " (" +
                                                                      el[
                                                                          "batch_id"
                                                                      ] +
                                                                      ") "}
                                                                  {el.pool_name}
                                                              </td>
                                                          );

                                                          //   condition for displaying module,section and topic in topic column
                                                      } else if (
                                                          cell.value ==
                                                          "class_title"
                                                      ) {
                                                          var topicTitle =
                                                              el["module"] +
                                                              " | " +
                                                              el["section"] +
                                                              " | " +
                                                              el["class_title"];
                                                          return (
                                                              <td
                                                                  key={
                                                                      cell.value
                                                                  }
                                                                  width={
                                                                      cell.width
                                                                  }
                                                                  style={{
                                                                      color: cell.color,
                                                                      fontWeight:
                                                                          cell.fontWeight,
                                                                      minWidth:
                                                                          cell.minWidth,
                                                                  }}
                                                                  className={
                                                                      style.tableCell
                                                                  }
                                                                  onClick={() => {
                                                                      props.showDetails(
                                                                          el.id,
                                                                          d.date
                                                                      );
                                                                  }}
                                                              >
                                                                  <span
                                                                      className={
                                                                          style.topicSection
                                                                      }
                                                                      title={
                                                                          topicTitle
                                                                      }
                                                                  >
                                                                      <div
                                                                          style={{
                                                                              whiteSpace:
                                                                                  "nowrap",
                                                                          }}
                                                                      >
                                                                          {
                                                                              el[
                                                                                  "module"
                                                                              ]
                                                                          }
                                                                      </div>
                                                                      <Divider
                                                                          isVertical={
                                                                              true
                                                                          }
                                                                          length="1rem"
                                                                      />
                                                                      {
                                                                          el[
                                                                              "section"
                                                                          ]
                                                                      }
                                                                      <Divider
                                                                          isVertical={
                                                                              true
                                                                          }
                                                                          length="1rem"
                                                                      />
                                                                      <span>
                                                                          {
                                                                              el[
                                                                                  cell
                                                                                      .value
                                                                              ]
                                                                          }
                                                                      </span>
                                                                  </span>
                                                              </td>
                                                          );

                                                          //   condition for displaying offline/online icon along with classroom name
                                                      } else if (
                                                          cell.value ==
                                                          "classroom_name"
                                                      ) {
                                                          return (
                                                              <td
                                                                  key={
                                                                      cell.value
                                                                  }
                                                                  width={
                                                                      cell.width
                                                                  }
                                                                  style={{
                                                                      color: cell.color,
                                                                      fontWeight:
                                                                          cell.fontWeight,
                                                                      minWidth:
                                                                          cell.minWidth,
                                                                  }}
                                                                  className={
                                                                      style.tableCell
                                                                  }
                                                                  onClick={() => {
                                                                      props.showDetails(
                                                                          el.id,
                                                                          d.date
                                                                      );
                                                                  }}
                                                              >
                                                                  <div
                                                                      className={
                                                                          style.imageConatiner
                                                                      }
                                                                  >
                                                                      {el.mode_id ===
                                                                      2 ? (
                                                                          <OfflineIcon />
                                                                      ) : (
                                                                          <OnlineIcon />
                                                                      )}
                                                                  </div>
                                                                  {
                                                                      el[
                                                                          cell
                                                                              .value
                                                                      ]
                                                                  }
                                                              </td>
                                                          );

                                                          //   condition for rest of the columns
                                                      } else {
                                                          return (
                                                              <td
                                                                  key={
                                                                      cell.value
                                                                  }
                                                                  width={
                                                                      cell.width
                                                                  }
                                                                  style={{
                                                                      color: cell.color,
                                                                      fontWeight:
                                                                          cell.fontWeight,
                                                                      minWidth:
                                                                          cell.minWidth,
                                                                  }}
                                                                  className={
                                                                      style.tableCell
                                                                  }
                                                                  onClick={() => {
                                                                      props.showDetails(
                                                                          el.id,
                                                                          d.date
                                                                      );
                                                                  }}
                                                              >
                                                                  {el[
                                                                      cell.value
                                                                  ] || " -- "}
                                                              </td>
                                                          );
                                                      }
                                                  })}
                                              </tr>
                                          );
                                      })
                                    : null}
                                {/* </tbody> */}
                            </table>
                        </div>
                    );
                })
            ) : (
                <div className={style.noData}>
                    <p>No Data Available</p>
                </div>
            )}
        </div>
    );
};

export default SchedulerCompact;
