// import React from 'react';

// import './activities.css';
// import timelineData from '../Activities/data';
// import TimelineItem from '../Activities/TimelineItem';

// const Activities = () =>
//     timelineData.length > 0 && (
//         <div className="timeline-container">
//             {timelineData.map((data, idx) => (
//                 <TimelineItem data={data} key={idx} />
//             ))}
//         </div>
//     );
import React from 'react';
import './act.css';
import timelineData from '../Activities/data';
import TimelineItem from '../Activities/TimelineItem';

function Activities() {
return (
    <div>

<section class="timeline">
  <ul>
    <li className="in-view">
      <div>
        <time>12.Sep.2020</time> <p className="descp">At vero eos et accusamus et iusto odio </p>
      </div>
    </li>
    <li className="in-view">
      <div>
        <time>29.Sep.2020</time> <p className="descp">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium</p>
      </div>
    </li>
    <li className="in-view">
      <div>
        <time>03.Oct.2020</time> <p className="descp">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium</p>
      </div>
    </li>
    <li className="in-view">
      <div>
        <time>10.Oct.2020</time> <p className="descp">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium</p>
      </div>
    </li>
    {/* <li className="in-view">
      <div>
        <time>1956</time> In mattis elit vitae odio posuere, nec maximus massa varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
      </div>
    </li>
    <li className="in-view">
      <div>
        <time>1957</time> In mattis elit vitae odio posuere, nec maximus massa varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
      </div>
    </li>
    <li className="in-view">
      <div>
        <time>1967</time> Aenean condimentum odio a bibendum rhoncus. Ut mauris felis, volutpat eget porta faucibus, euismod quis ante.
      </div>
    </li>
    <li className="in-view">
      <div>
        <time>1977</time> Vestibulum porttitor lorem sed pharetra dignissim. Nulla maximus, dui a tristique iaculis, quam dolor convallis enim, non dignissim ligula ipsum a turpis.
      </div>
    </li>
    <li className="in-view">
      <div>
        <time>1985</time> In mattis elit vitae odio posuere, nec maximus massa varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
      </div>
    </li>
    <li className="in-view">
      <div>
        <time>2000</time> In mattis elit vitae odio posuere, nec maximus massa varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
      </div>
    </li>
    <li className="in-view">
      <div>
        <time>2005</time> In mattis elit vitae odio posuere, nec maximus massa varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
      </div>
    </li> */}
  </ul>
</section>
    </div>
  );
}
    export default Activities;