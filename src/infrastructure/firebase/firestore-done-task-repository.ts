import "firebase/firestore";
import firebase from "firebase/app";
import { last } from "lodash";
import { IDoneTaskRepository } from "../../application/done-task-repository";
import { ITask } from "../../domain/task";

const batchSize = 20;

export class FirestoreDoneTaskRepository implements IDoneTaskRepository {
  public async create(projectId: string, task: ITask): Promise<void> {
    await this.collection(projectId)
      .doc(task.id)
      .set({
        ...task,
        createdAt: Math.floor(Date.now() / 1000), // Unix timestamp
      });
  }

  public async *list(projectId: string): AsyncIterator<ITask[], void> {
    let result = await this.query(projectId).limit(batchSize).get();

    while (result.docs.length > 0) {
      yield result.docs.map((snapshot) => snapshot.data() as ITask);

      result = await this.query(projectId)
        .startAfter(last(result.docs))
        .limit(batchSize)
        .get();
    }
  }

  private query(projectId: string): firebase.firestore.Query {
    return this.collection(projectId).orderBy("createdAt", "desc");
  }

  private collection(
    projectId: string
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
      .doc(projectId)
      .collection("doneTasks");
  }
}
