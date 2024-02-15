import { client } from '.';
import { message_id_prefix, message_index } from '$lib/constants';
import { SchemaFieldTypes, VectorAlgorithms } from 'redis';

export const setup = async () => {
	try {
		await client.ft.dropIndex(message_index)
		await client.ft.create(
			message_index,
			{
				'$.v': {
					AS: 'v',
					type: SchemaFieldTypes.VECTOR,
					ALGORITHM: VectorAlgorithms.FLAT,
					TYPE: 'FLOAT32',
					DIM: 3072,
					DISTANCE_METRIC: 'COSINE'
				},
				'$.a': {
					AS: 'a',
					type: SchemaFieldTypes.NUMERIC
				},
				'$.m': {
					AS: 'm',
					type: SchemaFieldTypes.TEXT
				}
			},
			{
				ON: 'JSON',
				PREFIX: message_id_prefix,
				NOHL: true
			}
		);
	} catch (e) {
		console.error('redis setup error:', e);
	}
};
