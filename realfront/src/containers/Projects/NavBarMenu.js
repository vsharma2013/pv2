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

function NavBarMenu(props) {
  const { sectionRefs } = props;
  const [menu, setMenu] = useState(null);
  const [visibleSection, setVisibleSection] = useState(menu);
  const headerRef = useRef(null);
 

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


  onscroll = function () {
    // var scrollPosition = document.documentElement.scrollTop;

    var scrollPosition = window.scrollY - 30
   
    sectionRefs.forEach((section) => {

      const {offsetTop, offsetBottom } = getDimensions(section.ref.current);
      if (
        scrollPosition  > offsetTop - 550   &&
        scrollPosition < offsetBottom - 100
      ) {
        var currentId = section.ref.current.id;
        removeAllActiveClasses();
        addActiveClass(currentId);
       
      }

    });
  };

  
  var removeAllActiveClasses = function () {
    setMenu(null)
  };
  
  var addActiveClass = function (id) {
    setMenu(id)
  };


  onscroll();
 
}, [])

  return (
    <div className="" style={{ justifyContent: "left", display: "flex" }} ref={headerRef}>
      <div className="centeralign">
        <a className={menu === "ratingdiv" ? "navbar-brand active-link" : "navbar-brand"} href="#ratingdiv"

          onClick={() => setMenu("ratingdiv")}>RATINGS</a>
      </div>
      <div className="centeralign">
        <a className={menu === "reviewdiv" ? "navbar-brand active-link" : "navbar-brand"} href="#reviewdiv"

          onClick={() => setMenu("reviewdiv")}>REVIEWS</a>
      </div>
      <div className="centeralign">
        <a className={menu === "recenttransactiondiv" ? "navbar-brand active-link" : "navbar-brand"} href="#recenttransactiondiv"

          onClick={() => setMenu("recenttransactiondiv")}>RECENT TRANSACTIONS</a>
      </div>
      <div className="centeralign">
        <a className={menu === "projectinfodiv" ? "navbar-brand active-link" : "navbar-brand"} href="#projectinfodiv"

          onClick={() => setMenu("projectinfodiv")}>PROJECT INFO</a>
      </div>

    </div>
  )
}

export default NavBarMenu
