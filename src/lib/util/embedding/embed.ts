import { remote } from "./remote"

export const embed = async (v: string, b?: boolean) => {
    return await remote(v, b)
}