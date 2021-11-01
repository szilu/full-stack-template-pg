import T from '@symbion/runtype'

const tHelloWorld = T.struct({
    hello: T.string
})

export type HelloWorld = T.TypeOf<typeof tHelloWorld>
