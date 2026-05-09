'use client'
import { useMyPresence, useOthers } from '@liveblocks/react'
import { PointerEvent } from 'react'
import React from 'react'
import FollowPointer from './FollowPointer';

function LiveCursorProvider({children}:{children: React.ReactNode}) {
    const [_mypersence, UpdateMyPresence] = useMyPresence();
    const others = useOthers();


    function handelPointerMove(e: PointerEvent<HTMLDivElement>) {
        const cursor = {x: Math.floor(e.pageX), y: Math.floor(e.pageY)};
        UpdateMyPresence({cursor});
    }
    function handlePointerLeave() {
        UpdateMyPresence({ cursor:null });
    }

return (
    <div onPointerMove={handelPointerMove} onPointerLeave={handlePointerLeave}>
        {others.filter((other) => other.presence.cursor !== null).map(({connectionId, presence,info}) => (
            <FollowPointer
                key={connectionId} 
                info={info}
                x = {presence.cursor!.x}
                y = {presence.cursor!.y}
            />
        ))}
        {children}
    </div>
)
}

export default LiveCursorProvider