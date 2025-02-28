import { I_U_Msg } from "../utils/types";

function UserMsg(props: I_U_Msg) {
  const { content } = props;
  return (
    <div className="w-full flex justify-end mb-5">
      <div className="max-w-[90%] text-gray-800 rounded-xl p-2 px-5 bg-gray-200/50 dark:bg-gray-900/50 dark:text-white font-title ">
        {content}
      </div>
    </div>
  );
}

export default UserMsg;
