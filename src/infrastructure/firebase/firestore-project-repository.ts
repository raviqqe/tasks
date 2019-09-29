import "firebase/firestore";
import firebase from "firebase/app";
import { IProject } from "../../domain/project";
import { IProjectRepository } from "../../application/project-repository";

export class FirestoreProjectRepository implements IProjectRepository {
  public async create(project: IProject): Promise<void> {
    await this.collection()
      .doc(project.id)
      .set(project);
  }

  public async delete(projectID: string): Promise<void> {
    await this.collection()
      .doc(projectID)
      .delete();
  }

  public async list(): Promise<IProject[]> {
    return (await this.collection()
      .where("archived", "==", false)
      .get()).docs.map(snapshot => snapshot.data() as IProject);
  }

  public async listArchived(): Promise<IProject[]> {
    return (await this.collection()
      .where("archived", "==", true)
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
