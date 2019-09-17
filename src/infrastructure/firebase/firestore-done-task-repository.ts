import "firebase/firestore";
import firebase from "firebase/app";
import { last } from "lodash";
import { ITask } from "../../domain/task";
import { IDoneTaskRepository } from "../../application/done-task-repository";

const BATCH_SIZE: number = 20;

export class FirestoreDoneTaskRepository implements IDoneTaskRepository {
  public async create(projectID: string, task: ITask): Promise<void> {
    await this.collection(projectID)
      .doc(task.id)
      .set({
        ...task,
        createdAt: Math.floor(Date.now() / 1000) // Unix timestamp
      });
  }

  public async *list(projectID: string): AsyncIterator<ITask[], void> {
    let result = await this.query(projectID)
      .limit(BATCH_SIZE)
      .get();

    while (result.docs.length > 0) {
      yield result.docs.map(snapshot => snapshot.data() as ITask);

      result = await this.query(projectID)
        .startAfter(last(result.docs))
        .limit(BATCH_SIZE)
        .get();
    }
  }

  private query(projectID: string): firebase.firestore.Query {
    return this.collection(projectID).orderBy("createdAt", "desc");
  }

  private collection(
    projectID: string
  ): firebase.firestore.CollectionReference {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return firebase
      .firestore()
      .collection("version/1/users")
      .doc(user.uid)
      .collection("projects")
      .doc(projectID)
      .collection("doneTasks");
  }
}
