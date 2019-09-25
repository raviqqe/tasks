import "firebase/firestore";
import firebase from "firebase/app";
import { IOldProject } from "../../domain/old-project";
import { IOldProjectRepository } from "../../application/old-project-repository";

export class FirestoreOldProjectRepository implements IOldProjectRepository {
  public async list(): Promise<IOldProject[]> {
    return (await this.collection().get()).docs.map(
      snapshot => ({ ...snapshot.data(), name: snapshot.id } as IOldProject)
    );
  }

  public async markMigrated(name: string): Promise<void> {
    await this.collection()
      .doc(name)
      .update({ migrated: true });
  }

  private collection(): firebase.firestore.CollectionReference {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("projects");
  }
}
