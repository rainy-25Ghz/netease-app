import React, { useState } from 'react'


export const useUpdate = () => {
    const [_,update]=useState<any[]>([]);
    return update;
}
