import React, { useState } from "react";
import { I_Chat } from "../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faChevronDown,
  faChevronUp,
  faCheck,
  faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";
function OperatorResponse(props: I_Chat) {
  const { content, period, actions, thinking, state } = props;
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
        {state === "thinking" && (<div className="animate-pulse text-gray-600 flex items-center dark:text-gray-100">
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="animate-spin me-2"
          />
          {thinking}
        </div>)}
        {state === "success" && (<div className="text-gray-600 flex items-center dark:text-gray-100">
          <FontAwesomeIcon
            icon={faCheck}
            color="green"
            className="me-2"
          />
          {"Task completed successfully."}
        </div>)}
        {state === "error" && (<div className="text-gray-600 flex items-center dark:text-gray-100">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            color="red"
            className="me-2"
          />
          {"Task failed."}
        </div>)}
        <FontAwesomeIcon
          icon={!collapse ? faChevronDown : faChevronUp}
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
      {content && <div className="text-black-100 mt-2 dark:text-white">{content}</div>}
    </div>
  );
}

export default OperatorResponse;
