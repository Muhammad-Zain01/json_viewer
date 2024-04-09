import { Github } from "lucide-react";
import { Button } from "../../ui/button";

const GithubButton = () => {
  return (
    <div>
      <a href="https://github.com/Muhammad-Zain01" target="_blank">
        <Button variant={"outline"} onClick={() => {}}>
          <Github size={18} className="mr-2" />
          Follow<strong className="ml-1">Muhammad Zain</strong>
        </Button>
      </a>
    </div>
  );
};
export default GithubButton;
