import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface Prop{
    inverted?:boolean,
    content?:string,
}

export default function LoadingComponent({inverted=true,content="Loading ..."}:Prop) {
    return (
         <Dimmer active={true} inverted={inverted}>
             <Loader content={content}/>
         </Dimmer>
    )
    
}