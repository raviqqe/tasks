import "firebase/firestore";
import * as firebase from "firebase/app";
import { IProject } from "../../domain/project";
import { IProjectRepository } from "../../application/project-repository";

export class FirebaseProjectRepository implements IProjectRepository {
  public async create(project: IProject): Promise<void> {
    await this.collection()
      .doc(project.id)
      .set(project);
  }

  public async list(): Promise<IProject[]> {
    return (await this.collection()
      .orderBy("name")
      .get()).docs.map(snapshot => snapshot.data() as IProject);
  }

  public async update(project: IProject): Promise<void> {
    await this.collection()
      .doc(project.id)
      .update(project);
  }

  private collection(): firebase.firestore.CollectionReference {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return firebase
      .firestore()
      .collection("version/1/users")
      .doc(user.uid)
      .collection("projects");
  }
}
