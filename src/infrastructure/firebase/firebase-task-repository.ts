import "firebase/firestore";
import * as firebase from "firebase/app";
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

  public async find(id: string): Promise<ITask> {
    return (await this.collection()
      .doc(id)
      .get()).data() as ITask;
  }

  public async update(task: ITask): Promise<void> {
    await this.collection()
      .doc(task.id)
      .update(task);
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
