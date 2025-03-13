import React, { useState } from "react";
import { I_Chat } from "../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowRight,
  faCircle,
  faCircleDot,
  faCircleNotch,
  faMailBulk,
  faRing,
  faSortAsc,
  faSortDesc,
  faSyringe,
} from "@fortawesome/free-solid-svg-icons";
function OperatorResponse(props: I_Chat) {
  const { content, period, actions, thinking } = props;
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };
  return (
    <div className="w-[90%] flex flex-col items-start mb-5">
      {period && (
        <div className="text-gray-500">Worked for {period} seconds</div>
      )}
      {thinking && (<div className="flex justify-between items-center w-full p-3 py-2 rounded-lg border-2 ">
        <div className="animate-pulse text-gray-600 flex items-center dark:text-gray-100">
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="animate-spin me-2"
          />
          {thinking}
        </div>
        <FontAwesomeIcon
          icon={!collapse ? faSortDesc : faSortAsc}
          color="gray"
          onClick={handleCollapse}
          className="cursor-pointer"
        />
      </div>
      )}

      <div
        className={`border-l-[1px] border-gray-500 ms-5  ${collapse ? "block" : "hidden"
          }`}
      >
        {actions &&
          actions.map((item, index) => (
            <div
              key={item.name + index}
              className="text-gray-700 rounded-full  p-1 px-5 cursor-pointer hover:ms-1 transition-all duration-200 dark:text-gray-100"
            >
              {/* <FontAwesomeIcon icon={item.icon} className="me-3" /> */}
              {item.name}
            </div>
          ))}
      </div>
      {content && <div className="text-black-100">{content}</div>}
    </div>
  );
}

export default OperatorResponse;
