import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { compact, isEqual } from "lodash";
import { ITodoTaskRepository } from "../../application/todo-task-repository";
import { ITask } from "../../domain/task";

interface IOrderDocument {
  order: string[];
}

export class FirestoreTodoTaskRepository implements ITodoTaskRepository {
  public async create(projectId: string, task: ITask): Promise<void> {
    await firebase.firestore().runTransaction(async (transaction) => {
      const taskIds = await this.getOrder(projectId, transaction);

      transaction.set(this.tasks(projectId).doc(task.id), task);
      this.setOrder(projectId, [task.id, ...taskIds], transaction);
    });
  }

  public async delete(projectId: string, taskId: string): Promise<void> {
    await firebase.firestore().runTransaction(async (transaction) => {
      const taskIds = await this.getOrder(projectId, transaction);

      transaction.delete(this.tasks(projectId).doc(taskId));
      this.setOrder(
        projectId,
        taskIds.filter((id) => id !== taskId),
        transaction
      );
    });
  }

  public async list(projectId: string): Promise<ITask[]> {
    return firebase.firestore().runTransaction(async (transaction) => {
      // TODO Use CollectionReference.prototype.getAll().
      // https://github.com/firebase/firebase-js-sdk/issues/1176
      const tasks: ITask[] = (
        await this.tasks(projectId).get()
      ).docs.map((snapshot) => snapshot.data());
      const taskMap = Object.fromEntries(tasks.map((task) => [task.id, task]));
      const taskIds = await this.getOrder(projectId, transaction);

      // Start of read consistency resolution
      const taskIdSet = new Set(taskIds);

      const restoredTasks: ITask[] = [
        ...tasks.filter((task) => !taskIdSet.has(task.id)),
        ...compact(taskIds.map((id) => taskMap[id])),
      ];
      const restoredTaskIds: string[] = restoredTasks.map((task) => task.id);

      if (!isEqual(taskIds, restoredTaskIds)) {
        this.setOrder(projectId, restoredTaskIds, transaction);
      }
      // End of read consistency resolution

      return restoredTasks;
    });
  }

  public async reorder(projectId: string, taskIds: string[]): Promise<void> {
    await firebase
      .firestore()
      // eslint-disable-next-line @typescript-eslint/require-await
      .runTransaction(async (transaction) =>
        this.setOrder(projectId, taskIds, transaction)
      );
  }

  public setOrder(
    projectId: string,
    taskIds: string[],
    transaction: firebase.firestore.Transaction
  ): void {
    transaction.set(this.order(projectId), { order: taskIds });
  }

  public async update(projectId: string, task: ITask): Promise<void> {
    await this.tasks(projectId).doc(task.id).update(task);
  }

  private async getOrder(
    projectId: string,
    transaction: firebase.firestore.Transaction
  ): Promise<string[]> {
    return (await transaction.get(this.order(projectId))).data()?.order ?? [];
  }

  private tasks(
    projectId: string
  ): firebase.firestore.CollectionReference<ITask> {
    return this.project(projectId).collection(
      "todoTasks"
    ) as firebase.firestore.CollectionReference<ITask>;
  }

  private order(
    projectId: string
  ): firebase.firestore.DocumentReference<IOrderDocument> {
    return this.project(projectId)
      .collection("todoTaskOrders")
      .doc("default") as firebase.firestore.DocumentReference<IOrderDocument>;
  }

  private project(projectId: string): firebase.firestore.DocumentReference {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return firebase
      .firestore()
      .collection("version/1/users")
      .doc(user.uid)
      .collection("projects")
      .doc(projectId);
  }
}
