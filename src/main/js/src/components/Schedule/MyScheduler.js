import React, { useEffect, useState } from "react";
import moment from "moment";
import style from "@styles/calendar.module.css";
import Avatar from "@components/Elements/Avatar";

const Scheduler = (props) => {
    var eventsArr = [];
    const [data, setData] = useState([]);

    // generating time slots
    const startTime = moment().startOf("day");
    const endTime = moment().endOf("day");
    const timeSlots = [];
    while (startTime < endTime) {
        timeSlots.push(startTime.format("HH:mm"));
        startTime.add(30, "minutes");
    }

    useEffect(() => {
        // looping over props.data to group the data according to classroom/mentor according to the view
        {
            props.data.map((el) => {
                eventsArr.push({ date: el.date, events: [] });
                var index = eventsArr.findIndex((e) => e.date == el.date);

                // sort the items for every date according to start time
                var list=el.items.sort(function(a, b) {
                    let timeA = a.start_time.split(':').map(Number);
                    let timeB = b.start_time.split(':').map(Number);
                    let dateA = new Date();
                    let dateB = new Date();
                    dateA.setHours(timeA[0], timeA[1], timeA[2]);
                    dateB.setHours(timeB[0], timeB[1], timeB[2]);
                    return dateA - dateB;
                });

                if (props.list == "classroom_name") {
                    {
                        list.map((item) => {
                            var i = eventsArr[index].events.findIndex(
                                (e) => e.classroom_id == item.classroom_id
                            );
                            if (i == -1) {
                                eventsArr[index].events.push({
                                    id: item.id,
                                    classroom_id: item.classroom_id,
                                    classroom_name: item.classroom_name,
                                    mentor_name: item.mentor_name,
                                    event: [item],
                                });
                            } else {
                                eventsArr[index].events[i].event.push(item);
                            }
                        });
                    }
                } else {
                    {
                        list.map((item) => {
                            var i = eventsArr[index].events.findIndex(
                                (e) => e.mentor_id == item.mentor_id
                            );
                            if (i == -1) {
                                eventsArr[index].events.push({
                                    id: item.id,
                                    mentor_id: item.mentor_id,
                                    mentor_name: item.mentor_name,
                                    event: [item],
                                });
                            } else {
                                eventsArr[index].events[i].event.push(item);
                            }
                        });
                    }
                }
            });
        }

        setData([...eventsArr]);

        // console.log("item", eventsArr);
    }, [props.data]);

    // function to find time difference between the event start time and the time in timeslots
    function getTimeDifference(startTime, endTime) {
        // Use regular expressions to extract the hours and minutes from the start and end times
        const startMatch = startTime.split(":");
        const endMatch = endTime.split(":");
        const startHours = startMatch[0];
        const startMinutes = startMatch[1];
        const endHours = endMatch[0];
        const endMinutes = endMatch[1];

        // Calculate the difference between the start and end times in minutes
        const startTotalMinutes = startHours * 60 + startMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;
        const difference = endTotalMinutes - startTotalMinutes;

        return difference;
    }

    return (
        <div className={`${style.scheduler}`}>
            {/* Display horizontal axis with date and time slots  */}

            {data.length > 0
                ? data.map((el) => {
                      // convert the date in required format for displaying
                      var parts = el.date.split("-");
                      var day = parts[2];
                      var month = parts[1];
                      var year = parts[0];

                      var date = new Date(year, month - 1, day);
                      var formattedDate = date.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          weekday: "long",
                      });
                      const dateParts = formattedDate.split(",");
                      const finalDate = `${dateParts[0]}, ${dateParts[1]} ${dateParts[2]}`;

                      return (
                          <table
                              key={el.date}
                              className={`${style.scheduler_table}`}
                          >
                              <tr style={{ display: "flex" }}>
                                  <td
                                      className={`${style.frozen} ${style.date_cell}`}
                                  >
                                      {finalDate}
                                  </td>

                                  {/* loop over the timeslots */}
                                  {timeSlots.map((time) => (
                                      <td
                                          key={time}
                                          className={`${style.timeSection}`}
                                      >
                                          {time.split(":")[1] != "30"
                                              ? time
                                              : null}
                                      </td>
                                  ))}
                              </tr>

                              {/* prepare body */}

                              {el.events.map((item) => {
                                  var colSpan;
                                  var marginTop = 0;
                                  var count = 0;


                                  //   group the events that have the same start time
                                  const groupedObjects = item.event.reduce(
                                      (acc, obj) => {
                                          if (!acc[obj.start_time])
                                              acc[obj.start_time] = [];
                                          acc[obj.start_time].push(obj);

                                          return acc;
                                      },
                                      {}
                                  );


                                  return (
                                      <tr
                                          key={item.resourceId}
                                          className={`${style.tableRow}`}
                                      >
                                          {/* display the classroom or mentor name according to the view */}
                                          <td
                                              style={{ background: "#fff" }}
                                              className={`${style.resources} ${style.frozen}`}
                                              onClick={() => {
                                                  props.showDetails(
                                                      item.id,
                                                      el.date
                                                  );
                                              }}
                                          >
                                              <div
                                                  className={`${style.resourceCell}`}
                                              >
                                                  {props.list ==
                                                  "classroom_name"
                                                      ? item.classroom_name
                                                      : item.mentor_name}
                                              </div>
                                          </td>

                                          {/* loop over the timeslots to prepare body */}
                                          {timeSlots.map((time) => {
                                              var timeDiff = null;

                                              //   get the time difference only for objects in groupedObjects
                                              if (
                                                  count <
                                                  Object.keys(groupedObjects)
                                                      .length
                                              ) {
                                                  timeDiff = getTimeDifference(
                                                      time,
                                                      item.event[
                                                          count
                                                      ].start_time.substr(0, 5)
                                                  );
                                              }

                                        

                                              //   display events only if the time difference is 0 or 15 minutes
                                              if (
                                                  timeDiff == 0 ||
                                                  timeDiff == 15
                                              ) {
                                                  //  get the left margin of the card according to time difference
                                                  var marginLeft = "50%";
                                                  if (timeDiff == 15) {
                                                      marginLeft = "100%";
                                                  }

                                                  
                                  
                                                  //   increase the top margin for every object in groupedObjects
                                                  marginTop = count * 57;

                                                  count += 1;
                                                  return (
                                                      <td
                                                          key={time + count}
                                                          className={` ${style.cells}`}
                                                          style={{
                                                              paddingTop:
                                                                  "0.5rem",
                                                              width: "80px",
                                                              overflowX:
                                                                  "visible",
                                                              position:
                                                                  "relative",
                                                          }}
                                                      >
                                                          {groupedObjects[
                                                              item.event[
                                                                  count - 1
                                                              ].start_time
                                                          ].map((g, index) => {
                                                              var course_name =
                                                                  g.course_name ==
                                                                      null ||
                                                                  g.course_name ==
                                                                      undefined
                                                                      ? " "
                                                                      : g.course_name;
                                                              var batch_name =
                                                                  g.batch_name ==
                                                                      null ||
                                                                  g.batch_name ==
                                                                      undefined
                                                                      ? " "
                                                                      : g.batch_name;
                                                              var mentor_name =
                                                                  g.mentor_name ==
                                                                      null ||
                                                                  g.mentor_name ==
                                                                      undefined
                                                                      ? " "
                                                                      : g.mentor_name;
                                                            var classroom_name =
                                                                      g.classroom_name ==
                                                                          null ||
                                                                      g.classroom_name ==
                                                                          undefined
                                                                          ? " "
                                                                          : g.classroom_name;

                                                              var content_title =props.list=='classroom_name'? `${course_name} | ${batch_name} | ${mentor_name}`:`${course_name} | ${batch_name} | ${classroom_name}`;
                                                              var topic_name =
                                                                  g.class_title;

                                                              // get the width of the event card
                                                              var diffMinutes =
                                                                  Math.round(
                                                                      g.duration_in_seconds /
                                                                          60
                                                                  );
                                                              colSpan =
                                                                  diffMinutes /
                                                                  30;
                                                              var width =
                                                                  80 * colSpan;

                                                                  var isConflict=false;
                                                                  if(g.is_batch_conflict || g.is_classroom_conflict || g.is_mentor_conflict){
                                                                    isConflict = true
                                                                  }

                                                              // prepare the avatar for the event card in case of conflict
                                                              let conflictAvatar =
                                                                  null;
                                                                  let total_conflicts=g.batch_conflicts+ g.classroom_conflicts+g.mentor_conflicts;
                                                             
                                                              if (
                                                                  isConflict
                                                              ) {
                                                                  if (
                                                                      total_conflicts ==
                                                                          1 &&
                                                                      g.is_batch_conflict
                                                                  ) {
                                                                      conflictAvatar =
                                                                          (
                                                                              <span
                                                                                  style={{
                                                                                      width: "1.5rem",
                                                                                      height: "1.5rem",
                                                                                  }}
                                                                                  title="Batch Conflict"
                                                                              >
                                                                                  <Avatar
                                                                                      userName="B"
                                                                                      background="#FF5858"
                                                                                      color="#fff"
                                                                                  />
                                                                              </span>
                                                                          );
                                                                  } else if (
                                                                      total_conflicts ==
                                                                          1 &&
                                                                      g.is_mentor_conflict
                                                                  ) {
                                                                      conflictAvatar =
                                                                          (
                                                                              <span
                                                                                  style={{
                                                                                      width: "1.5rem",
                                                                                      height: "1.5rem",
                                                                                  }}
                                                                                  title="Mentor Conflict"
                                                                              >
                                                                                  <Avatar
                                                                                      userName="M"
                                                                                      background="#FF5858"
                                                                                      color="#fff"
                                                                                  />
                                                                              </span>
                                                                          );
                                                                  } else if (
                                                                      total_conflicts ==
                                                                          1 &&
                                                                      g.is_classroom_conflict
                                                                  ) {
                                                                      conflictAvatar =
                                                                          (
                                                                              <span
                                                                                  style={{
                                                                                      width: "1.5rem",
                                                                                      height: "1.5rem",
                                                                                  }}
                                                                                  title="Classroom Conflict"
                                                                              >
                                                                                  <Avatar
                                                                                      userName="C"
                                                                                      background="#FF5858"
                                                                                      color="#fff"
                                                                                  />
                                                                              </span>
                                                                          );
                                                                  } else if (
                                                                      total_conflicts ==
                                                                      2
                                                                  ) {
                                                                      var title =
                                                                          "";
                                                                      title +=
                                                                          g.is_mentor_conflict
                                                                              ? "Mentor Conflict,"
                                                                              : "";
                                                                      title +=
                                                                          g.is_batch_conflict
                                                                              ? "Batch Conflict,"
                                                                              : "";
                                                                      title +=
                                                                          g.is_classroom_conflict
                                                                              ? "Classroom Conflict,"
                                                                              : "";
                                                                      const finalTitle =
                                                                          title.substr(
                                                                              0,
                                                                              title.length -
                                                                                  1
                                                                          );
                                                                      conflictAvatar =
                                                                          (
                                                                              <span
                                                                                  style={{
                                                                                      width: "1.5rem",
                                                                                      height: "1.5rem",
                                                                                  }}
                                                                                  title={
                                                                                      finalTitle
                                                                                  }
                                                                              >
                                                                                  <Avatar
                                                                                      userName="2"
                                                                                      background="#FF5858"
                                                                                      color="#fff"
                                                                                  />
                                                                              </span>
                                                                          );
                                                                  } else if (
                                                                      total_conflicts ==
                                                                      3
                                                                  ) {
                                                                      var title =
                                                                          "";
                                                                      title +=
                                                                          g.is_mentor_conflict
                                                                              ? "Mentor Conflict,"
                                                                              : "";
                                                                      title +=
                                                                          g.is_batch_conflict
                                                                              ? "Batch Conflict,"
                                                                              : "";
                                                                      title +=
                                                                          g.is_classroom_conflict
                                                                              ? "Classroom Conflict,"
                                                                              : "";
                                                                      const finalTitle =
                                                                          title.substr(
                                                                              0,
                                                                              title.length -
                                                                                  1
                                                                          );
                                                                      conflictAvatar =
                                                                          (
                                                                              <span
                                                                                  style={{
                                                                                      width: "1.5rem",
                                                                                      height: "1.5rem",
                                                                                  }}
                                                                                  title={
                                                                                      finalTitle
                                                                                  }
                                                                              >
                                                                                  <Avatar
                                                                                      userName="3"
                                                                                      background="#FF5858"
                                                                                      color="#fff"
                                                                                  />
                                                                              </span>
                                                                          );
                                                                  } else if (
                                                                      total_conflicts >
                                                                      3
                                                                  ) {
                                                                      var title =
                                                                          "";
                                                                      title +=
                                                                          g.is_mentor_conflict
                                                                              ? "Mentor Conflict,"
                                                                              : "";
                                                                      title +=
                                                                          g.is_batch_conflict
                                                                              ? "Batch Conflict,"
                                                                              : "";
                                                                      title +=
                                                                          g.is_classroom_conflict
                                                                              ? "Classroom Conflict,"
                                                                              : "";
                                                                      var finalTitle =
                                                                          title.substr(
                                                                              0,
                                                                              title.length -
                                                                                  1
                                                                          );
                                                                      finalTitle +=
                                                                          "...";
                                                                      conflictAvatar =
                                                                          (
                                                                              <span
                                                                                  style={{
                                                                                      width: "1.5rem",
                                                                                      height: "1.5rem",
                                                                                  }}
                                                                                  title={
                                                                                      finalTitle
                                                                                  }
                                                                              >
                                                                                  <Avatar
                                                                                      userName={
                                                                                          total_conflicts
                                                                                      }
                                                                                      background="#FF5858"
                                                                                      color="#fff"
                                                                                      isWholeText="true"
                                                                                  />
                                                                              </span>
                                                                          );
                                                                  }
                                                              }


                                                              //   return the event card
                                                              return (
                                                                  <div
                                                                      className={
                                                                          isConflict
                                                                              ? `${style.conflict_events} `
                                                                              : `${style.active_events}`
                                                                      }
                                                                      style={{
                                                                          maxHeight:
                                                                              "max-content",
                                                                          marginBottom:
                                                                              "0.5rem",
                                                                          width: width,
                                                                          marginLeft:
                                                                              marginLeft,
                                                                          marginTop:
                                                                              index ==
                                                                              0
                                                                                  ? marginTop
                                                                                  : 0,
                                                                      }}
                                                                      key={
                                                                          index
                                                                      }
                                                                  >

                                                                {isConflict?<div className={style.AvatarSection}>{conflictAvatar}</div>:null}
                                                                <div
                                                                          className={
                                                                              style.eventBody
                                                                          }
                                                                      >
                                                                <div
                                                                          className={`${style.eventTitle}`}
                                                                          style={{
                                                                              color:
                                                                                  isConflict
                                                                                      ? "#231F20"
                                                                                      : "#0481FE",
                                                                          }}
                                                                          title={
                                                                              topic_name
                                                                          }
                                                                      >
                                                                          {" "}
                                                                          {
                                                                              topic_name
                                                                          }
                                                                      </div>
                                                                      <div
                                                                              className={
                                                                                  isConflict
                                                                                      ? `${style.eventContent}`
                                                                                      : `${style.eventContent}`
                                                                              }
                                                                              title={
                                                                                  content_title
                                                                              }
                                                                          >
                                                                              {
                                                                                  course_name
                                                                              }{" "}
                                                                              |{" "}
                                                                              {
                                                                                  batch_name
                                                                              }{" "}
                                                                              |{" "}
                                                                              { props.list=="classroom_name"?
                                                                                  mentor_name:classroom_name
                                                                              }
                                                                          </div>
                                                                </div>
                                                                  </div>

                                                                 
                                                              );
                                                          })}

                                                          <div
                                                              className={`${style.verticalLine}`}
                                                              style={{
                                                                  position:
                                                                      "absolute",
                                                                  top: "0",
                                                                  left: "50%",
                                                              }}
                                                          ></div>
                                                      </td>
                                                  );
                                                  //   return empty cell in case of no events
                                              } else {
                                                  return (
                                                      <td
                                                          key={time}
                                                          className={`${style.scheduler__axis_item} ${style.cells}`}
                                                      >
                                                          <div
                                                              className={`${style.verticalLine}`}
                                                          ></div>
                                                      </td>
                                                  );
                                              }
                                          })}
                                      </tr>
                                  );
                              })}
                          </table>
                      );
                  })
                : null}
        </div>
    );
};
export default Scheduler;
