import React, { useEffect, useRef, useState } from "react";

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

function NavBarMenu(props) {
  const { sectionRefs } = props;
  const [menu, setMenu] = useState(null);
  const [menuShow, setMenuShow] = useState(false);
  const [visibleSection, setVisibleSection] = useState(menu);
  const headerRef = useRef(null);

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
    setMenu(name);
    console.log(index);
    console.log(sectionRefs[index].ref);
  };
  return (
    <div className="menu-wrapper" ref={headerRef}>
      <div className="centeralign">
        <a
          className={
            menu === "ratingdiv" ? "navbar-brand active-link" : "navbar-brand"
          }
          href="#ratingdiv"
          onClick={() => setMenu("ratingdiv")}
        >
          ABOUT
        </a>
      </div>
      <div className="centeralign">
        <a
          className={
            menu === "reviewdiv" ? "navbar-brand active-link" : "navbar-brand"
          }
          href="#reviewdiv"
          onClick={() => setMenu("reviewdiv")}
        >
          REVIEWS
        </a>
      </div>
      <div className="centeralign">
        <a
          className={
            menu === "trendingdiv" ? "navbar-brand active-link" : "navbar-brand"
          }
          href="#trendingdiv"
          onClick={() => setMenu("trendingdiv")}
        >
          TRENDING PROJECTS
        </a>
      </div>
    </div>
  );
}

export default NavBarMenu;
