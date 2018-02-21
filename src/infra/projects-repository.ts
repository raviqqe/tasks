import * as firebase from "firebase";

import { emptyProject, IProject, IProjects } from "../domain/project";

class ProjectsRepository {
    private unsubscribe: (() => void) | null = null;

    public addOrModifyProject(name: string, project: IProject): void {
        this.collection.doc(name).set(project);
    }

    public removeProject(name: string): void {
        this.collection.doc(name).delete();
    }

    public async getProjects(): Promise<IProjects> {
        return (await this.collection.get()).docs.reduce(
            (projects: IProjects, doc: firebase.firestore.DocumentSnapshot): IProjects =>
                ({ ...projects, [doc.id]: doc.data() as IProject }),
            {});
    }

    public subscribeProjects(
        addOrModifyProject: (name: string, project: IProject) => void,
        removeProject: (name: string) => void,
    ): void {
        this.unsubscribe = this.collection.onSnapshot(({ docChanges }) => {
            docChanges.forEach(({ doc: { data, id }, type }) => {
                switch (type) {
                    case "added":
                    case "modified":
                        addOrModifyProject(id, data() as IProject);
                        break;
                    case "removed":
                        removeProject(id);
                }
            });
        });
    }

    public unsubscribeProjects(): void {
        if (typeof this.unsubscribe === "function") {
            this.unsubscribe();
        }
    }

    private get collection(): firebase.firestore.CollectionReference {
        return firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("projects");
    }
}

export default new ProjectsRepository();
