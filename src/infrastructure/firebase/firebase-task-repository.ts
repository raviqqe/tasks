import "firebase/firestore";
import * as firebase from "firebase/app";
import { last } from "lodash";
import { ITask } from "../../domain/task";
import { ITaskRepository } from "../../application/task-repository";

export class FirebaseTaskRepository implements ITaskRepository {
  public async create(task: ITask): Promise<void> {
    await this.collection()
      .doc(task.id)
      .set({
        ...task,
        createdAt: Math.floor(Date.now() / 1000) // Unix timestamp
      });
  }

  public async delete(taskID: string): Promise<void> {
    await this.collection()
      .doc(taskID)
      .delete();
  }

  public async *list(limit: number): AsyncIterator<ITask[], void> {
    let result = await this.query()
      .limit(limit)
      .get();

    while (result.docs.length > 0) {
      yield result.docs.map(snapshot => snapshot.data() as ITask);

      result = await this.query()
        .startAfter(last(result.docs))
        .limit(limit)
        .get();
    }
  }

  public async update(task: ITask): Promise<void> {
    await this.collection()
      .doc(task.id)
      .update(task);
  }

  private query(): firebase.firestore.Query {
    return this.collection().orderBy("createdAt", "desc");
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
      .collection("tasks");
  }
}
