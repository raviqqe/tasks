import { MdArchive, MdUnarchive } from "react-icons/md";
import { CircleButton } from "./CircleButton";

export interface IProps {
  projectsArchived: boolean;
  setProjectsArchived: (archived: boolean) => void;
}

export const ToggleProjects = ({
  projectsArchived,
  setProjectsArchived,
}: IProps) => (
  <CircleButton
    aria-label="Toggle Projects"
    onClick={() => setProjectsArchived(!projectsArchived)}
    secondary
  >
    {projectsArchived ? <MdArchive /> : <MdUnarchive />}
  </CircleButton>
);
