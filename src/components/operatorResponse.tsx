import React from "react";
import { I_O_Res } from "../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMailBulk } from "@fortawesome/free-solid-svg-icons";
function OperatorResponse(props: I_O_Res) {
  const { content, status, period, action } = props;
  return (
    <div className="w-[90%] flex flex-col items-start mb-5">
      {period && (
        <div className="text-gray-500">Worked for {period} seconds</div>
      )}
      {action && (
        <div className="text-gray-300 rounded-full border-[1px] border-gray-600/80 p-1 px-5 cursor-pointer hover:ms-1 transition-all duration-200">
          <FontAwesomeIcon icon={faMailBulk} className="me-3" />
          {action}
          <FontAwesomeIcon icon={faArrowRight} className="ms-3" />
        </div>
      )}
      {content && <div className="text-gray-100">{content}</div>}
    </div>
  );
}

export default OperatorResponse;
