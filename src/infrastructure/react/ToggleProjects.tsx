import { MdArchive, MdUnarchive } from "react-icons/md";
import { CircleButton } from "./CircleButton.js";

interface Props {
  projectsArchived: boolean;
  setProjectsArchived: (archived: boolean) => void;
}

export const ToggleProjects = ({
  projectsArchived,
  setProjectsArchived,
}: Props): JSX.Element => (
  <CircleButton
    aria-label="Toggle Projects"
    onClick={() => setProjectsArchived(!projectsArchived)}
    secondary
  >
    {projectsArchived ? <MdArchive /> : <MdUnarchive />}
  </CircleButton>
);
