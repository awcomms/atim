import { message_id_prefix } from "$lib/constants";
import { client } from "../redis";

export const create_id = async() => `${message_id_prefix}${await client.incr('last_message_id')}`