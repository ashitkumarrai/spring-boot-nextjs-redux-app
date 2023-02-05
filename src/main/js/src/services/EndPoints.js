export const LOGIN = "/auth/login";
export const MASTER_DATA = "/master/data";

//Batch
export const CREATE_BATCH = "/batch";
export const GET_BATCH_LIST = "/batch/list";
export const GET_COURSE_FLOW = "/batch/course_flows";
export const SAVE_BATCH = "/batch/save_draft";
export const GET_MENTOR_AVAILABLE = "/batch/get_mentor_availability";
export const GET_CLASSROOM_AVAILABLE = "/batch/get_classroom_availability";
export const UPDATE_BATCH = "/batch/update";
export const FINAL_SAVE_BATCH = "/batch/final_save";
export const GET_BATCH_COURSE_FLOW = "/batch/batch_course_flows";
export const DELETE_BATCH = "/batch/delete";
export const DISCARD_BATCH = "/batch/discard";
export const SHARE_BATCH = "/batch/share_batch";
export const GET_MENTOR_BY_BATCH = "/batch/get_mentor_info";
export const GET_CLASSROOM_BY_BATCH = "/batch/get_classroom_info";
export const POST_ADD_TO_POOL = "/batch/pool/add_batches";

//POOL
export const GET_BATCH_LIST_FOR_POOL = "/batch/data";
export const GET_POOL_LIST = "/batch/pool/list";
export const GET_POOL_MENTOR_AVAILABLE = "/batch/get_pool_mentor_availability";
export const GET_POOL_CLASSROOM_AVAILABLE =
    "/batch/get_pool_classroom_availability";
export const SAVE_POOL = "/batch/pool/save_draft";
export const FINAL_SAVE_POOL = "/batch/pool/final_save";
export const EDIT_POOL = "/batch/pool/edit_pool";
export const GET_POOL_INFO = "/batch/pool/info/";
export const GET_MENTOR_BY_POOL = "/batch/get_pool_mentor_info";
export const GET_CLASSROOM_BY_POOL = "/batch/get_pool_classroom_info";
export const DELETE_POOL = "/batch/pool/delete";
export const DISCARD_POOL = "/batch/pool/discard";
//MENTOR
export const GET_MENTOR_LIST = "/mentor/list";
export const CREATE_MENTOR = "/mentor/create";
export const UPDATE_MENTOR = "/mentor/update";
export const GET_MENTOR_DETAILS = "/mentor/detail/";

//ClASSROOM
export const GET_CLASSROOM_LIST = "/centre/classroom/list";
export const CREATE_CLASSROOM = "/centre/classroom";
export const UPDATE_CLASSROOM = "/centre/classroom/update";
export const GET_CLASSROOM_DETAILS = "/centre/classroom/detail/";
//REPORT
export const GET_MENTOR_REPORT = "/mentor/report";
export const GET_BATCH_REPORT = "/batch/report";

//SCHEDULER
export const GET_SCHEDULER_DETAILS = "/calendar/schedule";
export const GET_SCHEDULER_ADD_CLASS = "/calendar/schedule/add_class";
export const GET_SCHEDULER_CANCEL_CLASS = "/calendar/schedule/cancel_class";
export const GET_SCHEDULER_SWAP_CLASS = "/calendar/schedule/swap_class";
export const GET_SCHEDULER_EDIT_CLASS = "/calendar/schedule/edit_class";
export const GET_SCHEDULER_GET_REASONS = "/calendar/cancellation_reasons";
export const GET_CONFLICT_LIST = "/calendar/schedule/conflict_list";
export const GET_WARNING_LIST = "/calendar/schedule/warnings";
export const MARK_LEAVE = "/calendar/schedule/leave";
export const MARK_ATTENDANCE = "/calendar/schedule/mark_attendance";
