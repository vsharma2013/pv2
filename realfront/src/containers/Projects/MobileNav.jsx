import React, {useState, useEffect} from 'react'

import NavBarMenuMob from "./NavBarMenuMob";
import { useMediaQuery } from 'react-responsive'

function MobileNav(props) {

        const [isMobile, setIsmobile] = useState(false)

        const a = useMediaQuery({ query: '(max-width: 992px)' })
       
            useEffect(() => {
               setIsmobile(a)
            }, [a])
      
        return (
            <div>
          {
            isMobile && <NavBarMenuMob isHide={props.isHide} sectionRefsMob={props.sectionRefsMob} />
          }
          </div>
          
        )
      
}

export default MobileNav

