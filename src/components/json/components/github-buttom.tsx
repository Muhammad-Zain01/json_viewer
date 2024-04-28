import { Github } from "lucide-react";
import { Button } from "../../ui/button";

const GithubButton = () => {
  return (
    <div className="flex items-center">
      <a href="https://github.com/Muhammad-Zain01" target="_blank" className="mr-3">
        <Button variant={"outline"} onClick={() => {}}>
          <Github size={18} className="mr-2" />
          Follow<strong className="ml-1">Muhammad Zain</strong>
        </Button>
      </a>
      <a
        href="https://www.producthunt.com/posts/json-viewer-5?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-json&#0045;viewer&#0045;5"
        target="_blank"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=454302&theme=dark"
          alt="JSON&#0032;Viewer - Your&#0032;Ultimate&#0032;JSON&#0032;Viewer | Product Hunt"
          style={{ width: 150, height: 50 }}
          width="250"
          height="54"
        />
      </a>
    </div>
  );
};
export default GithubButton;
