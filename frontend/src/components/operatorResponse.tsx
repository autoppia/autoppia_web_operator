import React, { useState } from "react";
import { I_Chat } from "../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faChevronDown,
  faChevronUp,
  faCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
function OperatorResponse(props: I_Chat) {
  const { content, actions, thinking, state } = props;
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className="mb-3">
      <div className="w-[90%] flex flex-col items-start border rounded-[20px] bg-white dark:bg-transparent px-4">
        {thinking && (
          <div className="flex justify-between items-center w-full py-2">
            {state === "thinking" && (
              <div className="animate-pulse text-gray-600 flex items-center dark:text-gray-100">
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  className="animate-spin me-2"
                />
                {thinking}
              </div>
            )}
            {state === "success" && (
              <div className="text-gray-600 flex items-center dark:text-gray-100">
                <FontAwesomeIcon
                  icon={faCheck}
                  color="green"
                  className="me-2"
                />
                {"Task completed successfully."}
              </div>
            )}
            {state === "error" && (
              <div className="text-gray-600 flex items-center dark:text-gray-100">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  color="red"
                  className="me-2"
                />
                {"Task failed."}
              </div>
            )}
            <FontAwesomeIcon
              icon={!collapse ? faChevronDown : faChevronUp}
              color="gray"
              onClick={handleCollapse}
              className="cursor-pointer"
            />
          </div>
        )}

        <div
          className={`flex flex-col w-full items-end px-2 pb-4 ${
            collapse ? "block" : "hidden"
          }`}
        >
          {actions &&
            actions.map((action, index) => (
              <div
                key={action + index}
                className="w-full text-gray-700 rounded-md shadow-sm p-1 text-sm cursor-pointer transition-all duration-200 dark:text-gray-100"
              >
                <span className="mx-2">&bull;</span>
                <span>{action}</span>
              </div>
            ))}
        </div>
      </div>

      {content && (
        <div className="w-full text-gray-700 mt-2 dark:text-white">
          {content}
        </div>
      )}
    </div>
  );
}

export default OperatorResponse;
