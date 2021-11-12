import * as T from '@symbion/runtype'

export const tHello = T.struct({
    name: T.string
})

export type Hello = T.TypeOf<typeof tHello>
