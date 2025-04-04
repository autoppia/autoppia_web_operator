import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { I_WebsiteItem } from "../utils/types";

function WebsiteItem(props: I_WebsiteItem) {
  const { icon, title, url, onClick } = props;
  const handleClick = () => {
    onClick!(url, title);
  };
  return (
    <div
      className="hover:bg-white hover:shadow-lg cursor-pointer p-3 rounded-lg flex items-center border-b-[1px]"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={icon} className="me-3" />
      {title}
    </div>
  );
}

export default WebsiteItem;
