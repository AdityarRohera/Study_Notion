
export const USER_API_ENDPOINT = {
    SEND_OTP : '/user/send-otp',
    LOGIN : '/user/signin',
    SIGNUP : '/user/signup',
    RESET_PASSWORD :'/user/reset-password',
    VERIFY_RESET_PASSWORD : '/user/reset-password-verify'
};

export const COURSE_API_ENDPOINT = {
    CREATE : '/course/create-course',
    GET_SINGLE_COURSE : '/course/get-course',
    GET_DRAFT_COURSE : '/course/draft-course',
    GET_COURSE_SECTION : '/course/get-section',
    DELETE_DRAFT_COURSE : '/course/delete-draft-course'
}

export const CATEGORY_API_ENDPOINT = {
    CATEGORIES : '/all-category',
    CATEGORY_COURSES : '/category-courses',
}

export const PAYMENT_API_ENDPOINT = {
    CREATE_ORDER : '/payment/create-order',
    VERIFY_PAYMENT : '/payment/verify-payment'
}

export const UPLOAD_API_ENDPOINT = {
    IMAGE_UPLOAD : '/upload/image-upload',
    VIDEO_UPLOAD : '/upload/video-upload',
    DELETE_IMAGE : '/upload/delete-image',
    DELETE_VIDEO : '/upload/delete-video'
}

export const INSTRUCTOR_API_ENDPOINT = {
    CREATE_COURSE : '/course/create-course',
    CREATE_SECTION : '/course/create-section',
    CREATE_SUBSECTION : '/course/create-subsection',
    GET_FULLCOURSE : '/course/get-course',
    GET_ALLCOURSES : '/course/get-courses',
    PUBLISH_FULLCOURSE : '/course/publish-course',
}

export const ENROLLED_COURSE_API_ENDPOINT = {
    ENROLLED_COURSES : '/purchase/enrolled-courses'
}

export const BASE_URL = import.meta.env.VITE_BASE_URL;