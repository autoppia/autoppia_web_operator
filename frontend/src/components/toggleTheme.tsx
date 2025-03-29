import { faCircleHalfStroke, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ToggleTheme() {
  const darkThemeHandler = () => {
    document.documentElement.classList.toggle("dark");
  };
  return (
    <div
      className="flex hover:bg-gray-300 rounded-full justify-center items-center w-[30px] h-[30px] cursor-pointer transition-all duration-300 text-gray-500 dark:text-white"
      onClick={darkThemeHandler}
    >
      <FontAwesomeIcon icon={faCircleHalfStroke} />
    </div>
  );
}

export default ToggleTheme;
