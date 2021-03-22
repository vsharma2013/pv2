import React, { useEffect, useRef, useState } from 'react'

const getDimensions = ele => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = ele => {
  ele.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

function NavBarMenuMob(props) {
  const { sectionRefsMob } = props;
  const [menu, setMenu] = useState(null);
  const [visibleSection, setVisibleSection] = useState(menu);
  const headerRef = useRef(null);
 

    
  //  }, [sc])
  // useEffect(() => {
  //   const handleScroll = () => {
  //     console.clear()
  //     const { height: headerHeight } = getDimensions(headerRef.current);
  //     const scrollPosition = window.scrollY + headerHeight;

  //     const selected = sectionRefs.find(({ section, ref }) => {
  //       const ele = ref.current;
  //       if (ele) {
  //         const { offsetBottom, offsetTop, height } = getDimensions(ele);
  //         console.log(scrollPosition, offsetTop, offsetBottom, scrollPosition + 450)
  //         return scrollPosition + 450 > offsetTop && scrollPosition + 450 < offsetBottom;
  //       }
  //     });

  //     if (selected && selected.section !== visibleSection) {
  //       setMenu(selected.section);
  //     } else if (!selected && visibleSection) {
  //       console.log(undefined);
  //     }
  //   };

  //   handleScroll();
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [visibleSection]);


  
useEffect(() => {
  setMenu('dashboard1')
  

 

  onscroll = function () {
    // var scrollPosition = document.documentElement.scrollTop;

    var scrollPosition = window.scrollY - 30
   
    sectionRefsMob.forEach((section) => {

      const {offsetTop, offsetBottom } = getDimensions(section.ref.current);
      if (
        // scrollPosition  > offsetTop - 550   &&
        // scrollPosition < offsetBottom - 100
        scrollPosition  > offsetTop  &&
        scrollPosition < offsetBottom
      ) {
        var currentId = section.ref.current.id;
        removeAllActiveClasses();
        addActiveClass(currentId);
       
      }

    });
  };

  
  var removeAllActiveClasses = function () {
    setMenu('dashboard1')
  };
  
  var addActiveClass = function (id) {
    setMenu(id)
  };


  onscroll();
 
}, [])

console.log('menuuuuuuuuuuuuuuuu => ', menu)

  return (
    <div className={`navbarpromob ${props.isHide && 'hide-nav'}`}
    // style={{ justifyContent: "left", display: "flex" }} 
    style={
      menu !== "dashboard1"
        ? {
          //  justifyContent: "left",
            display: "flex",
            position: "fixed",
            zIndex: "9999",
            top: "-3%",
            height: '60px',
            padding: '7px',

            backgroundColor: "white",
            // background: 'black'
            left: '0px',
            color: "black",
           width: '100%',
            alignItems: "center",
           justifyContent: "space-around"
            
          }
        : {justifyContent: "left", display: "flex"}
    }
    
    ref={headerRef}>
      <div className="centeralign">
        <a className={menu === "ratingdivmobile" ? "navbar-brand active-link" : "navbar-brand"} href="#ratingdivmobile"

          onClick={() => setMenu("ratingdivmobile")}>RATINGS</a>
      </div>
      <div className="centeralign">
        <a className={menu === "reviewdivmobile" ? "navbar-brand active-link" : "navbar-brand"} href="#reviewdivmobile"

          onClick={() => setMenu("reviewdivmobile")}>REVIEWS</a>
      </div>
      <div className="centeralign">
        <a className={menu === "recenttransactiondivmobile" ? "navbar-brand active-link" : "navbar-brand"} href="#recenttransactiondivmobile"

          onClick={() => setMenu("recenttransactiondivmobile")}>RECENT TRANSACTIONS</a>
      </div>
      <div className="centeralign">
        <a className={menu === "projectinfodivmobile" ? "navbar-brand active-link" : "navbar-brand"} href="#projectinfodivmobile"

          onClick={() => setMenu("projectinfodivmobile")}>PROJECT INFO</a>
      </div>

    </div>
  )

}

export default NavBarMenuMob
