import {get, post} from "@/utils/request"

const createSession = async (data: object,) => {
    const res = await post('/chat/new', data, {})
    console.log(res)
}

export {
    createSession
}
