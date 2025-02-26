import React, { useState } from "react";
import { I_O_Res } from "../utils/types";
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
function OperatorResponse(props: I_O_Res) {
  const { content, status, period, action, thinking } = props;
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };
  return (
    <div className="w-[90%] flex flex-col items-start mb-5">
      {period && (
        <div className="text-gray-500">Worked for {period} seconds</div>
      )}
      <div className="flex justify-between items-center w-full bg-gray-400/20 p-3 rounded-lg">
        {thinking && (
          <div className="animate-pulse text-white flex items-center">
            <FontAwesomeIcon
              icon={faCircleNotch}
              className="animate-spin me-2"
            />
            {thinking}
          </div>
        )}
        <FontAwesomeIcon
          icon={!collapse ? faSortDesc : faSortAsc}
          color="white"
          onClick={handleCollapse}
        />
      </div>

      <div
        className={`border-l-[1px] border-gray-50 ms-5 ${
          collapse ? "block" : "hidden"
        }`}
      >
        {action &&
          action.map((item) => (
            <div className="text-gray-300 rounded-full  p-1 px-5 cursor-pointer hover:ms-1 transition-all duration-200">
              <FontAwesomeIcon icon={faMailBulk} className="me-3" />
              {item}
              <FontAwesomeIcon
                icon={faArrowDown}
                className="ms-3 animate-bounce"
              />
            </div>
          ))}
      </div>
      {/* {content && <div className="text-gray-100">{content}</div>} */}
    </div>
  );
}

export default OperatorResponse;
