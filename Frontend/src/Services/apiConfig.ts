
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
    GET_DRAFT_COURSE : '/course/draft-course'
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
    VIDEO_UPLOAD : '/upload/video-upload'
}

export const INSTRUCTOR_API_ENDPOINT = {
    CREATE_COURSE : '/course/create-course',
    CREATE_SECTION : '/course/create-section',
    CREATE_SUBSECTION : '/course/create-subsection',
    GET_FULLCOURSE : '/course/get-course'
}

export const BASE_URL = "http://localhost:4000/api/v1";