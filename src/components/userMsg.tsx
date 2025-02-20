import { I_U_Msg } from "../utils/types";

function UserMsg(props: I_U_Msg) {
  const { content } = props;
  return (
    <div className="w-full flex justify-end mb-5">
      <div className="w-[90%] text-white rounded-xl p-2 px-5 bg-gray-600/30">
        {content}
      </div>
    </div>
  );
}

export default UserMsg;
