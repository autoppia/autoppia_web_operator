import { I_Chat } from "../utils/types";

function UserMsg(props: I_Chat) {
  const { content } = props;
  return (
    <div className="w-full flex justify-end mb-3">
      <div className="max-w-[90%] text-gray-800 rounded-lg p-2 px-5 bg-gray-200/50 dark:bg-gray-900/50 dark:text-white font-title ">
        {content}
      </div>
    </div>
  );
}

export default UserMsg;
