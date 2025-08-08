import {get, post} from "@/utils/request"

const createSession = async () => {
    return await post('/chat/new', undefined, {})
}

export {
    createSession
}
