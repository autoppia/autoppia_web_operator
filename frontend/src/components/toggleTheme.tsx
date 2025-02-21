import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ToggleTheme() {
  const darkThemeHandler = () => {
    document.documentElement.classList.toggle("dark");
  };
  return (
    <div
      className="flex hover:bg-gray-300 rounded-full justify-center items-center w-[50px] h-[50px] cursor-pointer transition-all duration-300 mr-3 dark:text-white"
      onClick={darkThemeHandler}
    >
      <FontAwesomeIcon icon={faSun} />
    </div>
  );
}

export default ToggleTheme;
