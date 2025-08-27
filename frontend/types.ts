export interface Chunk {
    chunk: string
    finished: boolean
    id: string
}

export interface Message {
    id: string
    response: string
    prompt: string
}