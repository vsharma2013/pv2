import React, { useEffect, useRef, useState } from "react";
import LogoIcon from '../assets/icons/logoonforgotpassword.png';
const getDimensions = (ele) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

function DashboardNavBar(props) {
  const { sectionRefs } = props;
  const [menu, setMenu] = useState(null);
  const [menuShow, setMenuShow] = useState(false);
  const [visibleSection, setVisibleSection] = useState(menu);

  const headerRef = useRef(null);

  useEffect(() => {
   setMenu('dashboard')
  }, [])

  useEffect(() => {
    console.log(sectionRefs);
    const handleScroll = () => {
     
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;
      let i = 0;
      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop, height } = getDimensions(ele);
          console.log(
            ele,
            i,
            scrollPosition > offsetTop && scrollPosition < offsetBottom
          );
          setMenuShow(
            scrollPosition > offsetTop && scrollPosition < offsetBottom
          );
          i++;
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setMenu(selected.section);
      } else if (!selected && visibleSection) {
        setMenu(null);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  const handelClick = (name, index) => {
    setMenu(null);
    setMenu(name);
    console.log(index);
    console.log(sectionRefs[index].ref);
  };

  console.log('menu ======> ', menu)
  return (

    <div
      className="col-12 navs"
      ref={headerRef}
      style={
        menu !== "dashboard"
          ? {
              position: "fixed",
              zIndex: "7",
              top: "-3%",
              backgroundColor: "white",
            }
          : null
      }
    >
      <div className="navigation1">
        <nav style={{ width: "100%", padding: "0px" }} className="navbar navbar-expand-lg navbar-light" >
         <a style= { menu == "dashboard" ? { display: 'none'}: null} href="/"><img class="logo_nav" src={LogoIcon} /> </a>
          <div style={{ flexDirection: "row", paddingTop: "7px", width: "100%" }}>
            <a

              className={`nav-item mostnav1 ${
                menu === "mosttrend" && "active"
              }`}
              href="#mosttrend"
              onClick={() => handelClick("mosttrend", 0)}
            >
              MOST TRENDING
            </a>
            <a
              className={`nav-item topnav ${menu === "toprated" && "active"}`}
              href="#toprated"
              onClick={() => handelClick("toprated", 1)}
            >
              TOP RATED
            </a>
            <a
              className={`nav-item newnav ${menu === "newdevelop" && "active"}`}
              href="#newdevelop"
              onClick={() => handelClick("newdevelop", 2)}
            >
              RECENTLY LAUNCHED
            </a>
            <a
              className={`nav-item blognav ${menu === "blogs" && "active"}`}
              href="#blogs"
              onClick={() => handelClick("blogs", 3)}
            >
              OUR BLOGS
            </a>
          </div>
        </nav>
      </div>
    </div>

  );
}

export default DashboardNavBar;


{/* // <a href="/"><img class="logo_nav" src="/static/media/logo.472f1430.png" /> */}